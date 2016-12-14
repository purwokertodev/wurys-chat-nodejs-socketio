'use strict';

let io = require('socket.io');
let MemberRepository = require('../repositories/member_repository');

module.exports = function(server){
  let listener = io.listen(server);
  let id = '';
  let users = [];
  let connections = [];
  listener.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('user connected: %s ', connections.length);
    socket.on('new user', (email) => {
      let memberRepo = new MemberRepository();
      memberRepo.findByEmail(email, data => {
        users.push(data);
        socket.broadcast.emit('user joined', {username: data.fullName});
      }, err => {

      })
    });

    socket.on('send message', (msg) => {
      console.log(users);
      console.log(`member : ${msg.from}, message: ${msg.msg}`);
      listener.sockets.emit('chat message', {from: msg.from, msg: msg.msg});
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
