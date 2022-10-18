import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './Chats';

const socket = io.connect('http://localhost:2001');

function  App(){
 const [username, setUsername] = useState("");
 const [room, setRoom] = useState("");
 const [showChat, setShowChat] = useState(false);


const joinRoom = () =>{
if (username !== "" && room !== ""){
  socket.emit("join_room",room);
  setShowChat(true);
}
}

 return (
      <div className="App">
        { !showChat ? (  
        <div className='joinChatContainer'>
        <h4 className='font'>Join A ChatRoom</h4>
        <input type='text' placeholder='Name...' onChange={(e)=> {setUsername(e.target.value)}} />
        <input type='text' placeholder='Room ID...' onChange={(e)=> {setRoom(e.target.value)}} />
        <button onClick={joinRoom}>Join Chat</button>
        </div>)
        :( 
        <Chats socket={socket} username={username} room={room} />
        )}
      </div>
    );
  }


export default App;
