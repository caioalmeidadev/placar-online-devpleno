var express = require('express');
var router = express.Router();


function adminRouter(dependencies){

  const {db,io} = dependencies
  /* GET home page. */
router.get('/', function(req, res, next) {
  const matches = db.get('matches').value()
  res.render('admin/index', { matches });
});

router.get('match/:id', function(req,res,next){
  const matches = db.get('matches').value()
  const match =  db.get('match['+req.params.id+']').value()

  res.render('admin/match',{match,matches,id:req.params.id})
})

return router;
}


module.exports = adminRouter;
