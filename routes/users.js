var express = require('express');
var router = express.Router();
var _ = require('lodash');
let users = [{
user : "Max",
id: "0"
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*PUT new user. */
router.put('/', (req, res) => {
  const {user} = req.body;
  const id = _.uniqueId();
  user.push({user,id});
  res.json({
    message : ' added ${id}',
    user : { user, id}
  });
  });
  
 
  /* DELETE user. */
  router.delete('/:id', (req, res) => {
  const {id} = req.params;
  _.remove(users, ["id", id]);
  res.json({
    message : 'removed ${id}'
  });
  });

module.exports = router;
