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
    message: [],
  });

  const onLogin = async (dataObj) => {
    dispatch({
      type: "JOIN",
      payload: dataObj,
    });

    socket.emit("ROOM:JOIN", dataObj)

    const { data } = await axios.get(`/rooms/${dataObj.roomId}`)
    dispatchUsers(data.users)
  }

  const dispatchUsers = users => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    })
  }

  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", dispatchUsers)
  }, [])
  return (
    <>
      {
        !state.isJoined 
        ? <Entry onLogin = {onLogin}/>
        : <Chat {...state}/>
      }
    </>
  );
}

export default App;
