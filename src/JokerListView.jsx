import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function JokerListView() {
  const [data, setData] = useState([])

  const getData = () => {
    fetch('src/backing_data/jokers.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then( (response) => {
        console.log(response);
        return response.json();
    })
    .then( (json) => {
        setData(json['jokers']);
        console.log(json['jokers']);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {
        data.map((item, index) => {
            return <div style={{ display: 'flex' }}> 
              <div className="joker">
                <img className='image' src={"src/assets/jokers/" + item['src']} />
                <img className='effect' src={"src/assets/card_effects/Foil.png"} style={{ maskImage: `url(src/assets/jokers/${item['src']})`, maskSize: "100%" }}/>
              </div>
              <div className='block'> 
                <h2>{item.name} {item.cost && ("- $" + item.cost)}</h2>
                <p>{item.effect}</p>
                <caption style={{ padding: '8px', borderRadius: '8px', backgroundColor: (item.rarity == "Common" ? "blue" : (item.rarity == "Uncommon" ? "green" : (item.rarity == "Rare" ? "red" : "purple"))) }}>{item.rarity}</caption>
              </div>
            </div>
        })
      }
      <button onClick={() => { console.log(data) }}>Print</button>
    </div>
  )
}

export default JokerListView
