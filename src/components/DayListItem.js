import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';



function DayListItem(props) {

  let dayClass=classNames({
    'day-list__item':true,
    'day-list__item--selected':props.selected,
    'day-list__item--full':props.spots===0
  })
 
  function spotsRemaining(){
    return props.spots===0 ? "no spots remaining" : props.spots===1 ? `${props.spots} spot remaining` :`${props.spots} spots remaining`


  }

  return (
    <li className={dayClass} onClick={()=>props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsRemaining()}</h3>
    </li>
  );
}

export default DayListItem


