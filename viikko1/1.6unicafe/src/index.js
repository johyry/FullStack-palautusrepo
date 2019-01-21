import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [hyvä, setHyvä] = useState(0);
  const [neutraali, setNeutraali] = useState(0);
  const [huono, setHuono] = useState(0);

  const handleHyväClick = () => {
    setHyvä(hyvä + 1);
  };

  const handleHuonoClick = () => {
    setHuono(huono + 1);
  };

  const handleNeutraaliClick = () => {
    setNeutraali(neutraali + 1);
  };

  return (
    <div>
      <Title />

      <Button handleClick={handleHyväClick} text="hyvä" />
      <Button handleClick={handleNeutraaliClick} text="neutraali" />
      <Button handleClick={handleHuonoClick} text="huono" />

      <PrintValues hyvä={hyvä} neutraali={neutraali} huono={huono} />
    </div>
  );
};

const Title = () => {
  return (
    <div>
      <h1>Anna palautetta</h1>
    </div>
  );
};

const PrintValues = ({ hyvä, huono, neutraali }) => {
    
  const Yhteensä = () => hyvä + huono + neutraali

  const Keskiarvo = () => {
    let Summa = hyvä - huono;
    return Summa / Yhteensä();
  };

  const Positiivisia = () =>  hyvä / Yhteensä() * 100
  

  return (
    <div>
      <h2>Statistiikka</h2>
      <p>Hyvä: {hyvä}</p>
      <p>Neutraali: {neutraali}</p>
      <p>Huono: {huono}</p>
      <p>Yhteensä: {Yhteensä()}</p>
      <p>Keskiarvo: {Keskiarvo()}</p>
      <p>Positiivisia: {Positiivisia()}% </p>
    </div>
  );
};

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
