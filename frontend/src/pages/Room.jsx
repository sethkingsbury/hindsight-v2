import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const { io } = require('socket.io-client');

function Room() {
  const location = useLocation();
  const socket = io('http://localhost:5000/');

  const listener = (...args) => {
    console.log(args);
  };

  socket.on('join', listener);

  useEffect(() => {
    socket.emit('join', location.state.code);
  }, []);

  return <div>Room: {location.state.code}</div>;
}

export default Room;
