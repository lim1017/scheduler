import React, { useReducer, useEffect } from "react";

const axios = require('axios').default;


export default function useReducerTest(){


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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

  console.log(action)

  switch (action.type) {
    case SET_DAY:
      return {...state, day:action.value}
    case SET_APPLICATION_DATA:
      return {...state, days: action.value.days, appointments:action.value.appointments, interviewers:action.value.interviewers}
    case SET_INTERVIEW: 
      return {...state, appointments: action.value.appointments} 
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

return {state, setDay, reducerz, bookInterview, cancelInterview}

}