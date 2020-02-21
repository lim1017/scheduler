import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";




function Form(props) {

  const [interviewerz, setInterviewer] = useState(props.interviewer || null)
  const [name, setName] = useState(props.name || "")

  function cancel(){
    setInterviewer(null)
    setName("")

    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={ event => {
          setName(event.target.value) 
         }}
        onSubmit={event => event.preventDefault()}

        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewerz} setInterviewer={setInterviewer}
 />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={()=>cancel()}>Cancel</Button>
      <Button confirm onClick={()=>props.onSave(name, interviewerz)} >Save</Button>

    </section>
  </section>
</main>
  )}


export default Form