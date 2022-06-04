import React from 'react'
import socket from '../socket'

import "../styles/chat.scss"
import MessageBox from './MessageBox'

export default function Chat({ users, messages, userName, roomId, addMessage }) {
    const [value, setValue] = React.useState("")

    const sendMessage = () => {
        socket.emit("ROOM:SEND_MESSAGE", {
            roomId: roomId,
            messageObj: {
                userName,
                message: value,
            }
        })
        addMessage({
            userName,
            message: value,
        })

        setValue("")
    }

  return (
      <>
        <div className='chat-container'>
            <header>
                <div className="room-name">{roomId}</div>
                <div className='users-count'>Пользователей: {users.length}</div>
            </header>
            <main>
                <div className="users">
                    {
                        users.map((user, index) => (
                            <div className="user" key={index}>{user}</div>
                        ))
                    }
                </div>
                <div className="chat-container">
                    <div className="chat">
                        {
                            messages.map((message, index) => (
                                <MessageBox {...message} user={userName} key={index}/>
                            ))
                        }
                    </div>
                    <div className='form-container'>
                        <form>
                            <textarea 
                            type="text" 
                            placeholder="Сообщение" 
                            value={value} 
                            onChange={(e) => setValue(e.target.value)}></textarea>
                            <button type="button" onClick={sendMessage}>Отправить</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
      </>
  )
}
