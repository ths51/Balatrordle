import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JokerItemView from './JokerItemView';

function JokerGuessView() {

  const [joker, setJoker] = useState(0);

  useEffect(() => {
    const date = Date.now().valueOf() / (1000 * 60 * 60 * 24);
    const day = date.toFixed(0);
    var id = 0;

    fetch('src/backing_data/daily_jokers.json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(day);
      // console.log(json[day]);
      id = json[day];
    });

    fetch('src/backing_data/jokers.json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json['jokers'][id]);
      setJoker(json['jokers'][id])
    });
  }, [])

  return (
    <>
      <p>{joker['name']}</p>
    </>
  )
}

export default JokerGuessView
