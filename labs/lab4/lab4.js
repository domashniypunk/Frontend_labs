class Figure {
  constructor(points) {
    this.points = points;
  }

  getArea() {
    throw new Error('Метод getArea должен быть реализован в подклассе');
  }

  getPerimeter() {
    throw new Error('Метод getPerimeter должен быть реализован в подклассе');
  }
}

class Square extends Figure {
  getArea() {
    const [p1, p2] = this.points;
    const side = Math.abs(p2.x - p1.x);
    return side * side;
  }

  getPerimeter() {
    const [p1, p2] = this.points;
    const side = Math.abs(p2.x - p1.x);
    return side * 4;
  }
}

class Circle extends Figure {
  getArea() {
    const [center, pointOnCircle] = this.points;
    const radius = Math.sqrt(
      Math.pow(pointOnCircle.x - center.x, 2) +
      Math.pow(pointOnCircle.y - center.y, 2)
    );
    return Math.PI * radius * radius;
  }

  getPerimeter() {
    const [center, pointOnCircle] = this.points;
    const radius = Math.sqrt(
      Math.pow(pointOnCircle.x - center.x, 2) +
      Math.pow(pointOnCircle.y - center.y, 2)
    );
    return 2 * Math.PI * radius;
  }
}

class Triangle extends Figure {
  getArea() {
    const [p1, p2, p3] = this.points;
    const area = 0.5 * Math.abs(
      p1.x * (p2.y - p3.y) +
      p2.x * (p3.y - p1.y) +
      p3.x * (p1.y - p2.y)
    );
    return area;
  }

  getPerimeter() {
    const [p1, p2, p3] = this.points;
    const side1 = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2)
    );
    const side2 = Math.sqrt(
      Math.pow(p3.x - p2.x, 2) +
      Math.pow(p3.y - p2.y, 2)
    );
    const side3 = Math.sqrt(
      Math.pow(p1.x - p3.x, 2) +
      Math.pow(p1.y - p3.y, 2)
    );
    return side1 + side2 + side3;
  }
}

// Создаем экземпляры 
const square = new Square([{ x: 0, y: 0 }, { x: 4, y: 4 }]);
const circle = new Circle([{ x: 0, y: 0 }, { x: 0, y: 5 }]);
const triangle = new Triangle([{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 4 }]);

// Получаем площадь и периметр 
const squareArea = square.getArea();
const squarePerimeter = square.getPerimeter();

const circleArea = circle.getArea();
const circlePerimeter = circle.getPerimeter();

const triangleArea = triangle.getArea();
const trianglePerimeter = triangle.getPerimeter();

// Вывод результатов
const outputDiv = document.getElementById('output');

const squareResult = document.createElement('div');
squareResult.textContent = `Площадь квадрата: ${squareArea}, Периметр квадрата: ${squarePerimeter}`;
outputDiv.appendChild(squareResult);

const circleResult = document.createElement('div');
circleResult.textContent = `Площадь круга: ${circleArea}, Периметр круга: ${circlePerimeter}`;
outputDiv.appendChild(circleResult);

const triangleResult = document.createElement('div');
triangleResult.textContent = `Площадь треугольника: ${triangleArea}, Периметр треугольника: ${trianglePerimeter}`;
outputDiv.appendChild(triangleResult);