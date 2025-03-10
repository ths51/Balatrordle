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
              <img src={"src/assets/jokers/" + item['src']} />
              <div className='block'> 
                <h2>{item['name']}</h2>
                <p>{item['effect']}</p>
              </div>
            </div>
        })
      }
      <button onClick={() => { console.log(data) }}>Print</button>
    </div>
  )
}

export default JokerListView
