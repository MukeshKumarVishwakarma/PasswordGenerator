import {useState ,useCallback,useEffect} from 'react'
import './App.css'
import { useRef } from 'react'
function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const[upperCase,setUpperCase]=useState(false)
  const[lowerCase,setLowerCase]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)   str+="!@#$%^&*~`{}[]-_"
    if(upperCase)     str=str.toUpperCase()
    if(lowerCase)     str=str.toLowerCase()
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,upperCase,lowerCase,setPassword])

  const copyPasswordTextClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,upperCase,lowerCase,passwordGenerator])
  return (
    <div className='w-full  mx-auto shadow-md rounded-lg
     px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h2 className='text-white text-center my-3'>Password generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        placeholder='password'
        className='outline-none w-full py-1 px-3'
        ref={passwordRef}
        readOnly
        />
        <button
        onClick={copyPasswordTextClipBoard}
        className='outline-none bg-blue-700 text-white 
        px-3 py-0.5 shrink-0'>
          copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox" 
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor="charInout">Characters</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecked={upperCase}
          id='convertUpper'
          onChange={()=>{
            setUpperCase((prev)=>!prev)
          }}
          />
          <label htmlFor="convertUpper">Upper</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecked={lowerCase}
          id='convertLower'
          onChange={()=>{
            setLowerCase((prev)=>!prev)
          }}
          />
          <label htmlFor="convertUpper">Lower</label>
        </div>
      </div>
    </div>
  )
}
export default App
