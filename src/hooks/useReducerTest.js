import React, { useReducer, useEffect } from "react";

const axios = require('axios').default;


export default function useReducerTest(){


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAYLIST = "SET_DAYLIST";


const [state, dispatch] = useReducer(reducerz, {
  day: "Monday", //for selected day
  days: [],  //for db data
  appointments: {},
  interviewers:{}
});

const setDay = day => dispatch({type:SET_DAY, value:day });


useEffect(() => {

  Promise.all([
  axios.get("/api/days"),
  axios.get("/api/appointments"),
  axios.get("/api/interviewers")
  ]).then((all) =>{
    const[days, appointments, interviewers]=all;
    dispatch({type:SET_APPLICATION_DATA, 
      value: {days: days.data, appointments: appointments.data, interviewers: interviewers.data}})        
  })
}, []);

// useEffect(()=>{
//   const webSocketss = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
 

//   webSocketss.onmessage = function (event) {
//     let jsonMsg=JSON.parse(event.data)
//     let interview=jsonMsg.interview
//     let id=jsonMsg.id
//     console.log(jsonMsg, 'from websocket')
//     console.log(jsonMsg.id,'asdfasdf')

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
  
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
   
//     console.log(appointment)
//     dispatch({type:jsonMsg.type, value:{appointments}})
//   }

//   return ()=> webSocketss.close()
// },[]);

useEffect(() => {
  
  axios.get("/api/days")
  .then((days) =>{
    
    dispatch({type:SET_DAYLIST, 
      value: {days: days.data}})        
  })
  
}, [state.appointments]);



function bookInterview(id, interview) {  

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

return axios.put(`/api/appointments/${id}`,appointment)
.then(res =>{   
  dispatch({ type: SET_INTERVIEW,
  value: {appointments}
  })   
})
}

function cancelInterview(id){

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.delete(`/api/appointments/${id}`) .then(res=>{ 
    dispatch({ type: SET_INTERVIEW,
      value: {appointments}
      })  
  })
}


function reducerz(state, action) {


  switch (action.type) {
    case SET_DAY:
      return {...state, day:action.value}
    case SET_APPLICATION_DATA:
      return {...state, days: action.value.days, appointments:action.value.appointments, interviewers:action.value.interviewers}
    case SET_INTERVIEW: 
      return {...state, appointments: action.value.appointments} 
    case SET_DAYLIST: 
      return {...state, days: action.value.days} 
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

return {state, setDay, reducerz, bookInterview, cancelInterview}

}