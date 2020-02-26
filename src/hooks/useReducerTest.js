import React, { useReducer, useEffect } from "react";
import reducerz, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAYLIST,
  ADD_SPOT,
  REMOVE_SPOT
} from "reducers/application";

const axios = require("axios").default;

export default function useReducerTest() {
  const [state, dispatch] = useReducer(reducerz, {
    day: "Monday", //for selected day
    days: [], //for db data
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }
      });
    });
  }, []);


  //WEB SOCKET ATTEMPT, DID NOT COMPLETE
  // useEffect(()=>{
  //   const webSocketss = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

  //   webSocketss.onmessage = function (event) {
  //     let jsonMsg=JSON.parse(event.data)
  //     let interview=jsonMsg.interview
  //     let id=jsonMsg.id
  //     console.log(jsonMsg, 'from websocket')
  //     console.log(jsonMsg.id,'asdfasdf')

  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };

  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };

  //     console.log(appointment)
  //     dispatch({type:jsonMsg.type, value:{appointments}})
  //   }

  //   return ()=> webSocketss.close()
  // },[]);

  // useEffect(() => {

  //   axios.get("/api/days")
  //   .then((days) =>{

  //     dispatch({type:SET_DAYLIST,
  //       value: {days: days.data}})
  //   })

  // }, [state.appointments]);

  function bookInterview(id, interview, create) {
    const day = Math.floor((id - 1) / 5);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments } });
      if (create) {
        dispatch({ type: REMOVE_SPOT, value: day });
      }
    });
  }

  function cancelInterview(id) {
    const day = Math.floor((id - 1) / 5);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatch({ type: SET_INTERVIEW, value: { appointments } });

      dispatch({ type: ADD_SPOT, value: day });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
