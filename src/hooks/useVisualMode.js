import React, { useState, useEffect } from "react";


export default function useVisualMode(initialState){

  const [mode, setMode] = useState(initialState);
  const [history, setHistory] = useState([initialState]);


  function transition(chgState, replace = false){
  
    setMode(chgState)  
    setHistory(currentHistory => [...currentHistory, chgState])
  
    if (replace){
        setHistory([initialState])
    }
  }

  function back() { 
    if(history.length ===1){
      setMode(initialState)
    }

    if(history.length>1){

    setMode(() => history[history.length-2])
    setHistory(history => history.slice(0, history.length-1))
    
    }
  }


  

  return { mode, transition, back };
}

