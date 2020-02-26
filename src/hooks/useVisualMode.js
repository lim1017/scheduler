import React, { useState, useEffect } from "react";

export function useVisualMode(initialState) {
  const [mode, setMode] = useState(initialState);
  const [history, setHistory] = useState([initialState]);

  function transition(chgState, replace = false) {
    setMode(chgState);

    if (replace) {
      setHistory(currentHis => currentHis.slice(0, currentHis.length - 1));
    }
    setHistory(currentHistory => [...currentHistory, chgState]);
  }

  function back() {
    if (history.length === 1) {
      setMode(initialState);
    } else if (history.length > 1) {
      setMode(() => history[history.length - 2]);
      setHistory(history => history.slice(0, history.length - 1));
    }
  }

  return { mode, transition, back };
}
