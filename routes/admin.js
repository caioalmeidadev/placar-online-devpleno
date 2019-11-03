var express = require('express');
var router = express.Router();


function adminRouter(dependencies){

  const {db,io} = dependencies
  /* GET home page. */
router.get('/', function(req, res, next) {
  const matches = db.get('matches').value()
  res.render('admin/index', { matches });
});

router.get('/match/:id', function(req,res,next){
  const matches = db.get('matches').value()
  const match =  db.get('matches['+req.params.id+']').value()

  res.render('admin/match',{match,matches,id:req.params.id})
})

router.post('/match/:id/score',function(req,res,next){
  db.set('matches['+ req.params.id +'].team-a.score',parseInt(req.body.scoreA)).write()
  db.set('matches['+ req.params.id +'].team-b.score',parseInt(req.body.scoreB)).write()

  io.emit('score',{
    match : req.params.id,
    scoreA : req.body.scoreA,
    scoreB : req.body.scoreB,
    notify : req.body.notify || 0
  })

  res.send(req.body)
})


 

return router;
}


module.exports = adminRouter;
