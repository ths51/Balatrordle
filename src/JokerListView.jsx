import { React, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// THANK YOU https://docs.dndkit.com/

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
        // console.log(response);
        return response.json();
    })
    .then( (json) => {
        setData(json['jokers']);
        // console.log(json['jokers']);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {
        data.map((item, index) => {
            return <div> 
              <div className="joker">
                <img className='image' src={"src/assets/jokers/" + item['src']} />
                {/* <img className='effect' src={"src/assets/card_effects/Foil.png"} style={{ maskImage: `url(src/assets/jokers/${item['src']})`, maskSize: "100%" }}/> */}
                <p>{item.name} {item.cost && ("- $" + item.cost)}</p>
                {/* <small>{item.effect}</small> */}
                <p style={{ padding: '8px', borderRadius: '8px', backgroundColor: (item.rarity == "Common" ? "blue" : (item.rarity == "Uncommon" ? "green" : (item.rarity == "Rare" ? "red" : "purple"))) }}>{item.rarity}</p>
              </div>
            </div>
        })
      }
      <button onClick={() => { console.log(data) }}>Print</button>
    </div>
  )
}

export default JokerListView
