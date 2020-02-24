import "components/InterviewerList.scss";
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';



function InterviewerList(props) {

  const items = props.interviewers ? props.interviewers.map(
    interviewer =>{
    return <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name} 
    setInterviewer={event => props.setInterviewer(interviewer.id)}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    />
    }) : [];


return(
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {items}
  </ul>
  </section>  
)
}

InterviewerList.propTypes = {
  setInterviewer: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default InterviewerList

//interviewers

