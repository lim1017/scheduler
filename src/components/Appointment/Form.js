import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const [interviewerz, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  function cancel() {
    setInterviewer(null);
    setName("");

    props.onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewerz === null) {
      setError("Please Select an Interviewer");
      return;
    }
    setError("");

    props.onSave(name, interviewerz);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            onSubmit={event => event.preventDefault()}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewerz}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              validate();
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
