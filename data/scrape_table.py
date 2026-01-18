from bs4 import BeautifulSoup
import sys

with open(sys.argv[1], "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

top_level_tables = []

for table in soup.find_all("table"):
    if table.find_parent("table") is None:
        top_level_tables.append(table)

if len(top_level_tables) < 2:
    raise ValueError("Less than 2 top-level tables found")

location = soup.find("span", class_="header-0-1-1").get_text(strip=True)
capacity = soup.find("span", class_="header-2-0-1").get_text(strip=True)

schedule_table = top_level_tables[1]

def course_and_instructor(cell):
    tables = cell.find_all("table", class_="object-cell-args")

    courses = tables[0].get_text(strip=True)
    instructor = tables[1].find("td", align="left").get_text(strip=True)

    return (courses, instructor)


schedule_matrix_delay = [0, 0, 0, 0, 0, 0, 0, 0]

for tr in schedule_table.find_all("tr")[1:]:
    if not tr.find_parent("table") is schedule_table:
        continue

    current_day = 1
    i = 1

    tds = tr.find_all("td")
    current_time = tds[0].get_text(strip=True)

    while current_day <= 7 and i < len(tds):
        if schedule_matrix_delay[current_day] != 0:
            schedule_matrix_delay[current_day] -= 1
            current_day += 1
            continue

        if tds[i].get("class") is None:
            i += 1
            continue

        class_type = tds[i].get("class")[0]
        if class_type in ["LEC", "DIS", "SEM", "LAB"]:
            duration = int(tds[i].get("rowspan"))
            schedule_matrix_delay[current_day] = duration - 1
            course, instructor = course_and_instructor(tds[i])

            translate = {"LEC": "Lecture", "DIS": "Discussion", "SEM": "Seminar", "LAB": "Lab"}
            course = course.split("-")[0]
            course = course.replace("_V", "")

            instructor = instructor.replace("'", "''")

            print(f"(DEFAULT, '{course}', '{instructor}', '{location}', '{current_time}', {duration * 30}, {capacity}, 'Low', '{translate[class_type]}', {current_day}),")

        i += 1
        current_day += 1
