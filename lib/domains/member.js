'use strict';

let Member = function(id, fullName, email, password){
  this.id = id;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
}

Member.prototype.isValidPassword = function(password){
  return this.password === password;
};

module.exports = Member;
