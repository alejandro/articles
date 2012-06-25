# Node v-0.8.0

Hoy fue publicada la primera versión estable de la familia `0.8.x` y sencillamente no podría ser mejor.

Si no has leido el blog post acerca de todo lo nuevo [léelo aquí](blog.nodejs.org/2012/06/25/node-v0-8-0/).

## ¿Versiones?
¿Porque tanta bulla con esta versión? Te has de preguntar. Node utiliza un [versionamiento semántico](http://semver.org) muy útil y fácil. En cortas palabras las versiones menores pares, osea 0.4.x,0.6.x,0.8.x son las listas para producción y uso público. En cambio las impares (0.7.x) son simplemente para ir implementando las cosas nuevas que se vienen en el software. En este caso node.js. Así que esta versión trae muchas cosas listas para que tu las uses directamente en producción.


## Lo nuevo

En NodeHispano estamos tratando de que tú como usuario y desarrollador te involucres más en la comunidad de node.js. Es así que en adición a lo públicado por el equipo encargado de desarrollo de node dejame presentarte una breve reseña de lo nuevo que se viene en esta públicación:

### Node.js se ha vuelto más rápido y estable

Si más rápido. Con el `refactor` de muchas de las partes del core se ha logrado estabilidad y lo ha convertido aún más rápido. Lee más acerca de los [benchmarks](http://blog.nodejs.org/2012/06/25/node-v0-8-0/) y pues si han mejorado considerablemente los números con respecto a la primera de las versiones de [0.6.x](http://blog.nodejs.org/2011/11/05/node-v0-6-0/).

### Mejorado el módulo cluster

¿Tienes más de un core en tu server? Aprovéchalo. Esta versión de `cluster` se ha reescrito y ahora es más rápido y estable. Nada que envidiarle a otras alternativas similares. Cluster es el módulo encargado de aprovechar y balancear la carga de tus procesos a través de tus cpus, tan simple como:

    var cluster = require('cluster');
    var http = require('http');
    var numCPUs = require('os').cpus().length;
   
    if  (cluster.isMaster) {
      // Copiar los  "workers".
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.pid + ' died');
      });
    } else {
    // Los "workers" pueden utilizar la misma conexión TCP por eso el puerto no cambia
    // En este caso el worker es un servidor http.
     http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
     }).listen(8000);
   }

Esto brinda más estabilidad a tu servidor y además sirve como un mecanismo de respaldo para procesos que mueren. 

### Domains

Te has precoupado o puesto a pensar como manejar errores sin un `try/catch` o si tu servidor o proceso se vuelven inútiles luego de una `UncaughtException`. [Domains](http://nodejs.org/api/domain.html) provee una alternativa para manejar de una manera más eficaz esos errores. No es la única opción que tienes, pero tu puedes sacarle provecho para poder así obtener uptimes cercanos a un 100%.  Y como dice la documentación: "Úsalo y dinos que piensas":

	var d = domain.create();

	function readSomeFile(filename, cb) {
	  fs.readFile(filename, d.intercept(function(data) {
	    // en este caso ya no hay una variable "error" dentro del callback
	    // porque domains se encarga de manejarlo
	    return cb(null, JSON.parse(data));
	  }));
	}

	d.on('error', function(er) {
	  // El error seria interceptado en este callback evitando una
	  // posible uncaughtException
	});


### Repl, Readline y TTY
La interfaz de la linea de comandos  (repl) es más útil ahora.
Basta con que escribas el nombre del módulo y ya esta incluido. Ver el screencast.

### Built-in SSL NPN support

Sin duda mi favorita. Ahora ya es posible crear servidores [SPDY](http://www.chromium.org/spdy) (si, otra tecnología más de google). El cual reduce latencia en los servidores y los hace super rápidos. Twitter, Google y otros más ya lo estan utilizando, y ahora TU tambien lo puedes hacer con [node-spdy](https://github.com/indutny/node-spdy) y [node-spdyproxy](https://www.github.com/igrigorik/node-spdyproxy/). A nuestro favor es que los servidores SPDY tienen la misma API que HTTP, lo cual lo hace muy sencillo de trabajar y hacer cosas con él:

	var spdy = require('spdy'),
	    fs = require('fs');

	var options = {
	  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
	  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
	  ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem')
	};

	var server = spdy.createServer(options, function(req, res) {
	  res.writeHead(200);
	  res.end('hello world!');
	});

	server.listen(443);

Te invito a que [leas más de este protocolo](http://www.chromium.org/spdy) ya que pronto estarás escuchando mucho más de él.

### Otros

Hay otras cosas pequeñas que se han agregado en el transcurso de las versiones 0.7.x y 0.6.x, entre ellas:

- [`os.networkInterfaces()`](http://nodejs.org/api/os.html#os_os_networkinterfaces) // su nombre es bien descriptivo ;)
- `process._getActiveHandles()` y `process._getActiveRequests()` muy útil para hacer debug de leaks en el loop de eventos.
- [`process.hrtime()`](http://nodejs.org/api/process.html#process_process_hrtime) te ayuda a crear benchmarks más precisos usando nanosegundos.

### Sistema de compilación

Node ha dejado a un lado el uso de [waf](http://code.google.com/p/waf/) como sistema de compilación. Usa ahora [gyp](https://github.com/TooTallNate/node-gyp) el cual es más rápido y al parecer más sencillo de utilizar para crear buil-scripts. Así que si eres creador de módulos que necesitan compilarse corre a actualizar tus scripts.


### Api
Por último lee los cambios en el [API](https://github.com/joyent/node/wiki/API-changes-between-v0.6-and-v0.8) en especial el de `fs.existsSync`


### El video
<iframe frameborder="0" allowfullscreen width="660" height="400" src="http://play.codestre.am/embed/c901c506f27d8bb7b72c7215f"></iframe>
 

Así que, ¿Que esperas para instalar la nueva versión? 


/be

