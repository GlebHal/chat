import React from "react";
import axios from "axios";

import Entry from "./Entry";
import reducer from "../reducer"
import socket from '../socket'
import Chat from "./Chat";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    isJoined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (dataObj) => {
    dispatch({
      type: "JOIN",
      payload: dataObj,
    });

    socket.emit("ROOM:JOIN", dataObj)

    const { data } = await axios.get(`/rooms/${dataObj.roomId}`)

    dispatch({
      type: "SET_DATA",
      payload: data
    })
  }

  const dispatchUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    })
  }

  const dispatchMessage = (message) => {
    dispatch({
      type: "SET_MESSAGES",
      payload: message,
    })
  }
  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", dispatchUsers)
    socket.on("ROOM:SET_MESSAGES", dispatchMessage)
  }, [])
  return (
    <>
      {
        !state.isJoined 
        ? <Entry onLogin = {onLogin}/>
        : <Chat {...state} addMessage = {dispatchMessage}/>
      }
    </>
  );
}

export default App;
