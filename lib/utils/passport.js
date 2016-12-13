'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let MemberRepository = require('../repositories/member_repository');

let passportConfig = {
  init: function(){
    let memberRepo = new MemberRepository();

    passport.serializeUser((user, done) => {
      done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
      memberRepo.findByEmail(email, result => {
        done(null, result);
      }, err => {
        if(err){
          done(err);
        }
      })
    });

    let strategy = new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, (req, username, password, done) => {
      memberRepo.findByEmail(username, result => {
        if(!result){
          done(null, false, req.flash('message', 'Username or password is not valid !!'));
        }else if(!result.isValidPassword(password)){
          done(null, false, req.flash('message', 'Username or password is not valid !!'));
        }else{
          done(null, result);
        }
      }, err => {
        if(err){
          done(err);
        }
      });
    });

    passport.use('local', strategy);
    return passport.initialize();
  },

  auth: function(){
    return passport.authenticate('local', {successRedirect: '/chat', failureRedirect: '/', failureFlash: true});
  },

  session: function(){
    return passport.session();
  }
};

module.exports = passportConfig;
