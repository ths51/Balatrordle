import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function submitJoker() {
    const element = document.getElementById("joker_submission");
    console.log("Jee");
}

function AddJoker() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form id="joker_submission" onSubmit={() => submitJoker()}>
        <p>Hello</p>
        <button type="submit">H</button>
      </form>
    </>
  )
}

export default AddJoker
