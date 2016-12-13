'use strict';

let fs = require('fs');
let Member = require('../domains/member');

let MemberRepository = function(){

};

MemberRepository.prototype = {
  findByEmail: (email, cb, errCb) => {
    fs.readFile('member.json', 'utf8', (err, data) => {
      if(err){
        errCb(err);
      }
      let memberData = JSON.parse(data);
      let member = '';
      for(let i=0;i<memberData.length;i++){
        if(email === memberData[i].email){
          member = memberData[i];
          break;
        }
      }
      let memberModel = new Member(member.id, member.full_name, member.email, member.password);
      cb(memberModel);
    });
  }
};

module.exports = MemberRepository;
