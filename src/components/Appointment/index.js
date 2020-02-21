import "components/Appointment/styles.scss";
import React, { Fragment } from 'react'


import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "./Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import  useVisualMode from "../../hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETE= "DELETE"
const CONFIRM= "CONFIRM"
const EDIT="EDIT"
const ERROR="ERROR"


function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW)
    })
    .catch(()=> transition(ERROR, true))
  }

  function deletes(){
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=> transition(ERROR, true))

  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
      
      
      {mode === SHOW && (
      <Show
        appId={props.key}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
        onEdit={()=>transition(EDIT)}

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
        
      {mode === EDIT && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() =>back()}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === SAVING && (
      <Status message="Saving..." />
      )}

      {mode === DELETE && (
      <Status message="Deleting..." />
      )}

      {mode === CONFIRM && (
      <Confirm 
      message="Are you sure you want to delete?" 
      onConfirm={()=> deletes()}
      onCancel={()=>back()}
      />
      )}

      {mode === ERROR && (
      <Error message='error occured' onClose={()=>back()}/>
      )}
    </article>

  )
}


export default Appointment