import React from "react";
import DayListItem from "components/DayListItem";



function DayList(props){
  const items = props.days ? props.days.map( 
    day =>{ 
      return <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.dayz}
      setDay={props.setDay}/>
  }) : [];

  return(
    <ul>
      {items}
    </ul>
  )
}

export default DayList