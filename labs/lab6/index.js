const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

// Чтение данных из JSON файла
function readData() {
  const rawData = fs.readFileSync('guitars.json');
  return JSON.parse(rawData);
}

// Запись данных в JSON файл
function writeData(data) {
  fs.writeFileSync('guitars.json', JSON.stringify(data, null, 2));
}

// Создание новой гитары (Create)
app.post('/guitars', (req, res) => {
  const newGuitar = req.body;
  const guitarsData = readData();
  newGuitar.id = Date.now().toString();
  guitarsData.push(newGuitar);
  writeData(guitarsData);
  res.status(201).json(newGuitar);
});

// Получение списка всех гитар (Read All)
app.get('/guitars', (req, res) => {
  const guitarsData = readData();
  res.json(guitarsData);
});

// Получение информации о конкретной гитаре по ID (Read One)
app.get('/guitars/:id', (req, res) => {
  const guitarId = req.params.id;
  const guitarsData = readData();
  const car = guitarsData.find(c => c.id === guitarId);

  if (!car) {
    res.status(404).json({ error: 'Не найден' });
  } else {
    res.json(car);
  }
});

// Обновление информации о конкретной гитаре по ID (Update)
app.put('/guitars/:id', (req, res) => {
  const guitarId = req.params.id;
  const updatedGuitar = req.body;
  const guitarsData = readData();
  const guitarIndex = guitarsData.findIndex(c => c.id === guitarId);

  if (guitarIndex === -1) {
    res.status(404).json({ error: 'Не найден' });
  } else {
    guitarsData[guitarIndex] = updatedGuitar;
    writeData(guitarsData);
    res.json(updatedGuitar);
  }
});

// Удаление конкретной гитары по ID (Delete)
app.delete('/guitars/:id', (req, res) => {
  const guitarId = req.params.id;
  const guitarsData = readData();
  const guitarIndex = guitarsData.findIndex(c => c.id === guitarId);

  if (guitarIndex === -1) {
    res.status(404).json({ error: 'Не найден' });
  } else {
    const deletedGuitar = guitarsData.splice(guitarIndex, 1);
    writeData(guitarsData);
    res.json(deletedGuitar[0]);
  }
});

// Serve the frontend application
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
