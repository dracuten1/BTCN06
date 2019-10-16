var express = require('express');
var router = express.Router();
const account = require('../services/aws-dynamoDb');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function (req, res) {
  Users().then(user => res.json(user))
});

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
module.exports = router;
