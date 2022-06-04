import React from "react"

export default function MessageBox({ message, userName, user }){
    return (
        <div className={user == userName ? "message-box user-visibility" : "message-box"}>
            <div className={user == userName ? "message user-color" : "message companion-color"}>{message}</div>
            <div className='sender'>{userName}</div>
        </div>
    )
}