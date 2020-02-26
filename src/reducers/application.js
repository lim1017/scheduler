const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAYLIST = "SET_DAYLIST";
const ADD_SPOT = "ADD_SPOT";
const REMOVE_SPOT = "REMOVE_SPOT";

export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    case SET_INTERVIEW:
      return { ...state, appointments: action.value.appointments };
    case SET_DAYLIST:
      return { ...state, days: action.value.days };
    case ADD_SPOT:
      return {
        ...state,
        days: state.days.map((day, i) =>
          i === action.value ? { ...day, spots: day.spots + 1 } : day
        )
      };
    case REMOVE_SPOT:
      return {
        ...state,
        days: state.days.map((day, i) =>
          i === action.value ? { ...day, spots: day.spots - 1 } : day
        )
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAYLIST,
  ADD_SPOT,
  REMOVE_SPOT
};
