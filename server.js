var express = require('express'),
    crypto = require('crypto'),
    url = require('url'),
    sys = require('util'),
    app = module.exports =  express.createServer( express.cookieParser(),
  express.session({ secret: 'keyboard cat' })),
    groups =[];
    var fs = require('fs');
    var path = require('path');
    var ghm = require('github-flavored-markdown');
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
  res.writeHeader(200,{'Content-type':'text/html'});
  res.write('<!doctype html>')
  res.write('<html>')
  res.write('<head><meta charset="utf8" /><title>Articulos</title>')
  res.write('<link href="/stylesheets/markdown.css" rel="stylesheet" /></head>')
  res.write('<body>')
  res.write('<article class="markdown-body">')
  res.write('<h1>Hola los articulos disponibles son:</h1><ul><li>');
  res.write(months().map(function(month){
            var _data = '';
            var posts =fs.readdirSync(path.join(__dirname,'posts',month));
            _data +='<ul> <h3> '+month+':</h3><li>'
            var s = posts.map(function(v){
              return '<a href="/posts/'+parseInt(month.substr(-4))+'/'+month.substr(0,3)+'/'+v+ '">'+ v+'</a>';
            }).join('</li><li>')
            _data += s;
            _data +='</li> </ul>'
            return _data;
          }).join('</li><li>'));
  res.write('</article>')
  res.write('<footer>Archive made by <a href="//alejandromorales.co.cc">Alejandro Morales</a></footer>')
  res.end('</body></html>');
});
var months = function(){
  return fs.readdirSync(path.join(__dirname,'/posts'));
};
var shortMonths = {
  'ene':'enero',
  'feb':'febrero',
  'mar':'marzo',
  'abr':'abril',
  'may':'mayo',
  'jun':'junio',
  'jul':'julio',
  'ago':'agosto',
  'sep':'septiembre',
  'oct':'octubre',
  'nov':'noviembre',
  'dic':'diciembre'
}
app.get('/posts/:year/:month/:id',function(req,res){
  var year = req.params.year;
  var m = req.params.month;
  var id = req.params.id;
  var re = m + year;
  if (shortMonths[m] !== undefined && months().indexOf(re) !==-1  ){ 
    // Read the post?
    fs.readFile(path.join(__dirname,'posts',re, id,'README.md'), 'utf8', function(e,d){
      if (e && e.code == 'ENOENT'){
        res.end('404 NOT_FOUND');
      } else if (e){
        res.end('500, INTERNAL SERVER ERROR');
      } else {
        var post ='<h1> Archivo mal formado</h1>';
        try {
          post = ghm.parse(d || '# POST NOT FOUND');
        } catch(e){}
        res.writeHeader(200,{'Content-type':'text/html'});
        res.write('<!doctype html>')
        res.write('<html>')
        res.write('<head><meta charset="utf8" /><title>' + re +id +  '</title>')
        res.write('<link href="/stylesheets/markdown.css" rel="stylesheet" /></head>')
        res.write('<body>')
        res.write('<header><a href="/"> Regresar</a></header>')
        res.write('<article class="markdown-body">')
        res.write(post)
        res.write('</article>')
        res.end('</body></html>');
      }
    });
  } else {
    res.json({
      month:m,
      year:year,
      status:'not_found'
    });
  }
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

