# Una introducción a npm

<div style="text-align:center">
<img src="http://npmjs.org/npm.png" width=200 align="center">
</div>

Sin duda muchos de los artículos referentes a node.js, tanto en español como en inglés, van directamente relacionados a como crear aplicaciones, como mejorar tu ritmo de trabajo, o cuan concurrente y rápido node.js es.

Pero muy pocos se detienen a explicar o indagar un poco más acerca de una de las herramientas más importantes dentro del "workflow" de node.js: **npm**;

> Contrariamente a las creencias de muchos, "npm" no es una abreviación para "Node Package Manager". - [npm FAQ][0]

¿No me crees? Mira lo que dice [wikipedia](http://en.wikipedia.org/wiki/Node_Package_Manager). Siendo serios, y según Isaac Schlueter:

> El proyecto "npm" es nombrado luego de la utilidad de la linea de comandos, la cual fue _organicamente_ selecionada para ser fácilmente escrita por un programador de mano derecha usando un teclado US QWERTY, terminando con el dedo del anillo derecho en una posición para escribir `-` seguido de parámetros o "flags". Esta utilidad de linea de comandos siempre es en minúsculas... - [npm  FAQ][0]

A pesar de la complicada e interesante descripción del origen de "npm", definitivamente _npm_ es el director de la orquesta cuando se refiere a el manejo de dependencias o módulos en node.js, sus uso más comunenes son para: 

- Publicar
- Descubrir
- Instalar y
- Desarrollar programas en node 

Es la herramienta perfecta y necesaria en cuando a manejo de dependencias se refiere.

### Instalación
Desde la versión 0.6.3 npm se instala automáticamente al momento del proceso de instalación de node.js, así que no tienes que instalarlo aparte. Si todavía estas en una versión menor a esta, considera en actualizar o trabaja con un administrador de versiones como [`n`](http://github.com/visionmedia/n) ó [`nvm`](https://github.com/isaacs/nvm), los cuales te permiten tener instaladas múltiples versiones de node en tu maquina de desarrollo, muy útil si trabajas en diferentes proyectos o modulos.

### Aspectos que te ayudaran a entender mejor npm

A continuación en listaré una serie de comandos que son muy útiles y que posiblemente tu desconozcas:

Para acceder a cada uno de ellos simplemente haz en tu linea de comandos:`npm <comando>`.

#### `npm init`: 
Sin duda mi favorita, como has de haber pensado, esta utilidad te permite crear, modificar y generar un `package.json` válido. Su uso es estrictamente para agregar y no borrar elementos en tu archivo. Su funcionamiento es através de una serie de preguntas. Simple de usar. ¿Necesitas de una aplicación más especializada? [Grunt.js](https://github.com/cowboy/grunt) es tu amigo

#### `npm search <nombre-del-modulo|palabra-clave>`: 

Te permite buscar en el registro de npm, algun modulo acerca de la palabra clave que tu seleccionaste. Si bien npm tiene muchas cosas que lo podrían hacer perfecto, este aspecto es un poco "delicado" y "complicado". Hay ciertos sitios web que hacen un poco mejor el trabajo de [search.npmjs.org](http://search.npmjs.org) o te ofrecen una serie de herramientas y recursos, para hacer de esto un proceso menos doloroso, tales herramientas son:

  - [Node Package browser](http://startic.kr/njs/) : muy útil para buscar readme's de modulos, además tiene la opción de crear stacks y mucho más.
  - [Nipster](http://eirikb.github.com/nipster/#): npm + github = El ranking perfecto. Esta herramienta te ayuda escoger el mejor modulo a usar basándose en la popularidad del modulo en github.
  - [Toolbox](http://toolbox.no.de/): Busqueda avanzada de módulos.

#### `npm info <nombre-del-modulo>`
Muestra información en formato `json` acerca de `<nombre-del-modulo>`, útil cuando quieres saber versión actual y demás detalles acerca de un módulo:
    
    > npm info express
    > npm info kronos
    > npm info <package-name>


#### `npm ls`, `npm la`, `npm ll`, `npm list`

Lista los paquetes que tienes actualmente instalados en un determinado directorio. En formato de `tree`:

    bolt@0.1.2 /home/alejandromg/dev/bolt
    └─┬ bolt@0.3.2 
      ├── colors@0.6.0-1 
      ├── eventemitter2@0.4.8 
      └── redis@0.7.1 


#### `npm outdated`

Su nombre es más que explicativo, busca si hay versiones más nuevas acerca de los modulos instalados en el directorio actual.

Genera algo como:

    node-watcher@0.0.3 ./node_modules/node-watcher current=0.0.2
    request@2.9.202 ./node_modules/request current=2.9.153
    nano@2.1.0 ./node_modules/nano current=1.3.0

Por lo tanto un `npm update` o  `npm up` es necesario, pero antes asegúrate que tu actualización no vaya a crear errores por [nueva API o nuevos métodos](http://semver.org).

#### `npm link`:

Sin duda una de las herramientas más útiles y más controversiales. Por diseño, npm no va instalar una sola versión de un módulo "x" en tu computador, en cambio va a instalarlo y hacerlo disponible solo en el directorio en el que ejecutaste: `npm install mi-modulo`.

Por ejemplo: **express**.

Para instalarlo haces: `npm install -g express`, con esto tienes la utilidad de linea de comandos para poder luego hacer:

`express misuperapp`

Lo cual te va a generar algo como:

    create : misuperapp
    ...blah blah

    dont forget to install dependencies:
    $ cd misuperapp && npm install

Luego de hacer `cd misuperapp`, necesitas instalar las dependencias, pero que sucede si no tienes acceso a internet en ese momento o no quieres volver a descargar express, en este caso puedes hacer `npm link express`, para crear un link simbólico a la versión global de express:

    $ cd misuperapp && npm link express
    ./node_modules/express -> /usr/local/lib/node_modules/express

Con esto ya tienes la habilidad de usar la versión global de express sin necesidad de descargarla de nuevo. 

**Importante**: Como dije anteriormente, por diseño, cuando haces `npm install` npm instala una copia local en `misuperapp`, lo cual es lo mejor, ya que te ayuda a mantener un control mejor de dependencias y debugabilidad. Además un par de KB en tu disco duro no hacen mal. Por lo tanto, aunque sea útil, no es una práctica recomendada.

¿Pero, y entonces para que la mencionas? Pues aparte de la utilidad mencionada anteriormente, hay una aun más importante, pero un poco más complicada de explicar y especifica para aquellos que escriben módulos, ya que atraves de `npm link` puedes crear una referencia global al módulo que escribes y hacer pruebas con tus dependencias. Esto esta mucho mejor explicado mejor en [npm tricks](http://www.devthought.com/2012/02/17/npm-tricks/).

Para terminar con `npm link`, como bien diría Isaacs en #node.js :

> "En producción, tu VM puede estar limitada a un servicio, o espacio en disco, en este caso, `npm link` no es tan malo. Pero por el amor a la debugabilidad y alta disponibilidad, no lo hagas en otros escenarios, por que symlinks son dolorosos en producción..." - [Referencia](http://irclogger.com/.Node.js/2012-04-15#1334525048)

El contrario a `npm link` es `npm unlink`.

#### `npm shirnkwrap`

A diferencia de `npm link`, shrinkwrap es una herramienta con más utilidad para aquellos que desarrollan módulos, en pocas palabras shirnkwrap "bloquea" las versiones que utilizas en determinada aplicación, de esta manera te aseguras que las versiones que van a ser posteriormente instaladas en la cadena de distribución sean las mismas que utilizaste en el desarrollo de tu módulo o aplicación. Este comando generara un nuevo archivo donde estara el `árbol` o esquema con las versiones que deben ser instaladas al momento de instalar tu módulo. [Más información](http://npmjs.org/doc/shrinkwrap.html)
 

Y muchos más:

- `npm home <modulo>`: Muestra el sitio web del módulo, si existe.
- `npm prune`, `npm rm`: `prune` elimina paquetes que no se encuentran en el package.json pero si en el folder `node_modules`, a diferencia de `rm` que elimina el modulo que pasas como parámetro e.g: `npm rm express`
- `npm help folders`: Explica como funciona la instalación de módulos, muy interesante.
- `npm view <módulo> <detalle>`, `npm show`: Muestra información especifica acerca de <módulo>, por ejemplo: `npm view nhouston author` va a mostrar "Alejandro Morales &lt;mi_correo@electronico.com&gt;", detalle puede ser cualquiera de los campos del `package.json`
- `npm config list`: muestra la configuración que esta siendo utilizada por npm.
- `npm help`: muestra toda la ayuda referente a npm.
- `npm faq`: Preguntas Frecuentes
- ...



## En conclusión

**npm** es perfecto, si, es una conclusión ;). Claro existen "ciertos" y pocos problemas, pero para un usuario _"regular"_ no deberían ser un problema. Son cosas *low-level*. Y que a la mayoría de nosotros no nos va tocar enfrentar.

Por cierto, he tomado _oficialmente_ responsabilidad en la traducción de la documentación de npm al español, así que si quieres ayudar [clona mi fork](http://github.com/alejandromg/npm "Fork") y mandame tus cambios por github, de esa manera podemos generar más información en español.

#### No te gusta npm

¿En serio no te gusta? npm es la navaja suiza en cuanto a "package-managers" del mundo de la programación, no solo eso te brinda un sin número de beneficios además el gran soporte por parte de la comunidad en general, lo hacen el más seguro y confiable. ¿No te convencí? Bueno, existen otros package-managers para node.js como:

- [Ender](http://ender.no.de/): La hermana pequeña de npm, especializado para manejar paquetes para el navegador.
- [npkg](https://github.com/wearefractal/npkg): genera instaladores multiplataforma de aplicaciones escritas con node.js. Se mira interesante.
- [nmod](https://github.com/jeromeetienne/nmod): nmod es un administrador de node_modules.
- [Slugr](https://github.com/crcn/slugr) Crea programas autoejecutables escritos en node. 
- [y la lista continua](https://github.com/joyent/node/wiki/modules#wiki-package-management "Wiki Package-management")

Particularmente no he usado ninguno así que yo te sigo recomendando npm.

### Links Recomendados

- **[Intro to npm](http://foohack.com/2010/08/intro-to-npm/)** por Isaac Schlueter (creador de npm) 
- **[npm tricks](http://www.devthought.com/2012/02/17/npm-tricks/)** por Guillermo Rauch
- **[npm an Intervention](http://debuggable.com/posts/npm-an-intervention:4f44dd25-a114-4361-ada1-6cefcbdd56cb)** por Felix Geisendörfer
- **[npm FAQ][0]** (además puedes teclear en tu linea de comandos `npm faq`)
[0]: http://npmjs.org/doc/faq.html#If-npm-is-an-acronym-why-is-it-never-capitalized "$ npm faq"
- **[npm shrinkwrap](http://blog.nodejs.org/2012/02/27/managing-node-js-dependencies-with-shrinkwrap/)**: manejando dependencias como un profesional.

¿Encontraste algún error? Manda tus cambios via [Pull Request](http://github.com/alejandromg/articles/tree/master/posts/abr2012/02) ;)