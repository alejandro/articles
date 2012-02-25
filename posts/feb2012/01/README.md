# Creando módulos con node.js

_disclaimer_: Este articulo posee muchas opiniones personales, así que _pardon me_ de antemano.

Sin duda cuando una nueva tecnología como [node.js](http://nodejs.org) es mostrada al mundo, como desarrollador te preguntas: "¿Y hace esto, hace aquello?, ¿Es lo suficientemente rápido?. Mmm no, no lo hace, pero si hago esto y lo otro puedo una crear una extensión". Ya ha pasado, paso(a) con jQuery, Wordpress, etc., que mejor ejemplo que el decirte que hay un plugin jQuery/Wordpress para lo que tu quieras. Solo piensa un momento y veras que es cierto.

Bueno, pues a mi me gusta pensar que así surgió [NPM](http://npmjs.org) (Node Package Manager), como una herramienta para unir los esfuerzos individuales de los miembros de la comunidad, y hacer de la misma, la comunidad más interesante y activa que personalmente yo conozco. Claro, agregado a otros factores que ayudaron y han ayudado a hacer más atractivo el trabajar con node.js. 

A inicios de esta semana, estaba buscando un **xml parser** (no pregunten para que), y me costo un poco encontrar uno que estuviera suficientemente documentado y que realizara lo que yo necesitaba, pero me di cuenta de cuan difícil era decirme por alguno, además soy de los que trata de entender el código que hace funcionar X módulo, voy a github regreso a search.npmjs.org y así voy y vengo, bueno larga historia pero es así como surgio [NPM Docs](http://npmdoc.jit.su).

Pero este articulo no se trata de lo que hice, si no de lo que me encontré con el registro de NPM y como mejorar esta situación. NPM cuenta con cerca de 7350 módulos y en constante crecimiento, la mayoría con una organización y estructura totalmente diferente, desde el `package.json` hasta el esqueleto del folder contenedor. No lo llamaría un desorden pero si no una forma no muy agradable de los mismos. Así que luego de esta larga introducción dejeme introducir **Como crear módulos para node.js**

## La estructura
Ya hace días, cree una módulo exactamente para esto: [Kronos](http://npmdoc.jit.su/package/kronos), para crear la estructura esperada de un modulo, Kronos lo puedes installar con `npm install -g kronos`. Una estructura modelo seria como sigue:

    Nombre del módulo
     \
      |- lib/
          \
           |- PROJECTNAME.js
      |- bin/
          \
           |- BINFILE
      |- examples/
      |- test/
      |- index.js
      |- package.json
      |- README.md

Esta es una estructura que define el diseño promedio de los módulos escritos en|para node.js.

Como puedes ver esta compuesto de cuatro carpetas, dentro de **lib** se encuentra 
el *.js principal, no en el directorio raiz, sino que esta dentro de lib, aqui van tambien cada uno los *.js que hacen funcionar tu módulo. Si tu estas escribiendo un app para la CLI pones dentro de _bin_ tu ejecutable. Y las otras carpetas son obvias: test y ejemplos. 

### package.json
Algo muy interesante es el `package.json`, NPM lo ha convertido en archivo imprescindible en el desarrollo de las aplicación pues es a través de él que tu se instalan las dependencias de tú aplicación. Sin duda una lectura recomendada es este [cheatsheet](http://package.json.nodejitsu.com), quien explica como debe estar escrito este documento. Pero siguiente con nuestro ejemplo, el package.json de kronos es el [siguiente](https://github.com/alejandromg/kronos/blob/master/package.json):

    {
      "name":"kronos",
      "version":"0.0.2",
      "description":"A dead simple scheme maker to initialize and setup your new project",
      "author":"Alejandro Morales",
      "preferGlobal": "true", // Instalar global
      "dependencies":{
        "commander":"0.5.x",
        "mkdirp":"0.2.x"
      },
      "bin": {
        "kronos": "./bin/kronos"
      },
     "main": "./lib/kronos",
    ...
   }

Aqui estan especificados todas la información necesaria que NPM toma al momento de publicarla e instalarla.

###README.md
La parte pública, la más importante de lo que haces, puede que no seas un gran escritor o que detestes escribir documentación, pero es de alta relevancia que lo hagas. Créeme. 

Documentos: 

- [How to write a Readme](http://blog.nodejitsu.com/how-to-write-a-readme)
- [Outline:: How to readme](https://gist.github.com/1363524)

## Del Módulo
### `module.exports`

Un módulo, no necesariamente necesita ser del dominio público, puede que lo que tu quieras es organizar tu código en varios archivos, y ocupas hacer un "require" debes en cuando, o tu módulo cumple una utilidad muy especifica en la aplicación. Es ahí donde las buenas practicas entran en acción. El uso de module.exports y el scope en el que ejecutas tu extensión|módulo.

> [CommonJS](http://commonjs.org/), es un esfuerzo por parte de la comunidad para estandarizar el empaquetamiento de librerías en javascript, comúnmente conocidas como módulos. Los módulos son escritos en cumplimiento de este estandar, proveyendo gran portabilidad a otros frameworks como narwhal o inclusive los navegadores.

> TJ Holowaychuk - [Mastering Node](http://visionmedia.github.com/masteringnode/book.html)

Y es así, como module.xxxxx surge. Un ejemplo muy sencillo, (escrito a propósito para este articulo),  es un módulo con operaciones básicas de un array númerica: max, min y unique.

`module.exports` es el punto de referencia que es llamado cuando tu haces `var http = require('http')`, en este caso, node.js busca al objeto `exports` o `module.exports` exponiendo todos los métodos y funciones contenidas en ella. 

Los siguientes ejemplos son validos:

    module.exports.PI = Math.PI;
    module.exports.SQRT2 = Math.SQRT2;

También:

    var miFuncion = function(){
     ....
    }
    module.exports = miFuncion;

Ahora miremos las diferentes formas de escribir módulos. La primer forma que vamos a ver es la que sigue:
Simple y sin muchas complicaciones, `variable = module.exports = valor|función`

    // utilidades.js
    var max = module.exports.max = function(array){
      var a = array.sort();
      return a[a.length-1];
    }
    var min = module.exports.min = function(array){
      var a = array.sort();
      return a[0];
    }
    var unique = module.exports.unique = function(array){
      return array.filter(function(v, i, a) { 
                     return a.lastIndexOf(v) === i; })
                 .sort();
    }
    
Este es el método más común y mas rápido. Como te has de haber dado cuenta este código correría tanto en el server como en el browser, claro realizando algunos cambios y haciéndola un poco más atractiva:

    (function(ut){
      ut.max = function(array){
        var a = array.sort();
        return a[a.length-1];
      };
      ut.min = function(array){
        var a = array.sort();
        return a[0];
      };
      ut.unique = function(array){
        return array.filter(function(v, i, a) { 
                      return a.lastIndexOf(v) === i; })
                    .sort();
      }
      return ut;
    })(typeof exports === "undefined" ? utilidades = {} : exports);

Este método utiliza algo llamado [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) y particularmente es la que más me gusta. Y todavía hay 2 formas más, pero voy explicar la más sencilla:

    var ut = function(array){
      this.array = array;
      return this;
    }
    ut.prototype.max = function(){  
      var a = this.array.sort();
      return a[a.length-1];
    };
    ut.prototype.min = function(){  
      var a = this.array.sort();
      return a[0];
    };
    ut.prototype.unique = function(){  
      return this.array.filter(function(v, i, a) { 
                          return a.lastIndexOf(v) === i; })
                        .sort();
    };

    module.exports = exports = ut;

Y las 3 tendrán las mismas utilidades. Las primeras dos se pueden utilizar como sigue:
   
    // superapp.js
    var u = require('./utilidades'); // asumiendo que esta en el mismo dir
    var test = [0,3,4,5,4,3,4,2];
    
    console.log(u.max(test)); // => 5
    console.log(u.min(test)); // => 0
    console.log(u.unique(test)); // => [0,2,3,4,5]

Y para la tercera:
   
    // superapp.js
    var u = require('./utilidades'); 
    var test = new u([0,3,4,5,4,3,4,2]);

    console.log(test.min()) //=> 0
    console.log(test.max()) //=> 5
    console.log(test.unique()); // => [0,2,3,4,5]

Como puedes, ver la tercera utiliza un método más interesante y definitivamente más útil, ya que te ocupa unos cuantos caracteres menos y es más entendible.

En todos los ejemplos, utilice un forma distinta de exportar el código externo, mediante `module.exports`, cada uno en un contexto diferente. Cada uno tiene sus ventajas y desventajas, pero si hay algo que tienes que tener cuidado es en el de respetar tu `namespace` para evitar conflictos y bugs indeseables. Elije nombres y descriptores aceptables y únicos. Con aceptables me refiero, a nombres que no vayan a entrar en conflicto, o que son keywords de javascript.

### En conclusión

Si escribes módulos para el dominio público, ten en cuenta, la documentación (README) correcta de la misma, un **package.json** bien escrito, y un código limpio. Recuerda: **Don't Repeat Yourself**.


###Links Recomendados:

- [How to Module](http://howtonode.org/how-to-module) por Isaac Z. Schlueter (el actuar **"gatekeeper"** de node.js)
- [Add AMD /define() to node.js ](https://gist.github.com/650000)
- [Building node.js modules](http://nodetuts.com/tutorials/17-building-nodejs-modules.html)
- [Essential node.js patterns and snippets](http://blog.mixu.net/2011/02/02/essential-node-js-patterns-and-snippets/) ***Recomendado**
- [6 must have node.js modules](http://blog.nodejitsu.com/6-must-have-nodejs-modules)
- [How to write a Readme](http://blog.nodejitsu.com/how-to-write-a-readme)
- [Outline:: How to readme](https://gist.github.com/1363524)
-  [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) 
- [NPM Docs](http://npmdoc.jit.su)

### [Código en este articulo](https://gist.github.com/1906467)