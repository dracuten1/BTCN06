var express = require('express');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'nguyenleminhtuyen';

var router = express.Router();
const account = require('../services/aws-dynamoDb');

router.post('/register', function (req, res, next) {
  const { name, password } = req.body;
  const user = {
    name: name,
    pass: password
  }
  account.add(user).then(data => {
    console.log(data);
    res.json({ data, msg: 'account created successfully' })
  }).catch(err => {
    res.json({ err, msg: 'Error' })
  });
})

router.post('/login', async function (req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    try {
      const user = await account.get(name);
      if(user.Item.password==password){
        let payload = { userId: name };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      }
    } catch (err) {
      res.json({ err, msg: 'Error' })
    }
  }
  res.json({ msg: 'Login fail!' })
})


module.exports = router;
