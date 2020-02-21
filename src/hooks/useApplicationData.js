import React, { useState, useEffect } from "react";
const axios = require('axios').default;


export default function useApplicationDaya(initialState){

const setDay = day => setState({ ...state, day });

const [state, setState] = useState({
  day: "Monday", //for selected day
  days: [],  //for db data
  appointments: {},
  interviewers:{}
});


useEffect(() => {
  Promise.all([
  axios.get("/api/days"),
  axios.get("/api/appointments"),
  axios.get("/api/interviewers")
  ]).then((all) =>{
    const[days, appointments, interviewers]=all;

    setState({...state, days:days.data, appointments:appointments.data, interviewers:interviewers.data})        
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
    setState({
    ...state,
    appointments
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
      setState({
        ...state,
        appointments
      })
    })
}

return {state, setDay, bookInterview, cancelInterview}

}