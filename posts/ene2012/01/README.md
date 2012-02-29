# Up and Running con node.js

Si, si. Tome prestado ese titulo. Este es él primer articulo de una serie, que pretendo escribir, acerca de como usar node.js en situaciones reales, construiremos tres aplicaciones que nos ayudaran a entender mejor node.js, empezaré con algo sencillo pero muy útil en nuestras aplicaciones.

Le llamo minifier, es una utilidad para minimizar tu código a través de un método muy eficaz llamado [`uglify`][1], y el módulo [`fs`][2], usaremos: readdir, readFileSync, openFileSync y otras más.

### Módulo de archivos del sistema [fs][2]

Todos los métodos de este módulo tienen las dos versiones *asincronas* y *sincronas* y simplemente se utiliza mediante:

    var fs = require('fs');

_nota_: las versiones asincronas de las funciones toman en su último parametro el `callback` completo, de igual forma en las sincronas es mejor utilizar un try/catch para captar execpciones en las llamadas. 

[Ejemplo 1] Por ejemplo para leer un archivo async podemos hacer esto:

    fs.readFile('/home/usr/ARCHIVO.log', function (err, data) {
      if (err) throw err;
      console.log(data);
    });

[Ejemplo 2] Mientras que en la versión sincrona quedaria algo así:

    try {
      var archivo = fs.readFileSync('/home/usr/ARCHIVO.log' , 'utf8');
      console.log(archivo);
    } catch (exc) { 
      throw exc; 
    }

En este caso hemos pasado una "bandera"(flag), que nos dice en que codificación leera el archivo, esto lo podemos hacer de igual forma que en el Ejemplo 1.

Otro de los métodos que estaremos utilizando sera `fs.stat()` el cual nos muestra información útil acerca del archivo, como `isDirectory()` o `isFile()`

    fs.stat(fd , function(error,st){
      if (st.isDirectory()) {
        console.log(fd + ' es un directorio');
      } else {
        console.log(fd + ' es un archivo');
      }
    });

Donde `fd` es la dirección del archivo o directorio.

### [Uglify-js ][1]

Si bien, [uglify][1] ya hace ciertas cosas que vamos hacer, esto sirve de mucha práctica y te permite entender como funciona realmente una de las partes escenciales de node.js como es `fs`, las partes de uglify que nos interesan son :

    var jsp = require("uglify-js").parser;
    var pro = require("uglify-js").uglify;

    var orig_code = "... JS code aqui";
    var ast = jsp.parse(orig_code); // parse code => AST
    ast = pro.ast_mangle(ast); // Obtener un nuevo AST con mangled names
    ast = pro.ast_squeeze(ast); // Obtener un AST optimizado y compreso
    var final_code = pro.gen_code(ast); // resultado

## Minifier

Abrimos el editor y llamemosle minifier.js, y en la parte inicial adjuntamos lo siguiente:

    var fs      = require('fs'),
        ugly    = require('uglify-js'),
        program = require('commander'),
        colors  = require('colors'),
        jsp     = ugly.parser,
        pro     = ugly.uglify,
        config  = JSON.parse(fs.readFileSync('./config.json','utf8')),
        old     = config.oldDir,
        newdir  = config.newDir,
        now     = Date.now(),
        j       = 0,
        kue     = 1;

Hemos incluido 4 módulos, `fs`, `uglify-js`, `commander` y `colors`, cada uno a excepción de fs se installan con npm, pero vamos a crear un `package.json` que hara el trabajo por nosotros:

    // nombre: package.json
    {
      "name":"minifier",
      "author":"Alejandro Morales",
      "version":"0.1.1", // es importante que siempre incluyas una versión
      "description":"Una utilidad de CLI para minificar tus js"
      "dependencies":{
        "uglify-js":"1.2.x",
        "colors":"0.6.x",
        "commander":"0.5.x"
      }
    }

Lo guardamos en el directorio raiz de nuestra carpeta (minifier) y hacemos `npm install -d` y ya tenemos instaladas localmente nuestras dependencias. Este archivo es de gran importancia en cualquier aplicación que desarrollemos, la documentación perfecta para escribir esto se encuentra [aquí][3], además es una guia a tomar en cuenta.

La variable `now` nos ayudara a determinar cuanto tiempo tardamos en realizar la operación, `j` es el contador y `kue` es la cantidad de archivos a leer.





[1]: https://github.com/mishoo/UglifyJS "npm install uglify-js"
[2]: http://nodejs.org/docs/latest/api/fs.html "fs documentación"
[3]: http://package.json.jit.su/  "si! Los chicos de nodejitsu"