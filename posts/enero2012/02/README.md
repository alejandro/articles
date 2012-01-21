# Getting good at Express
_High performance, high class web development for Node.js_

[Express][1] es sin duda el framework más conocido de node.js, es una extensión del poderoso [connect][2] y esta inspirado en **sinatra**, además es robusto, rápido, flexible, simple... 

Sin duda el exito de [express][1] radica en lo sencillo que es usarlo, y además abarca un sin número de aspectos que muchos desconocen pero son necesarios.

De entre las tantas cosas que tiene este framework podemos destacar:

  - Session Handler
  - 11 middleware poderosos asi como de terceros.
  - cookieParser, bodyParser...
  - [vhost](http://senchalabs.github.com/connect/middleware-vhost.html)
  - [router](http://senchalabs.github.com/connect/middleware-router.html), y contando...

Para comenzar, y suponiendo que tienes ya instalado [node][3] y [npm][4], lo único que es necesario hacer es lo siguiente:
    
    $ npm install -g express

A través de esta linea, estamos instalando globalmente [express][1], el cual expone una interfaz interactiva en la linea de comandos. Por ejemplo si escribimos `express -h` lo siguiente sera mostrado:
    
    Usage: express [options] [path]

    Options:
      -s, --sessions           add session support
      -t, --template <engine>  add template <engine> support (jade|ejs). default=jade
      -c, --css <engine>       add stylesheet <engine> support (stylus). default=plain css
      -v, --version            output framework version
      -h, --help               output help information

Una vez instalado [express][1] puedes utilizar `express NOMBRE-DEL-APP` lo cual te creara una estructura personalizada y los archivos necesarios para comenzar a trabajar con el mismo. Haz `cd NOMBRE-DEL-APP && npm install` para instalar automaticamente las dependencias, la estructura generada seria como la siguiente:

    NOMBRE-DEL-APP
    \
     |- package.json
     |- app.js
     |- public
        \ 
         |- javascripts
         |- stylesheets
         |- images
     |- routes
        \
         |- index.js
     |- views
        \
         |- layout.jade
         |- index.jade

Como podemos ver, la estructura que se genera es muy útil y sencilla, se ha creado un `package.json` el cual contiene toda las dependencias necesarias de la aplicación. Si quieres saber más como funciona `package.json` visita este [link][5].

## app.js
Una aplicación escrita con [express][1] posee ciertos rasgos y cosas que no se pueden obviar, en `app.js` existe una estructura interna bien definida y es como sigue:

    // app.js
    var express = require('express')
      , routes = require('./routes')

    var app = module.exports = express.createServer();

En esta primera parte se **requieren** los modúlos o archivos externos necesarios para ejecutar la aplicación, en este caso el mismo `express` y `routes` que es ni más ni menos un archivo donde se encuentran cada una de las rutas disponibles, `routes` es algo opcional, ya que tu mismo puedes ir generando las rutas a medida que vas avanzando. De igual forma, en esta parte se **crea** el servidor, mediante: `express.createServer()`, y es asignado a la variable `app` y de igual forma se "exporta" para que este disponible en caso de que sea necesario ejecutarla como secundario.

### Configuración
La segunda parte y una muy importante es la configuración:

    // Configuration

    app.configure(function(){
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(express.static(__dirname + '/public'));
    });

Es aqui donde se defines aspectos muy importantes para el funcionamiento correcto de nuestra aplicación, comumente conocido como `middleware`. Como podemos ver se define que el directorio donde se encuentran las `vistas` (templates) de nuestra aplicación, además se define en que lenguaje o motor esta escrito `app.set("view engine", "jade");` en este caso en ` jade`, además se define `bodyParser` y`methodOverride` mediante `app.use()` el **bodyParser** en palabras cortas, se encarga de decodificar la información que recibimos de un socket-cliente y lo expone en cada una de las `requests` mediante `request.body`. **methodOverride** proveee soporte par el metodo faux HTTP. Como podemos ver se hace uso tambien de el router de express, el cual nos proporciona la habilidad para estructurar nuestro código de una manera más sencilla mediante: `app.get('/path', function)`, y por último se define el middleware de archivos estáticos con la carpeta donde se encuentran los archivos que son "publicos".

En el código anterior se define una configuración **global** si tu quieres una configuración más especifica, asignale un nombre a tu ambiente mediante:

    app.configure('personalizada', function(){
      
    });

`personalizada` es una variable global que es pasada al momente de ejecutar tu programa mediante `NODE_ENV=personalizada` y es así como se origina la siguiente parte del código:

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });

    app.configure('production', function(){
      app.use(express.errorHandler()); 
    });

Es aqui donde se definen los ambientes más comunes, el de desarrollo (que es el default) y el de producción,
en este ejemplo, se hace uso del middleware `errorHandler`, el cual te muestra las *excepciones* que el express encuentra, al habilitar `showStack` tu aplicación al encontrar un error te muestra un mensaje vistoso en el navegador (lo cual solo es útil para vos, por lo tanto no es recomendable mostrarlo en producción).

En mi caso particular es aquí donde defino la base de datos a utilizar. Por ejemplo:
    
    // app.configure('development' ...
      ...
      app.set('db-uri','http://localhost:5984/DB')
      ...
    // app.configure('production' ...
      ...
      app.set('db-uri', 'http://USR.iriscouch.com/DB')
      ...

Y así cualquier configuración que tú creas conveniente realizar.

### Rutas

Las rutas son definitivamente la parte más importante de tu aplicación, porque si estas no están definidas, no existiria una interfaz para él cliente. En el ejemplo se genero esta dirección automaticamente, `routes` fueron definidas en la primer parte del archivo, y esta definido como sigue:

    app.get('/', routes.index);

Como podemos ver una ruta esta especificada de la siguiente forma:

    app.VERBO(PATH, ACCIÓN);

- `app` ya la conocemos.
- `VERBO` puede ser:
  - `GET`
  - `POST`
  - `PUT`
  - `DELETE` 
  - y así para cada uno de los verbos [HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
- `PATH`: define la dirección de acceso.
- `ACCION`: que es lo que se tiene que hacer.

Por ejemplo, algo sencillo:

    app.post('/user/new', function(request,respone){
      var body = request.body; // accede a la información enviada por el socket
      // Guarda la información, haz lo que tengas que hacer
    });

O algo más global:

    app.get('/blog/:id', function(req,res){ // accede a `/blog/id-largo` pero no a `/blog/id-largo/otro-di'
      var id = req.params.id; // accede al id que se ha requerido
    })

Definiendo el formato:

    app.get('/u/:id/mensajes.:format', function(req,res){
      var id = req.params.id;
      var format = req.params.format;
      if (format === 'json'){
        res.json({status:200, id:id});
      } else {
        res.json({status:500});
      }
    });

Otra forma seria:
    
    app.get('/u(*)',function(req,res){})  

En este caso concuerdara con todas las direcciones que empiezen con `u` :
  
    /u/alejandromg/
    /uasdlasdadklasd
    /u.json
    /u.json/potraosda

Este metodo tiene sus claras desventajas pero hay escenarios en el que es muy útil. Además de los verbos mencionados tambien se expone:
    
    app.all(*,function)

Por la cual pasan todas las request, es muy útil en el caso que quieras detectar si es de un movil, o cualquier cosa que tu quieras. Un aspecto intereante de las rutas es que si bien es cierto responden a una estructura definida, tu puedes definir ciertas acciones antes de dar una respuesta a el usuario que hizo la peticion, ¿a que me refiero?, bueno supongamos que hay cierta área que solo esta disponible para un usuario con cuenta, entonces tu podrias definir la función: `verificarCuenta` y luego continuar con la `request`, más especificamente de la siguiente manera:

    function verificarCuenta(req,res,next){
      if (req.session)
        next()
      else 
        res.redirect('/login')
    }
    // luego 
    app.get('/accesorestringido', verificarCuenta, function(req,res){
      // El usuario esta logueado
    });

Y de manera más global:
    
    app.VERB('PATH', ACCION1, ACCION2, ACCION-N, function(req,res){});

Como podemos ver, en este caso se define un parametro extra `next`, mediante "next", nos aseguramos que la aplicación siga su orden normal en el caso de que no alla ningún error. O hacer un `res.redirect()` para mandar al usuario a otra dirección.

### Listen

Por último es importante que tu aplicación este disponible en algún puerto (doh!), y es aqui:

    app.listen(3000);

Por default es el puerto **3000** que queda habilitado para la aplicación, a mi me gusta cambiar esto por algo como lo siguiente:

    app.listen(process.env.PORT || 3000);

`process.env.PORT` es utilizada por procesos globales de los proveedores de hosting, para especificar el puerto a utilizar por las aplicaciones. Por ejemplo en [cloud9](http://c9.io) tenes que especificar: `process.env.C9_PORT`. 

Básicamente esto es lo que te provee [express][1] al hacer `express NOMBRE-DEL-APP`, pero aparte de esto a mi me gusta especificar otras cosas más. Por ejemplo:

### Helpers

Los `dynamicHelpers` te ayudan a definir una puente entre el cliente y el servidor, para crear variables o funciones que esten disponibles en ambos lados (mediante jade o ?). Hay dos formas de habilitar este middleware, uno de ellos es:

Dentro de `app.configure()`:
    
    app.helpers(require('./path/to/helpers'));

En este caso `./path/to/helpers` podria ser como este [archivo][6]
O en cualquier otra parte de `app.js`

    app.dynamicHelpers({
      sitename: function(){
        return 'NOMBRE-DEL-APP'
      }
    });

Los `dynamicHelpers` es un objeto pero cada uno de sus miembros son siempre funciones, por eso es necesario el `return 'NOMBRE'`.

### Error Handler

[Express][1] provee tambien de un sistema de errores:

    app.error(function(err, req, res, next){
      if (err) {
        // Hacer algo con el error
      } else {
        next();
      }
    });

Funciona tambien mediante: `app.use(function(err,req,res,next){})` 


### Sessiones

Para habilitar las sessiones es necesario hacer lo siguiente:

    app.configure(function(){
      app.use(express.bodyParser())
      app.use(express.cookieParser('nhispano'))
      app.use(express.session({secret: 'SECRET', store: store }))
    });

Particularmente, he encontrado errores al utilizar este metodo por lo tanto yo hago lo siguiente:

    var app = module.exports.app = process.app =  express.createServer(
      //small hack for make sessions works just fine
      express.bodyParser(),
      express.cookieParser('nhispano'),
      express.session({secret: 'Node Hispano', store: store }),
    );

Luego de activar el middleware `session`, un nuevo objeto es creado en cada `request` y se puede acceder a él mediante: `req.session`.

Un modulo muy importante es `connect-redis` si usas redis, o `connect-couchdb` si usas couchDB, ambos disponibles mediante `npm install NombreDelPaquete`, los cuales te permiten manejar una cantidad mayor de sessiones al mismo tiempo.

### Respuesta

El método (?) response, tiene una gran cantidad de funciones y otros métodos disponibles. Por ejemplo:

- `res.sendfile('/path/to/archivo')` envia un archivo directamente al usuario, muy útil para enviar archivos html directamente.
- `res.json(DATA)`, envia como respuesta un documento en formato `json`.

#### `res.write()`

Escribe información al cliente que hizo la petición, se puede utilizar multiples veces en una misma petición:
    
    req.write('<h1>Hola</h1>');
    req.write('<h2>mundo</h2');

#### `res.send()`

Es un método primario y se puede utilizar múltiples veces tambien.

     res.send(); // 204
     res.send(new Buffer('wahoo'));
     res.send({ some: 'json' });
     res.send('<p>some html</p>');
     res.send('Sorry, cant find that', 404);
     res.send('text', { 'Content-Type': 'text/plain' }, 201);
     res.send(404);

- `res.writeHeader(CODE,Content-type)`, define el tipo de datos de la respuesta por ejemplo si usas `res.write()` con html como el ejemplo anterior, ocupas definir el tipo de contenido. `{"Content-type","text/html"}`
- `res.contentType(type)`, al igual que `res.writeHeader()` nada más que en este caso solo pasas él Content-type.
- `res.redirect()`, ¿es necesario decir algo?
#### `res.render`

Define y renderiza una `template` o `layout`, el uso más comun es el siguiente:

    res.render('TEMPLATE', {
      // variables locales de TEMPLATE
      layout: false, // por default busca dentro de views archivo llamado `layout.jade|ejs`,
      nombre: 'NOMBRE'
    })

- `res.end()`, necesaria al utilizar `res.write`, `res.send`. Termina la respuesta.

_disclaimer:_ Sinceramente no se me ocurrio otro titulo :P

[1]: http://expressjs.com "npm install express -g"
[2]: http://senchalabs.org/connect "npm install connect"
[3]: http://www.nodehispano.com/2011/11/como-instalar-node-js-en-mac-os-x-lion-nodejs/ "Instalando en MacOS"
[4]: http://www.nodehispano.com/2011/11/como-instalar-node-js-en-ubuntu-linux-nodejs/ "Instalando en  Ubuntu"
[5]: http://package.json.jit.su "Documentación del package.json"
[6]: https://gist.github.com/1654130 "Ejemplo de un dynamicHelpers "