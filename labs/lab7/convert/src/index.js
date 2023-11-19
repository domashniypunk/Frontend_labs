import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LengthConverter from './LengthConverter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h5>Лабораторная работа №7</h5> 
      <h6>Перевод единиц длин</h6>
    <LengthConverter />
  </React.StrictMode>
);

