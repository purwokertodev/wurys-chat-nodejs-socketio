'use strict';

let io = require('socket.io');

let getUser = (id, users) => {
  let user = '';
  for(let i=0;i<users.length;i++){
    if(id === users[i].id){
      user = users[i];
      break;
    }
  }
  return user;
};

module.exports = function(server){
  let listener = io(server);
  let users = [];
  let userObject = {};
  let user = '';
  listener.on('connection', (socket) => {
    console.log('user connected..');

    socket.on('new user', (user) => {
      userObject.id = socket.id;
      userObject.name = user;
      users.push(userObject);
      console.log(users);
      user = getUser(socket.id, users);
      socket.broadcast.emit('new user', {username: user.name});
    });

    socket.on('chat message', (msg) => {
      console.log(`message from ${user.name}: ${msg.msg}`);
      msg.from = user.name;
      listener.emit('chat message', msg);
    })

    socket.on('connect_failed', function(err) {
      console.log(err);
    });
  });
};
