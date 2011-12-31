# ¿Y ahora?

_Bueno, ya tengo instalado [node.js][1] (aka Node, Node.js, NodeJS) en mi computador, ¿Y ahora?._

Esta es una pregunta que se han de hacer muchos, [node.js][1] se ha vuelto todo un tema en los últimos meses, años (?). Solo es de ver cuanto se habla en las [redes][4]  [sociales][5],  o los [trends][3] en Google y sumado al hecho de que [microsoft][7] [unió][6] [fuerzas][8] con [joyent][9] (la empresa encargada del desarrollo de node). Sin embargo, [node.js][1] es más que una simple moda, es el futuro de las aplicaciones web (si, al fin lo dije), javascript es el lenguaje, por excelencia, en cuanto a desarrollo front-end y ahora que lo tenemos del lado del servidor es más que una bendición, ya que debido a la flexibilidad y fácil uso de este lenguaje ha traído enormes beneficios a lo que es el desarrollo de aplicaciones web. 

## Entorno de Trabajo

En [previos][10]  [articulos][11] [hemos](https://gist.github.com/1379584 "Gist") visto como instalar node en las distintas plataformas (para windows existe un [*.msi][12]), así que si no lo has instalado te invitamos para que le des un vistazo. 

Una vez que tienes instalado node.js en tu sistema lo siguiente es establecer un entorno de trabajo. Si bien es cierto para poder empezar a trabajar con Node lo único que ocupas es un editor de texto y la linea de comandos, es bastante útil tener un entorno de trabajo que te ayuden a trabajar de una manera más fluida. Si estas trabajando en MacOS, texmate es editor de preferencia, pero tambien esta [sublime text][6] que es una opción multiplataforma, además existen otras opciones, al final es cuestión de gustos (yo uso una mezcla de vim y sublime text).


## Creando web aplicaciones con Node

Al momento de crear aplicaciones web, estás ante muchas decisiones: crear un tipo de aplicación REST API o no, Aplicaciones de una sola página (Single Page App), persistencia de datos o no, escalable o no, y asi.

Las ventajas de escribir apps de una sola página es la experiencia de usuario (menos páginas recargadas, etc.), tambien ofrece un soporte nativo fácil para móviles, sacando provecho de la API generada inicialmente (esto quiere decir que no ocupas crear una nueva estructura para ofrecer una versión móvil del sitio). Ya que es muy fácil crear un aplicación basada en servicios API que una con _n_ cantidad de rutas distintas y _n_ request a tu servidor. Además de ser eficientes implican un huella en el servidor bastante baja, ayudando por ende a la escalabilidad de la misma. Uno de los grandes problemas es SEO, ya que como son app de una sola página es más díficil localizar contenido (hashbangs y todo el tema) (aunque ya hay [soluciones](https://github.com/balupton/History.js/ , "history.js y HTML5") ).  Asi que podriamos decir que tenemos ventajas y desventajas para poder irnos por este estilo de aplicación.

En la imagen a continuación podemos observar un diagrama que nos ayuda a identificar los puntos criticos a tomar en cuenta al momento de crear nuestras aplicaciones. Este esquema es muy útil ya que este modelo estable un patrón de trabajo bastante sencillo y estable.

![alt text](http://blog.nodejitsu.com/single-page-apps-with-nodejs/SPAs.png "Estructura de una aplicación, img original de nodejitsu")

_Nota:_ Si tu servicio esta basado en REST API asegurate que tus respuestas sean estandares, usa herramientas que te ayudan a escribir mejor código, como [jslint](http://www.jshint.com/ , "Con soporte para node: npm install jshint") o [jsonlint](http://jsonlint.com/ , "Para asegurarte que tus JSON este bien estructurados")

Si te decis por utilizar múltiples rutas y request estas ante un gran proyecto, aunque podrias utilizar el modelo anterior para reducir tiempos de carga o recarga, asi como menor cantidad de kb provenientes de tu servidor. Lo cual se convierte a largo plazo un ahorro, asi como una mejor experiencia de usuario.

Además puedes sacar provecho de _Local Storage_ , y evitar recargar una y otra vez recursos que pueden ser almacenados en el ordernador del usuario final, así como configuraciones personales y otras cosas. Y si tengo que darte un consejo este seria: mira hacia el futuro y abraza las nuevas tecnologías haz que tus usuarios lo hagan tambien y asi hacemos del Internet un mejor lugar. 

## Ayuda

Una de los grandes factores que han contribuido a la popularidad de Node es su comunidad, es simplemente agradable y además bien entusiasta, actualmente hay [5141][14] modúlos en [npm][14] a disposición de todo aquel que quiera trabajar en casi cualquier cosa. Desde algunos [bastante][16]  [útiles][15] a otros [simplemente][18]  [interesantes][17]

Pero para poder crear este tipo de aplicaciones web se ocupan herramientas, si eres un js ninja te va gustar empezar desde 0, pero apliquemos el [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself "No repitas tú mismo") y usemos estos modúlos que la comunidad ha creado.


Mi stack esta particularmente constituido por: [expressjs](http://expressjs.org), [redis](https://github.com/mranney/node_redis/) y [nowjs](http//nowjs.orgs) (que es una útileria con esteroides de [socket.io](https://github.com/LearnBoost/Socket.IO) para aplicaciones en tiempo real). 

### [Express](http://expressjs.org)

Express es un framework que realmente te hace fácil el proceso de crear aplicaciónes, es bastante robusto e inspirado en sinatra. Para instalarlo:

    npm install -g express

Para crear una aplicación y toda su estructura:
  
    express appnombre
    cd appnombre
    node app.js

De entre las tantas cosas que tiene este framework podemos destacar:

- Escrito sobre [connect](http://senchalabs.github.com/connect) el cual nos provee:

  - Session Handler
  - 11 middleware poderosos asi como de terceros.
  - cookieParser, bodyParser...
  - [vhost](http://senchalabs.github.com/connect/middleware-vhost.html)
  - [router](http://senchalabs.github.com/connect/middleware-router.html), y contando...

En futuros articulos escribire más acerca de express.

Existen otras soluciones como [flatiron](http://github.com/flatiron) o [hook.io](http://github.com/hookio) que proveen de herramientas bastante útiles, además esta [railwayjs](http://railwayjs.com) y por último pero no menos importante [Geddy](http://geddyjs.org/). Cada uno con sus virtudes y defectos, en cuanto a popularidad la lista la encabeza express. 
Una de las ventajas de utilizar un framework en cuanto a aplicaciones web, radica en el hecho del manejo de rutas y sessiones, y archivos estáticos son simplificados enormemente por sus middleware y el API de cada uno de ellos. 


### Nowjs

Como su descripción lo dice: Hace de las aplicaciones en tiempo real un trabajo fácil. Nowjs crea un `namespace` tanto en el servidor como el cliente, asi que puedes crear funciones que funcionan en tu servidor y acceder a ellas desde el navegador (es de gran utilidad en navegadores que no soportan nuevos estandares de javascript).

Para instalarlo:

    npm install -g now

Luego en tu aplicación:
    
    var nowjs = require('now');

Y en el lado del cliente:
    
    // jQuery tiene que cargar primero
    <script src="/nowjs/now.js"></script>

Este es el hello world de nowjs:

    // En el lado del cliente helloworld.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <title>nowjs chat </title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script src="/nowjs/now.js"></script>

    <script>
    $(document).ready(function(){

      now.receiveMessage = function(name, message){
        $("#messages").append("<br>" + name + ": " + message);
      }

      $("#send-button").click(function(){
        now.distributeMessage($("#text-input").val());
        $("#text-input").val("");
      });

      now.name = prompt("What's your name?", "");

    });
    </script>
    </head>

    <body>
      <div id="messages"></div>
      <input type="text" id="text-input">
      <input type="button" value="Send" id="send-button">
    </body>
    </html>

Y en tu servidor:

    var html = require('fs').readFileSync(__dirname+'/helloworld.html');
    var server = require('http').createServer(function(req, res){
      res.end(html);
    });
    server.listen(8080);

    var nowjs = require("now");
    var everyone = nowjs.initialize(server);

    everyone.now.distributeMessage = function(message){
      everyone.now.receiveMessage(this.now.name, message);
    };

Y listo ya tienes tu propia sala de chat. Al igual que express hablaremos más detallado de nowjs en otros articulos. 
La ventaja de utilizar nowjs es que simplifica el uso de socket.io, y no es que sea difícil, pero hace aún más fácil todo el proceso. 


Actualmente existen suficientes modúlos como para preocuparse de que node.js no "tenga algo que ocupe", con decirte que hasta hay un proyecto con el propósito de traer el api de Canvas a tu terminal ([term-canvas](http://github.com/visionmedia/term-canvas  "Canvas Api en tu consola"))

## ¿Y quienes usan node.js?

Luego de casi 2 años en el medio ya existen múltiples aplicaciones exitosas y en crecimiento:

- [Learnboast](http://learnboast.com) (que aparte son contribuidores)
- [Geeklist](http://geekli.st)
- [Transloadit](http://transloadit)
- [Substance](http://substance.io)
- [Y muchos más](https://github.com/joyent/node/wiki/Projects,-Applications,-and-Companies-Using-Node)

## En conclusión
 
El escribir aplicación con node.js es de las cosas más sencillas, lo único que realmente necesitas es voluntad y buenas ideas, para crear aplicaciones y modúlos. Una de las grandes desventajas que encontre al empezar con nodejs (como hace unos 10 meses) es que toda la documentación esta escrita en inglés y todavia esta en inglés asi que muchas gracias por leer [NodeHispano](http://nodehispano.com) y ayudanos a difundir el sitio para que poco a poco la comunidad hispano-hablante vaya creciendo poco a poco. 

Links Recomendados
------------------

Sin orden alguno.

- La documentación que mantiene [nodejitsu](http://nodejitsu.com): [docs.nodejitsu.com](http://docs.nodejitsu.com)
- [How to Node](http://howtonode.org/ "Tutoriales")
- [Dailyjs](http://dailyjs.com "Tutoriales y más")
- [Video tutoriales](http://nodetuts.com)
- Escribiendo modúlos para node: [How to Module](http://howtonode.org/how-to-module  "En inglés") 

### Pro Tips


- Unete a los canales IRC de node.js en freenode (#node.js)
- Asi como el IRC de [nodejitsu](nodejitsu)  (#nodejitsu) y mira la [documentación](http://docs.nodejitsu.com) que ellos manejan.
- Sigue [a](http://twitter.com/ry , "Ryan")  [los](http://twitter.com/izs , "Issac") [grandes](http://twitter.com/felixg , "Felix") [en](http://twitter.com/marak , "marak") twitter
- Dale follow al projecto de [node.js](http://github.com/joyent/node) en Github

### Goodie

En vez de hacer una concatenación con `+`:
    
    console.log("hola" + "mundo")

Puedes hacer: (separando con comas los argumentos)

    console.log)("hola","mundo"
    // "Hola Mundo"

## Del autor

[Alejandro Morales](http://alejandromorales.co.cc), Hondureño, Estudiante universitario, Astrolover, HTML5, CSS3, node.js aficionado. Gran observador de la conducta humana. Conocido en la internet y IRC como "alejandromg". Puedes seguirlo en [twitter](http://twitter.com/_alejandromg), o ver en lo que esta trabajando en [github](http://github.com/alejandromg), o en [forrst](http://forrst.me/alejandromg). 


[1]: http://nodejs.org "Página Oficial"
[2]: http://github.com/numbus-org "Mi proyecto"
[4]: https://twitter.com/#!/search?q=node.js "Twitter search"
[3]: http://www.google.com/trends?q=node.js  "Google Trends"
[5]: http://www.indeed.com/q-Node-Js-jobs.html "Jobs"
[6]: http://www.guardian.co.uk/technology/blog/2011/nov/09/programming-microsoft "Articulo de el guardian"
[7]: http://blogs.msdn.com/b/interoperability/archive/2011/06/23/microsoft-working-with-joyent-and-the-node-community-to-bring-node-js-to-windows.aspx "En Microsoft"
[8]: http://www.readwriteweb.com/hack/2011/06/microsoft-is-helping-joyent-po.php "En RWW"
[9]: http://www.joyent.com/ "Joyent"
[10]: http://www.nodehispano.com/2011/11/como-instalar-node-js-en-mac-os-x-lion-nodejs/ "Instalando en MacOS"
[11]: http://www.nodehispano.com/2011/11/como-instalar-node-js-en-ubuntu-linux-nodejs/ "Instalando en  Ubuntu"
[12]: http://nodejs.org/dist/v0.6.2/node-v0.6.2.msi "*.msi installer"
[13]: http://www.sublimetext.com  "Sublime text"
[14]: http://search.npmjs.org/#/_browse/all "npm search"
[15]: https://github.com/hookio "Hook.io"
[16]: https://github.com/felixge/node-graphite "node-graphite"
[17]: https://github.com/visionmedia/term-canvas "term-canvas"
[18]: https://github.com/nodejitsu/kohai "kohai"