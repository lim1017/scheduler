


export  function getAppointmentsForDay (state, day){
  const appArr=[]
  let appointments4Day

  for (let element of state.days){
    if(element.name === day){
      appointments4Day=element.appointments
    }
  }
  
  if (appointments4Day===undefined){
    return []
  }

  Object.keys(state.appointments).forEach(element =>{
    if (appointments4Day.includes(parseInt(element))){
      appArr.push(state.appointments[element])
    }
  })

  return appArr
}



export function getInterview(state, interview){
  if (interview===null){
    return null
  }


  const interviewObj={
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return interviewObj

}


export function getInterviewersForDay (state, day){
  const appArr=[]
  let interviews4Day

  console.log(state)
  console.log(day)

  for (let element of state.days){
    if(element.name === day){
      interviews4Day=element.interviewers
    }
  }
  
  if (interviews4Day===undefined){
    return []
  }

  Object.keys(state.interviewers).forEach(element =>{
    if (interviews4Day.includes(parseInt(element))){
      appArr.push(state.interviewers[element])
    }
  })
  console.log(appArr)
  return appArr
}

