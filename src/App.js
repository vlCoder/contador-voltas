import React, { useState, useEffect } from 'react';

const MostraVoltas = (props) => {
  return (
    <p>{props.voltas}<br />voltas</p>
  )
}

const MostraTempo = (props) => {
  const tempo = props.tempo;
  const minutos = Math.round(tempo / 60);
  const segundos = tempo % 60;
  const minutosStr = minutos < 10 ? '0' + minutos : minutos;
  const segundosStr = segundos < 10 ? '0' + segundos : segundos;
  return (
    <p>{`${minutosStr}:${segundosStr}`}<br /> Tempo medio de voltas</p>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

function App() {
  const [numVoltas, setnumVoltas] = useState(0)
  const [running, setRunning] = useState(false)
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    let timer = null;
    if (running) {
      timer = setInterval(() => {
        setTempo(old => old + 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [running]);

  const toogleRunnig = () => {
    setRunning(!running);
  }

  const increment = () => {
    setnumVoltas(numVoltas + 1);
  }
  const decrement = () => {
    setnumVoltas(numVoltas - 1)
  }

  const reset = () => {
    setTempo(0);
  }

  return (
    <div className='App'>
      <MostraVoltas voltas={numVoltas} />
      <Button onClick={increment} text="+" />
      <Button onClick={decrement} text="-" />

      {
        numVoltas > 0 &&
        <MostraTempo tempo={Math.round(tempo / numVoltas)} />
      }

      <Button onClick={toogleRunnig} text="Iniciar" />
      <Button onClick={reset} text="Reniciar" />
    </div>
  );
}

export default App;
