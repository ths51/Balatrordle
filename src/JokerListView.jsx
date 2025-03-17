import { React, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// THANK YOU https://docs.dndkit.com/

function JokerListView(jokers) {
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
    <div className="joker_list">
      {
        data.map((item, index) => {
            return <button className="joker_select">
              <img className='image' src={"src/assets/jokers/" + item['src']} />
              <p>{item.name}</p>
              {/* <small style={{ padding: '8px', borderRadius: '8px', backgroundColor: (item.rarity == "Common" ? "blue" : (item.rarity == "Uncommon" ? "green" : (item.rarity == "Rare" ? "red" : "purple"))) }}>{item.rarity}</small> */}
            </button>
        })
      }
      <button onClick={() => { console.log(data) }}>Print</button>
    </div>
  )
}

export default JokerListView
