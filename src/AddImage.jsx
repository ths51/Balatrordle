import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function submitImage() {
    const element = document.getElementById("image_submission");
    console.log("Jee");
}

function AddImage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <form id="image_submission" onSubmit={() => submitJoker()}>
        <p>Hello</p>
        <button type="submit">H</button>
      </form>
    </>
  )
}

export default AddImage