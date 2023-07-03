import './App.css';
import React, {useState } from 'react'
import axios from "axios"

function App() {
  const [input, setinput] = useState('')
  const API = axios.create({baseURL:'http://localhost:8000/'})
  const sending = (input)=>{
    API.post("textInput", {input}).then((aps)=>
    console.log("done", aps))
  }
  const handlesubmit = (e) =>{
    e.preventDefault()
    console.log(input)
    sending(input)
  }
  const handleNgram = async()=>{
    const aps = await axios.get("http://localhost:8000/getNgrams")
    console.log(aps.data.ngram , aps.data.comparison)
    return aps
  }
  return (
    <div className="container">
      <form className='mt-5 col-6 mx-auto' onSubmit={handlesubmit} >
            <div class="form-floating" >
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}  onChange={(e) => setinput(e.target.value)} ></textarea>
                <label for="floatingTextarea2">Input Sentence</label>
            </div>
            <button className='btn btn-primary mt-3' type='submit'>Submit</button>
      </form>
      <button className='btn btn-dark' onClick={handleNgram}>Request Ngrams</button>
    </div>
  );
}

export default App;
