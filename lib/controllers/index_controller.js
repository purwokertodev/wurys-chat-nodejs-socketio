'use strict';

let index = (req, res, next) => {
  res.render('index');
};

let start = (req, res, next) => {
  let name = req.body.name;
  res.redirect('/chat');
};

let chat = (req, res, next) => {
  res.render('chat');
};

module.exports = {
  index: index,
  start: start,
  chat: chat
};
