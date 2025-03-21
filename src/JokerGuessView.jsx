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

  return (
    <>
      <h1>BALATRLE</h1>
      {/* <p>{joker['name']}</p> */}
      <form id="guess_form">
        {
          (guesses.length < 6) &&
          <input id="guess" className="guess_input" value={guess} onChange={ handleGuessChange } />
        }
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
      <table className='guess_list'>
        <tr>
          <th><small>Img</small></th>
          <th><small>Joker Name</small></th>
          <th><small>Cost</small></th>
          <th><small>Rarity</small></th>
        </tr>
      {
        (guesses.length > 0) &&
        (
          guesses.map((item, index) => {
            return <tr>
                <td className='guess_item' style={{ backgroundColor: ((item.id == joker.id) ? "#0b2" : "none") }}>
                  <img className='image' src={"src/assets/jokers/" + item['src']} />
                </td>
                <td className='guess_item' style={{ backgroundColor: ((item.name == joker.name) ? "#0b2" : "none") }}>{item.name}</td>
                <td className='guess_item' style={{ backgroundColor: ((item.cost == joker.cost) ? "#0b2" : ((-1 <= (item.cost - joker.cost) && (item.cost - joker.cost) <= 1) ? "#da0" : "none")) }}>${item.cost}</td>
                <td className='guess_item' style={{ 
                  backgroundColor: 
                    (joker.rarity == "Common" ? 
                      (item.rarity == "Common" ? "#0b2" : (item.rarity == "Uncommon" ? "#da0" : "none")) :
                    (joker.rarity == "Uncommon" ? 
                      (item.rarity == "Common" ? "#0b2" : ((item.rarity == "Common" || item.rarity == "Rare") ? "#da0" : "none")) :
                    (joker.rarity == "Rare" ? 
                      (item.rarity == "Common" ? "#0b2" : ((item.rarity == "Uncommon" || item.rarity == "Legendary") ? "#da0" : "none")) :
                    (joker.rarity == "Legendary" ? 
                      (item.rarity == "Common" ? "#0b2" : (item.rarity == "Rare" ? "#da0" : "none")) :
                    "none"))))
                 }}>{item.rarity}</td>
              </tr>
          })
        )
      }
      </table>
      </div>
    </>
  )
}

export default JokerGuessView
