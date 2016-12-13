'use strict';

let io = require('socket.io');

let getUser = (id, users) => {
  let user = '';
  for(let i=0;i<users.length;i++){
    let u = users[i];
    if(u.id = id){
      user = u;
      break;
    }
  }
  return user;
};

module.exports = function(server){
  let listener = io.listen(server);
  let id = '';
  let users = [];
  let username = '';
  let connections = [];
  listener.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('user connected: %s ', connections.length);
    socket.on('new user', (data) => {
      let userObject = {};
      userObject.id = id;
      userObject.name = data;
      socket.username = data;
      users.push(userObject);
      socket.broadcast.emit('user joined', {username: data});
    });

    socket.on('send message', (msg) => {
      console.log(users);
      let user = getUser(socket.id, users);
      console.log(socket.id);
      console.log('user========='+socket.user);
      listener.sockets.emit('chat message', {from: user.name, msg: msg});
    });

    socket.on('disconnect', (data) => {
      connections.splice(connections.indexOf(socket), 1);
      console.log('user left: %s ', connections.length);
    });

    socket.on('connect_failed', function(err) {
      console.log(err);
    });
  });
};
