import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function submitJoker() {
    const element = document.getElementById("joker_submission");
    const file = document.getElementById('joker_img').value;
    console.log(file);
    
}

function AddJoker() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form id="joker_submission" onSubmit={() => submitJoker()}>
        <p>Hello</p>
        <input type="file" id="joker_img" name="joker_img" accept="image/png" />
      </form>
      <button onClick={() => submitJoker()}>H</button>
    </>
  )
}

export default AddJoker
