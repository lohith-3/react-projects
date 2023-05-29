import { useState, useEffect } from "react";
import "./card.component.css";

const Card = () => {
  const [temperature, setTemperature] = useState(0);
  useEffect(() => {
    const pElement = document.querySelector(".temperature-details > p");

    if (+temperature > 15) {
      pElement.classList.remove("cold");
      pElement.classList.add("hot");
    } else {
      pElement.classList.remove("hot");
      pElement.classList.add("cold");
    }
  }, [temperature]);

  const incrementTemperatureHandler = () => {
    if (temperature >= 30) {
      return;
    }
    setTemperature(temperature + 1);
  };
  const decrementTemperatureHandler = () => {
    if (temperature < 1) {
      return;
    }
    setTemperature(temperature - 1);
  };

  return (
    <div className="card-container">
      <div className="temperature-details">
        <p className="cold">{temperature}°C</p>
      </div>
      <div className="temperature-buttons">
        <button onClick={incrementTemperatureHandler}>+</button>
        <button onClick={decrementTemperatureHandler}>-</button>
      </div>
    </div>
  );
};

export default Card;
