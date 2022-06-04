import React from 'react'

import "../styles/chat.scss"

export default function Chat({ users, messages }) {
  return (
      <>
        <div className='chat-container'>
            <header>
                <div className="room-name">My Room</div>
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
                        <div className='message-box'>
                            <div className='message'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fuga ut architecto laudantium ipsum natus laboriosam quam ratione necessitatibus minima?</div>
                            <div className='sender'>Gleb</div>
                        </div>
                    </div>
                    <div className='form-container'>
                        <form>
                            <textarea type="text" placeholder="Сообщение"></textarea>
                            <button>Отправить</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
      </>
  )
}
