import React, { useState } from 'react';

const LengthConverter = () => {
  const [sourceValue, setSourceValue] = useState('');
  const [sourceUnit, setSourceUnit] = useState('km');
  const [targetUnit, setTargetUnit] = useState('m');
  const [convertedValue, setConvertedValue] = useState('');

  const convertLength = () => {
    const value = parseFloat(sourceValue);
    if (isNaN(value)) {
      setConvertedValue('Некорректный ввод');
      return;
    }

    let result;
    switch (sourceUnit) {
      case 'km':
        switch (targetUnit) {
          case 'm':
            result = value * 1000;
            break;
          case 'cm':
            result = value * 100000;
            break;
          case 'dm':
            result = value * 10000;
            break;
          case 'mi':
            result = value * 0.621371;
            break;
          case 'ft':
            result = value * 3280.84;
            break;
          default:
            result = value;
            break;
        }
        break;
      case 'm':
        switch (targetUnit) {
          case 'km':
            result = value / 1000;
            break;
          case 'cm':
            result = value * 100;
            break;
          case 'dm':
            result = value * 10;
            break;
          case 'mi':
            result = value * 0.000621371;
            break;
          case 'ft':
            result = value * 3.28084;
            break;
          default:
            result = value;
            break;
        }
        break;
      case 'cm':
        switch (targetUnit) {
          case 'km':
            result = value / 100000;
            break;
          case 'm':
            result = value / 100;
            break;
          case 'dm':
            result = value / 10;
            break;
          case 'mi':
            result = value * 0.00000621371;
            break;
          case 'ft':
            result = value * 0.0328084;
            break;
          default:
            result = value;
            break;
        }
        break;
      case 'dm':
        switch (targetUnit) {
          case 'km':
            result = value / 10000;
            break;
          case 'm':
            result = value / 10;
            break;
          case 'cm':
            result = value * 10;
            break;
          case 'mi':
            result = value * 0.0000621371;
            break;
          case 'ft':
            result = value * 0.328084;
            break;
          default:
            result = value;
            break;
        }
        break;
      case 'mi':
        switch (targetUnit) {
          case 'km':
            result = value * 1.60934;
            break;
          case 'm':
            result = value * 1609.34;
            break;
          case 'cm':
            result = value * 160934;
            break;
          case 'dm':
            result = value * 16093.4;
            break;
          case 'ft':
            result = value * 5280;
            break;
          default:
            result = value;
            break;
        }
        break;
      case 'ft':
        switch (targetUnit) {
          case 'km':
            result = value * 0.0003048;
            break;
          case 'm':
            result = value * 0.3048;
            break;
          case 'cm':
            result = value * 30.48;
            break;
          case 'dm':
            result = value * 3.048;
            break;
          case 'mi':
            result = value * 0.000189394;
            break;
          default:
            result = value;
            break;
        }
        break;
      default:
        result = value;
        break;
    }

    setConvertedValue(result.toFixed(2));
  };

  return (
    <div>
      <input
        type="text"
        value={sourceValue}
        onChange={(e) => setSourceValue(e.target.value)}
      />
      <select
        value={sourceUnit}
        onChange={(e) => setSourceUnit(e.target.value)}
      >
        <option value="km">Километры (км)</option>
        <option value="m">Метры (м)</option>
        <option value="cm">Сантиметры (см)</option>
        <option value="dm">Дециметры (дм)</option>
        <option value="ft">Футы (фт)</option>
        <option value="mi">Мили (ми)</option>
      </select>
      <select
        value={targetUnit}
        onChange={(e) => setTargetUnit(e.target.value)}
      >
        <option value="km">Километры (км)</option>
        <option value="m">Метры (м)</option>
        <option value="cm">Сантиметры (см)</option>
        <option value="dm">Дециметры (дм)</option>
        <option value="ft">Футы (фт)</option>
        <option value="mi">Мили (ми)</option>
      </select>
      <button className='button6' onClick={convertLength}>Конвертировать</button>
      <p>{convertedValue}</p>
    </div>
  );
};

export default LengthConverter;