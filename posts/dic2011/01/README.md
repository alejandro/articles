# De módulos y más.

Inicialmente tenia pensado hablar de [express][exp], pero existen ya una gran cantidad [de][1] [articulos][2], [post][3], videos  (?)... acerca de eso, así que mejor les voy a hablar de unos cuantos módulos que son bastante útiles en la aplicaciones de la vida real. Además estaba leyendo este [artículo][4] y comparto con muchas de los puntos que [mikkel][5] muestra, además los comentarios son fenomenales, y no solo él, muchas otras personas se han encontrado con el mismo problema. Ahora bien yo siempre confío en módulos de aquellos comprometidos por la comunidad, o esos que son extraordinariamente inteligentes, además de vez en cuando miro los github's de [la lista de los top ten][6] y si ahí esta lo que ocupa, ahí termina mi búsqueda.

Si eres desarrollador de aplicaciones web o estas actualizando tu stack a las nuevas tecnologías te han de servir mucho. 

#### Voy a tratar de llevar un orden desde el fondo del back-end hasta front-end y obviando a [express][exp] (si quieres que hable de él, hazme saber) y [nowjs][now] :

## [Commander][a1]
Ya sea que estés escribiendo aplicaciones para la terminal o mejorando tus módulos para hacerlos "más" interactivos este módulo es tu mejor opción.

####Instalación
    
    npm install commander -g


Luego en tu aplicación:
   
    var commander = require('commander');
    #!/usr/bin/env node


    /**
     * Module dependencies.
     */

    var program = require('commander');

    program
      .version('0.0.1')
      .option('-p, --peppers', 'Add peppers')
      .option('-P, --pineapple', 'Add pineapple')
      .option('-b, --bbq', 'Add bbq sauce')
      .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
      .parse(process.argv);

    console.log('you ordered a pizza with:');
    if (program.peppers) console.log('  - peppers');
    if (program.pineapple) console.log('  - pineappe');
    if (program.bbq) console.log('  - bbq');
    console.log('  - %s cheese', program.cheese);

[exp]: http://expressjs.com "expressjs"
[1]: http://www.daniweb.com/web-development/javascript-dhtml-ajax/reviews/349689
[2]: http://www.cristalab.com/tutoriales/aplicacion-basica-con-nodejs-express-jade-y-stylus-c101503l/
[3]: https://www.google.com/search?gcx=c&sourceid=chrome&ie=UTF-8&q=que+es+express+node.js "Google search"
[4]: http://mikkel.hoegh.org/blog/2011/12/20/trouble-in-node-dot-js-paradise-the-mess-that-is-npm/ "The mess that is npm"
[5]: http://twitter.com/mikl
[6]: http://blog.nodejitsu.com/top-node-module-creators
[now]: http://www.nodehispano.com/2011/11/%C2%BFy-ahora-nodejs/ "Si ya hable de él"
[a1]: https://github.com/visionmedia/commander.js/ "npm install commander -g"