function displayGuitars() {
    fetch('http://localhost:5500/guitars')
        .then(response => response.json())
        .then(data => {
            const guitars = data;
            const guitarlist = document.querySelector('.table-guitars').getElementsByTagName('tbody')[0];
            guitarlist.innerHTML = '';

            guitars.forEach(guitar => {
                const row = guitarlist.insertRow();
                row.innerHTML = `
                          <td>${guitar.model}</td>
                          <td>${guitar.type}</td>
                          <td>${guitar.year}</td>
                          <td>
                              <button onclick="editGuitarInfo(${guitar.id}, '${guitar.model}', '${guitar.type}', '${guitar.year}')">Изменить</button>
                              <button onclick="deleteGuitar('${guitar.id}')">Удалить</button>
                          </td>`;
            });
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

// post create
function createGuitar(event) {
    event.preventDefault();

    const model = document.getElementById('model').value;
    const type = document.getElementById('type').value;
    const year = parseInt(document.getElementById('year').value);

    fetch('http://localhost:5500/guitars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model, type, year })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Гитара создана:', data);
            displayGuitars();
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

// get edit 
function editGuitarInfo(id, model, type, year) {
    document.getElementById("input-id").value = id
    document.getElementById("input-model").value = model
    document.getElementById("input-type").value = type
    document.getElementById("input-year").value = year
}

// put edit
function editGuitar(event) {
    event.preventDefault();
    const id = document.getElementById('input-id').value;
    const model = document.getElementById('input-model').value;
    const type = document.getElementById('input-type').value;
    const year = parseInt(document.getElementById('input-year').value);

    fetch(`http://localhost:5500/guitars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, model, type, year })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Сетевая ошибка');
          }
          return response.json(); // Получение JSON-ответа
        })
        .then(data => {
          console.log('Информация о гитаре обновлена:', data);
          // this
          displayGuitars();
        })
        .catch(error => {
          console.error('Произошла ошибка:', error);
        });
}

// delete guitar
function deleteGuitar(id) {
    fetch(`http://localhost:5500/guitars/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Гитара удалена:', data);
            displayGuitars();
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}


// show all guitars on table
displayGuitars();

// for create new guitar on btn
const createguitarForm = document.getElementById('createGuitarForm');
createguitarForm.addEventListener('submit', createGuitar);


const editguitarForm = document.getElementById('editGuitarForm');
editguitarForm.addEventListener('submit', editGuitar);