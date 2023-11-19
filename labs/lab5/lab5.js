function loadJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(`Не удалось загрузить JSON. Статус: ${xhr.status}`);
        }
      }
    };
    xhr.send();
  });
}

function getRemainingLabs(studentData) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const remainingLabs = [];

  studentData.students.forEach((student) => {
    student.disciplines.forEach((discipline) => {
      discipline.labs.forEach((lab) => {
        if (lab.date > formattedDate) {
          remainingLabs.push({
            student: student.full_name,
            discipline: discipline.name,
            labName: lab.name,
            dueDate: lab.date,
          });
        }
      });
    });
  });

  return remainingLabs;
}

const jsonURL = "students.json";

loadJSON(jsonURL)
  .then((data) => {
    console.log("Данные успешно загружены:", data);

    const remainingLabs = getRemainingLabs(data);

    // Вывод на страницу
    const allLabsList = document.getElementById("allLabsList");
    const remainingLabsList = document.getElementById("remainingLabsList");

    data.students.forEach((student) => {
      student.disciplines.forEach((discipline) => {
        discipline.labs.forEach((lab) => {
          const div = document.createElement("div");
          div.classList.add("data");
          div.innerHTML = `Студент: ${student.full_name},
          <br> Дисциплина: ${discipline.name},
          <br> Лабораторная работа: ${lab.name}, 
          <br> Срок: ${lab.date}<br>`;

          allLabsList.appendChild(div);

          if (
            remainingLabs.find(
              (remainingLab) => remainingLab.labName === lab.name
            )
          ) {
            remainingLabsList.appendChild(div.cloneNode(true));
          }
        });
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });