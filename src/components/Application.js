import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";

// import  useApplicationData from "../hooks/useApplicationData";
import useReducerTest from "../hooks/useReducerTest";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useReducerTest();

  const interviewzz = getInterviewersForDay(state, state.day);
  const dayAppointments = getAppointmentsForDay(state, state.day);

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
          <DayList days={state.days} dayz={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {dayAppointments.map(singleAppointment => {
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
              // data-testid="appointmentList"
            />
          );
        })}

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
