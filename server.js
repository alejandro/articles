
var fs = require('fs')
  , path    = require('path')
  , ghm     = require('github-flavored-markdown')
  , express = require('express')
  , crypto  = require('crypto')
  , url     = require('url')
  , sys     = require('util')
  , app     = module.exports =  express.createServer()
  , groups  = []
  ;

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
};   

var months = function(){
  return fs.readdirSync(path.join(__dirname,'/posts'));
};
  
app.configure(function(){
  app.set('views',__dirname+ '/views');
  app.set('view engine','jade');
  app.use(app.router);
  app.use(express.static(__dirname+'/public'));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
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
  res.write(months().sort().map(function(month){
            var _data = '';
            var posts = fs.readdirSync(path.join(__dirname,'posts',month));
            
            _data += '<ul> <h3> '+ month +':</h3><li>'

            var s = posts.map(function(v){
              var ref = parseInt(month.substr(-4), 10)+'/'+month.substr(0,3)+'/'+v ;
              return '<a data-post="' + ref + '" class="post" href="/posts/'+ref+ '">'+ v +'</a>';
            }).join('</li><li>')

            _data += s;
            _data +='</li> </ul>'
            return _data;
          }).join('</li><li>'));
  res.write('</article>')
  res.write('<footer>Archive made by <a href="//alejandromorales.co.cc">Alejandro Morales</a></footer>')
  res.write('<script src="/javascripts/app.js"></script>');
  res.end('</body></html>');
});


app.get('/myip',function(req,res){
    var getIp = function (req) {
      return {
        ip: (req.headers["x-real-ip"]
          || req.headers["X-Forwarded-For"]
          || req.headers["x-forwarded-for"]
          || req.client.remoteAddress )
      };
    };
    console.log(getIp(req))
    res.end(JSON.stringify(getIp(req)))
});



app.get('/posts/:year/:month/:id.json', function(req,res){
  var year = req.params.year;
  var m = req.params.month;
  var id = req.params.id;
  var re = m + year;
  try {
    var pack = require(path.join(__dirname,'posts',re,id,'post.json'));
    pack.initiator = [year,m,id].join('/');
    res.json(pack)
  } catch (e){ 
    res.json({status:'not found'},404);
  }
});

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
        res.write('<p style="text-align:center"> Did you find a typo? Send a <a href="//github.com/alejandromg/articles/tree/master/posts/'+re+'/'+id+'"> Pull request</a></p>')
        res.write('<footer>Archive made by <a href="//alejandromorales.co.cc">Alejandro Morales</a></footer>')
        res.write('<script src="/javascripts/app.js"></script>');
  res.end('</body></html>');
        res.end();
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

app.get('/login', function(req, res){
  res.render(__dirname+'/posts/mar2012/01/index.html')
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

app.listen(process.env['app_port'] || 8080, function (){
  console.log('Server on port: %s \non: %s ',this.address().port,app.settings.env);  
});



