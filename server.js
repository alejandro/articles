var express = require('express'),
    crypto = require('crypto'),
    url = require('url'),
    sys = require('util'),
    app = module.exports =  express.createServer( express.cookieParser(),
  express.session({ secret: 'keyboard cat' })),
    groups =[];
/* A little hack for correct handle of session */
  
app.configure(function(){
  app.set('views',__dirname+ '/views');
  app.set('view engine','jade');
  app.use(app.router);
  app.use(express.static(__dirname+'/public'));
  app.use(express.methodOverride());
  app.use(express.bodyParser());
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
app.dynamicHelpers({
  message: function(req){
    var err = req.session.error
      , msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    if (err) return '<p class="msg error">' + err + '</p>';
    if (msg) return '<p class="msg success">' + msg + '</p>';
  }
});

app.get('/', function(req, res){
  res.send('ok')
});

app.get('/a/:art',function(req,res){
  var fs =require('fs');
  var md = require('marked'); 
  var art = req.params.art;
  fs.readFile(__dirname + '/' + art, function(e,d){
    res.end(md(d));
  });
});
app.get('/login', function(req, res){
  res.render('login',{title:'Hol'});
});

app.post('/login', function(req, res){
});
// Regresa el index num de un valor en una array como el de un 
// objeto objeto["VALOR"] -> array[indexOf(array,VALOR)]
function indexOf(array, value){
  var i = 0, f=-1;
  array.forEach(function(v) {
    if (v.member.groupName === value) {
      f = i;
    } else if (array.length=== i){
      return false;
    } else {
      i++;
    }
  });    
  return f;
}
// Una array es miembro 
function isMember(array,path){
  var i = 0,f=-1;
  array.forEach(function(v){
    if (v.member.groupName === path) {
      f = 0;
    } else {
      i++
    }
  });
  return f;
}
app.listen(process.env.PORT || 8080);
console.log('Server on port: %s \non: %s ',app.address().port,app.settings.env);

