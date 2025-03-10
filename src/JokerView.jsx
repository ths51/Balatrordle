import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function JokerView() {

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {
        data.map((item, index) => {
            return <p>fadf</p>
        })
      }
      <button onClick={() => { console.log(data) }}>Print</button>
    </div>
  )
}

export default JokerView
