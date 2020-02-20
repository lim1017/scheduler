import "components/Appointment/styles.scss";
import React, { Fragment } from 'react'


import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "./Empty";
import Form from "components/Appointment/Form";



import  useVisualMode from "../../hooks/useVisualMode";




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE= "CREATE"


function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log('savedd')
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
  }


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
      
      
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      )}

      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() =>back()}
          onSave={save}


        />
      )}
    </article>

  )
}


export default Appointment