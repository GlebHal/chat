import React from 'react'
import axios from 'axios'

import "../styles/entry.scss"

export default function Entry({ onLogin }) {
    const [roomId, setRoomId] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [IsLoading, setLoading] = React.useState(false);

    const sendData = async () => {
        const dataObj = {
            roomId,
            userName,
        }

        setLoading(true)

        await axios.post("/rooms", {
            roomId,
            userName
        })

        onLogin(dataObj)
    }
    return (
        <div className='entry-wrapper'>
            <div>
                <div className="welcome-title">
                    Добро пожаловать в Мой чат!
                </div>
                <div className='entry-form-wrapper'>
                    <input type="text" 
                    className="room-id-input" 
                    placeholder='Номер комнаты' 
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}/>
                    <input type="text" 
                    className="user-name-input" 
                    placeholder='Ваше имя'
                    value={userName}
                    onChange={e => setUserName(e.target.value)}/>
                    <button 
                    disabled={IsLoading}
                    className="entry-button"
                     onClick={sendData}>Войти</button>
                </div>
            </div>
        </div>
  )
}
