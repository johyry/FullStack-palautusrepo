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
    <>
      <Title />

      <Button handleClick={handleHyväClick} text="hyvä" />
      <Button handleClick={handleNeutraaliClick} text="neutraali" />
      <Button handleClick={handleHuonoClick} text="huono" />

      <Statistiikka hyvä={hyvä} neutraali={neutraali} huono={huono} />
    </>
  );
};

const Title = () => {
  return (
    <>
      <h1>Anna palautetta</h1>
    </>
  );
};

const Statistiikka = ({ hyvä, huono, neutraali }) => {
  const Yhteensä = () => hyvä + huono + neutraali;

  const Keskiarvo = () => {
    let Summa = hyvä - huono;
    return Summa / Yhteensä();
  };

  const Positiivisia = () => (hyvä / Yhteensä()) * 100;

  if (Yhteensä() > 0) {
    return (
      <>
        <h2>Statistiikka</h2>
        <table>
          <tbody>
            <Statistic text={"Hyvä: "} amount={hyvä} />
            <Statistic text={"Neutraali: "} amount={neutraali} />
            <Statistic text={"Huono: "} amount={huono} />
            <Statistic text={"Yhteensä: "} amount={Yhteensä()} />
            <Statistic text={"Keskiarvo: "} amount={Keskiarvo()} />
            <Statistic text={"Positiivisia: "} amount={Positiivisia()} text1={"%"} />
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <p>Ei yhtään palautetta annettu</p>
    </>
  );
};

const Statistic = ({ text, amount, text1 }) => {
  return (
    <tr>
      <td>
        {text} {amount} {text1}
      </td>
    </tr>
  );
};

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

ReactDOM.render(<App />, document.getElementById("root"));
