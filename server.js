
/*jshint laxcomma:true */

var fs = require('fs')
  , path    = require('path')
  , ghm     = require('github-flavored-markdown')
  , express = require('express')
  , app     = module.exports =  express.createServer()
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

var months = function (){
  return fs.readdirSync(path.join(__dirname,'/posts'));
};
  
app.configure(function (){
  app.set('views',__dirname+ '/views');
  app.set('view engine','jade');
  app.use(app.router);
  app.use(express.static(__dirname+'/public'));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
});

app.configure('development', function (){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.get('/', function(req, res){
  res.writeHeader(200,{'Content-type':'text/html'});
  res.write('<!doctype html>');
  res.write('<html>');
  res.write('<head><meta charset="utf8" /><title>Articulos</title>');
  res.write('<link href="/stylesheets/markdown.css" rel="stylesheet" /></head>');
  res.write('<body>');
  res.write('<article class="markdown-body">');
  res.write('<h1>Hola los articulos disponibles son:</h1><ul><li>');
  res.write(months().sort().map(function (month){
            if (path.extname(month) !== '') return
            var item = ''
              , posts = fs.readdirSync(path.join(__dirname, 'posts', month))
              , ref   = parseInt(month.substr(-4), 10) + '/' + month.substr(0,3) + '/';
            
            item += '<ul> <h3> ' + month + ':</h3><li>';

            item += posts.map(function(id){
              return '<a data-post="' + (ref + id) + '" class="post" href="/posts/' +
                      ref + '">' + id + '</a>';
            }).join('</li><li>');

            item +='</li> </ul>';

            return item;
          }).join('</li><li>') + '</li>');
  res.write('</article>');
  res.write('<footer>Archive made by <a href="//alejandromorales.co.cc">Alejandro Morales</a></footer>');
  res.write('<script src="/javascripts/app.js"></script>');
  res.end('</body></html>');
});


app.get('/myip',function (req,res){
    var getIp = function (req) {
      return {
        ip: (req.headers["x-real-ip"]
          || req.headers["X-Forwarded-For"]
          || req.headers["x-forwarded-for"]
          || req.client.remoteAddress )
      };
    };
    res.end(JSON.stringify(getIp(req)));
});



app.get('/posts/:year/:month/:id.json', function (req,res){
  var year = req.params.year;
  var m = req.params.month;
  var id = req.params.id;
  var re = m + year;
  try {
    var pack = require(path.join(__dirname, 'posts', re, id,'post.json'));
    pack.initiator = [year,m,id].join('/');
    pack.url = '/posts/'+ pack.initiator;
    res.json(pack);
  } catch (e){ 
    res.json({ status: 'not found'}, 404);
  }
});

app.get('/posts/:year/:month/:id', function (req,res){
  var year = req.params.year
    , m    = req.params.month
    , id   = req.params.id
    , re   = m + year;

  if (shortMonths[m] && months().indexOf(re) !== -1  ){ 
    // Read the post?
    fs.readFile(path.join(__dirname,'posts',re, id,'README.md'), 'utf8', function(e,d){
      if (e && e.code == 'ENOENT'){
        return res.end('404 NOT_FOUND');
      } else if (e){
        return res.end('500, INTERNAL SERVER ERROR');
      } else {
        var post ='<h1> Archivo mal formado</h1>';
        try {
          post = ghm.parse(d || '# POST NOT FOUND');
        } catch(e){}
        res.writeHeader(200, {'Content-type': 'text/html'});
        res.write('<!doctype html>');
        res.write('<html>');
        res.write('<head><meta charset="utf8" /><title>' + re + id +  '</title>');
        res.write('<link href="/stylesheets/markdown.css" rel="stylesheet" /></head>');
        res.write('<body>');
        res.write('<header><a href="/"> Regresar</a></header>');
        res.write('<article class="markdown-body">');
        res.write(post);
        res.write('</article>');
        res.write('<p style="text-align:center"> Did you find a typo? Send a ' + 
                  '<a href="//github.com/alejandromg/articles/tree/master/posts/' +
                   re + '/' + id + '">Pull request</a></p>');
        res.write('<footer>Archive made by <a href="//alejandromorales.co.cc">Alejandro Morales</a></footer>');
        res.write('<script src="/javascripts/app.js"></script>');
        res.end('</body></html>');
        res.end();
      }
    });
  } else {
    res.json({
      month: m,
      year: year,
      status:'not_found'
    }, 404);
  }
});

app.get('/login', function (req, res){
  res.render(__dirname + '/posts/mar2012/01/index.html');
});

app.listen(process.env.app_port || 8080, function (){
  console.log('Server on port: %s \non: %s ', this.address().port, app.settings.env);  
});



