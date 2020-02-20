import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"

const axios = require('axios').default;

//the data we need is from the FORM component
//we pass bookinterview down in <Appointment> so we 
//can call it passing in the data we need



export default function Application(props) {


  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday", //for selected day
    days: [],  //for db data
    appointments: {},
    interviewers:{}
  });


  function bookInterview(id, interview) {  
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
    
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
    
      setState({
        ...state,
        appointments
      })    
    return axios.put(`/api/appointments/${id}`,appointment)
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


  const interviewzz = getInterviewersForDay(state, state.day);
  const dayAppointments=getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
<img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  dayz={state.day}
  setDay={setDay}
/>

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>      
      </section>

      <section className="schedule">


      {dayAppointments.map((singleAppointment) =>{
          const interview = getInterview(state, singleAppointment.interview);

          
        return (
          <Appointment 
          key={singleAppointment.id} 
          id={singleAppointment.id}
          time={singleAppointment.time}
          interview={interview}
          interviewers={interviewzz} 
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />

        )
      })}

      <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
