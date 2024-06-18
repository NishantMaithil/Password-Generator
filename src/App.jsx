/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  //declaring Hooks
  const [length,setLength] = useState(6);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");


  //this function is generating password
  const passwordGenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) str += "1234567890";
      if(charAllowed) str +="!@#$%^&*~";
      for(let i = 0;i<length;i++){
        let ch = Math.floor(Math.random() * str.length + 1);
        pass+= str.charAt(ch);
      }
      setPassword(pass)
  }
  ,[length,numberAllowed,charAllowed,setPassword]); // adding dependencies if changes made in this elements change will be reflected...

  
  const passwordRef = useRef(null);

  const copyTextToClipboard = useCallback(()=>{
    passwordRef.current?.select(); 
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(
    ()=>
    {passwordGenerator()},
    [length,numberAllowed,charAllowed,passwordGenerator]);
    
  return (
    <>
       <h1 className="text-4xl text-center text-white mt-5">Password </h1>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type='text' 
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
          className="outline-none w-full px-2"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyTextToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-3 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
              type="checkbox"
              defaultChecked = {numberAllowed}
              id = "numberInput"
              onChange={()=>{
                setNumberAllowed((prev) => !prev);
              }
            }
            />
            </div>
            <label htmlFor="numberInput">Numbers </label>
             
            <div className = "flex items-center gap-x-1">
              <input type="checkbox"
                defaultChecked = {charAllowed}
                id = "charInput"
                onChange={()=>{
                  setCharAllowed((prev)=> !prev);
                }}
              />
              <label htmlFor="charInput">Character</label>
            </div>

        </div>
      </div>
     
    </>
  )
}

export default App
