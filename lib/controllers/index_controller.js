'use strict';

let index = (req, res, next) => {
  res.render('index');
};

let chat = (req, res, next) => {
  let member = req.user;
  res.render('chat', {'member': member});
};

module.exports = {
  index: index,
  chat: chat
};
