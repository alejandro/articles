## Aplicaciones con Node
______________

Ese titulo pudo haber llevado un "web", pero la verdad es que node.js se extiende a mucho más que eso y no se puede quedar tan corto. Desde aplicaciones web, *cli tools* y hasta Robots. Si, **¡ROBOTS!**. Por si se les ha olvidado, **Node es JavaScript.** 

A continuación listare una serie de aspectos que tú tienes que tomar en cuenta al momento de realizar una aplicación con Node. Aspectos que son únicas de la plataforma y que te ayudaran a incrementar tu productividad o al menos te ayudaran a un mejor *flow* de trabajo.


### npm es tu amigo

Ya he escrito un [artículo][1] acerca de ello, así que no entrare muchos en detalles. Pero si hay aspectos que quisiera remarcar, por si no tienes ganas de leer el otro artículo.


- `npm init`: Este comando te facilita la creación de nuevos `package.json`, lo cual lo hace muy útil cuando empiezas nuevos proyectos. Si te gusta ser *pro*, te recomiendo [`grunt`](http://new.npmjs.org/package/grunt "npm install -g grunt"), ó [`Kronos`](http://new.npmjs.org/package/kronos "npm install -g kronos") (escrito por su servidor). En [nodester](http://nodester.com) el 80% de los problemas que el usuario tiene, es debido a un `package.json` mal formado. Recuerda es un archivo en formato `json` nada más. (`npm init`) te a 
- `npm install NombreDelPaquete -s`: Sin duda, uno de mis comandos favoritos. A poco y no te toca correr este comando más de una vez cuando estas programando. Pues al agregarle el parametro `-S` ó `--save`, tú `package.json` se actualiza automáticamente con la dependencia que acabas de instalar.

Y aún hay [más][1], `npm` es sin duda una herramienta que tú necesitas manejar a la perfección.

### Maneja tus errores

En Node, es importante manejar siempre los errores. La comunidad a optado por un "estándar" el cual  es como sigue:

	fn([arg1 [, ... argN],], function ( error, respuesta [, ..]){
    	if (error) {
          /* ups un error */
        }
    });

Preparate siempre ante los errores potenciales. Node al encontrar un error de ejecución emite `uncaughtException` así que escucha al evento:

	process.on('uncaughtException', function (error)  {
      /* la apliación no puede continuar, va a morir */
      /* reinicia tu proceso, con upstart, forever, ...*/
      process.kill(1);
    });


Hay errores que no se pueden "atrapar" con un `try/catch`, por que este solo funciona en el `tick` en el que es ejecutado, pero muchas de las librerias incluidas en Node (todas) se ejecutan en el `nextTick` por lo tanto no se va a ejecutar. Por ejemplo:

	var client = net.connect( "/tmp/echo.sock" );
    client.on('data', function (data){ /* se recibio algo */});
    
    client.on('error', function (error){ /* ouch, un error */ })
    
    client.write('hi');
    client.end()

[Lee más](http://bjb.io/development/2012/03/09/thinking-async-errors.html) acerca de esto. Con la inclusión de [`domain`][2] el panorama mejora

### Organiza tu código

> Write smaller programs. Cut unnecessary features. Most software latency and bugs come from code, so use less of that. - [Isaac](http://blog.izs.me/page/2)




[1]: http://www.nodehispano.com/2012/04/una-introduccion-a-npm-nodejs/
[2]: http://nodejs.org/api/domain




