import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JokerItemView from './JokerItemView';
import JokerListView from './JokerListView';

function JokerGuessView() {

  const [joker, setJoker] = useState(0);
  const [guess, setGuess] = useState("");

  const [allJokers, setAllJokers] = useState([]);
  const [filteredJokers, setFilteredJokers] = useState([]);

  const [guesses, setGuesses] = useState([]);

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
      setAllJokers(json['jokers']);
      setFilteredJokers(json['jokers']);
      setJoker(json['jokers'][id]);
    });
  }, [])

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
    // for (let i = 0; i < allJokers.length; i++) {
    //   const element = allJokers[i];
    //   if (element.name.toString().includes(event.target.value)) {
    //     console.log(event.target.value, element.name);
    //   }
    // }
    const items = allJokers.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    })
    setFilteredJokers(items);
  }

  const makeGuess = (event) => {
    console.log(event);
  }

  return (
    <>
      <p>{joker['name']}</p>
      <form id="guess_form">
        <input id="guess" className="guess_input" value={guess} onChange={ handleGuessChange } />
        {
          (filteredJokers.length > 0) && (guess.length > 0) &&
          (
            <div className="joker_list">
              {
                filteredJokers.map((item, index) => {
                    return <button className="joker_select" type='button' onClick={
                    () => {
                      const newGuesses = guesses;
                      newGuesses.push(item);
                      console.log(newGuesses);
                      setGuesses(newGuesses);
                      setGuess("");
                    }}>
                      <img className='image' src={"src/assets/jokers/" + item['src']} />
                      <small>{item.name}</small>
                      {/* <small style={{ padding: '8px', borderRadius: '8px', backgroundColor: (item.rarity == "Common" ? "blue" : (item.rarity == "Uncommon" ? "green" : (item.rarity == "Rare" ? "red" : "purple"))) }}>{item.rarity}</small> */}
                    </button>
                })
              }
            </div>
          )
        }
      </form>
      <div>
      {
        (guesses.length > 0) &&
        (
          guesses.map((item, index) => {
            return <p>{item.name}</p>
          })
        )
      }
      </div>
    </>
  )
}

export default JokerGuessView
