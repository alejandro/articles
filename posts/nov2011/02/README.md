## Publicando tu aplicación


Una vez escritas tus aplicaciones, el siguiente paso,  es buscar _hosting_. Recuerdo hace unos cuantos meses cuan díficil era conseguir un servicio de hosting que soportara node.js, mucho menos uno que lo ofreciera de manera gratuita, particularmente tarde en conseguir una invitación para [Nodester](http://nodester.com) como un mes en [nodejitsu](http://nodejitsu.com) otros 2 meses y así. Actualmente todo este tema esta bastante maduro, y ahora hay algunos que lo único que ocupas es instalar las herramientas para la consola y ya estas listo. 

En estos días, hay empresas que se dedican solo a ofrecer servicios para node.js, lo cual esta bastante bien mientras hay otras cuantas que ofrecen el servicio como parte de su _stack_. En este post veremos algunos de ellos y como funcionan. Si no te interesa un servicio de terceros y prefieres alojar tu propio servicio [ve](http://dailyjs.com/2010/03/15/hosting-nodejs-apps/) [aqui](http://blog.nodejitsu.com/nodejs-cloud-server-in-three-minutes "En un futuro hablare de esto").


Para mantener un orden, tratare de listar cada una de los sitios que ofrecen este servicio (sin ningún orden, bueno los que solo ofrecen node.js hosting primero):

- [nodejitsu](http://nodejitsu.com): [Open Source](http://github.com/nodejitsu)
- [Nodester](http://nodester.com): [Open Source](http://github.com/nodester)
- [cloudno.de](http://cloudno.de): Basado en Nodester
- [no.de](http://no.de) <- El mantainer es [Joyent](http://joyent.com  "node.js financieros").
- [dotcloud](http://dotcloud.com): Tiene casi de todo [CouchDB](http://couchdb.org), [redis](http://redis.io), [mongodb](http://mongodb.org) y contando. (es una buena opción)
- [beje.us](http://beje.us): Basado en Nodester (si, tambien)
- [nodeSocket](http://nodesocket.com)
- [cloudfoundry](http://cloudfoundry.com): aparte ofrece Rails, Spring y Scala. (díficil de conseguir una cuenta)
- [cloud9ide](http://c9.io): Más que todo para desarrollo.
- [heroku](http://heroku.com): De este no hay mucho que decir ;)
- [Engine Yard](http://engineyard.com): Recientemente agrego soporte para [node][1] y aparte ofrece 500 hrs grátis.
- [jsapp.us](http://jsapp.us): una sandbox para probar aplicaciones como cloud9
- [wilbur](http://wilbur.io): Basado en cloudfoundry y no ocupas invitación.


Es una lista larga. Asi que no hay excusa para que no empieces a usar [node.js][1] pues como mencione en el artículo anterior, la comunidad
esta bastante preocupada en ofrecer lo mejor para todos, y pues todos los servicios listados anteriormente son bastante eficientes. Yo les voy a hablar de los que son Open Source pues bien merecido se lo tienen.

## [Nodester](http://nodester.com)
![alt text](http://nodester.com/images/nodesterrocketlogo.jpg)

Empezare con nodester pues fue de los primeros (o él primero) en ofrecer hosting de manera gratuita. En uno de los videos se explica que la principal razón por lo que lo hacian de gratis es porque no habia ningún otro servicio que lo ofreciera. Tienen como fílosofia PaaS (Plataforma como Servicio). Aparte tiene como respaldo los servidores de Amazon y Rackspace, además implementa una RESTful API diseñada para no utilizar VPSs.

Para empezar a usar a nodester ocupas, tener instalado [curl](, "sudo apt-get install curl"): * Muchos de los pasos funcionan para cloudno.de, beje.us.

    curl -X POST -d "email=correo@electronico.com" http://nodester.com/coupon

Cruza los dedos y espera por tu cupon, ellos semanalmente (a veces hasta 3 veces por semana), envian cupones a todos los que estan en la lista de espera. Si quieres acelerar el proceso escribles un twitt a [@nodester](http://nodester.com).

Una vez aceptado, instala las herramientas de consola:
  
    > npm install -g nodester-cli
    > nodester user setup USUARIO PASSWORD
    > nodester user setkey ARCHIVO.PEM

Y crea tu aplicación:
    
    > nodester app create APPNOMBRE SERVER.js
    // donde SERVER.js es tu archivo con el que inicia la aplicación.

Debo de aceptar que es de las APIs más fáciles de utilizar, además esta basada en git, lo cual es de gran ayuda.

    > nodester app create myapp
    > nodester app info myapp
    > git remote add nodester LA_URL_QUE_VIENE_DE_APP_INFO_ 
    // y luego simplemente haz un push:
    > git push nodester master

Ve a http://myapp.nodester.com y podras ver tu aplicación ya en nodester. Puedes encontrar más información en la [documentación](http://nodester.com/api.html) de nodester.


## [nodejistu](http://nodejitsu.com)
![alt text](http://blog.nodejitsu.com/img/header.png  "logo")

Tienen como filosofia SaaS (Software como servicio) y el _[Open](http://github.com/hookio "hook.io") [Source](http://github.com/nodejistu  "Nodejitsu en github")_, además proveen bases de datos noSQL como: "couchdb", "mongodb", "redis" a través de [los](http://iriscouch.com "irish couch") [principales](http://mongohq.com "mongohq") [proveedores](http://redistogo.com "redis to go").

La forma más fácil de iniciar con [nodejistu](http://nodejitsu) es a través de `telnet` o `nc`:
  
    > telnet nodejitsu.com
    // ó 
    > nc jitsu.com 23

Ambos métodos son bien funcionales, ya que nodejistu esta en _"extended private beta"_ ocupas un poquito de suerte para lograr entrar, pero si eres bueno con él IRC entra a freenode y unete a el canal de nodejitsu :: #nodejistu y pide por ella (así consegui el mio). *Update:* Al parecer por los momentos no estan ofreciendo invitaciones pero si en los próximos dias. Esten atentos.

Bueno una vez que ya estas dentro lo que puedes hacer es bien simple:

    > npm install jitsu -g
    > jistu login // El clásico auth
    > jitsu deploy // en el folder de tu aplicación.
    // Listo

Super fácil, ¿eh? Claro durante cada uno de los pasos te piden información acerca del nombre de tu aplicación y otras cosas. De preferencia ten tu propio `package.json` aquí un [artículo](http://blog.nodejitsu.com/package-dependencies-done-right "Si es de nodejitsu")   de como construirlo o instalate el `require-analyzer` con ` npm install require-analyzer -g`.

Una vez finalizado el `jistu deploy` te mostrara la url de tu aplicación que por lo general es: http://APPNOMBRE.nodejistu.com
 

## Heroku

Heroku sera del último que hable pues los demás actuan de similar forma. Si ya haz trabajado con heroku todo el proceso es similar. De igual forma heroku ofrece servidores de node.js gratuitos (claro si quieres aumentar la capacidad de tu server tienes que pagar). Para empezar tienes que tener tu estación de trabajo lista para trabajar con heroku, ocupas una cuenta y que tus `keys` esten autorizadas, de igual forma necesitas tener instalado el toolbelt instalado:

    // en el caso de un UBUNTU
    > apt-add-repository 'deb http://toolbelt.herokuapp.com/ubuntu ./'
    curl http://toolbelt.herokuapp.com/apt/release.key | apt-key add -
    > apt-get update
    > apt-get install heroku-toolbelt
    
    // en el caso de MacOS ya existe un paquete
    > curl http://assets.heroku.com/heroku-toolbelt/heroku-toolbelt.pkg > toolbelt.pkg

Luego haz *heroku login* para identificar tu sistema en heroku. Una vez hecho esto ya estas listo para hacer un deploy, de igual forma que con nodejistu ocupas tu `package.json` donde esten especificados todos los módulos que estas ocupando, como sigue:
    
    // Package.json
    {
      "name": "node-example",
      "version": "0.0.1",
      "dependencies": {
        "express": "2.2.0"
      }
    }

Si queres probar tu paquete haz *npm install* y si termina en "OK" es porque esta bien hecho. Ya que heroku es un servicio un poco rubyista ocupas un `Procfile` donde describas el servicio que usas:
    
    // Guardas esta linea con el nombre de: Procfile 
    web: node SERVER.js

Luego de esto haz los `commits` necesarios con git y luego:

    > heroku create  --stack cedar
    // Y haz deploy
    > git push heroku master 
    // Según la documentación de heroku ocupas iniciar manualmente el Procfile
    > heroku ps:scale web=1
    // Si quieres probar si todo salio bien:
    > heroku ps

Ahora bien la aplicación debe estar ejecutandose en los servidores, pero necesitas manualmente establecer el ambiente del servidor a producción 

    > heroku config:add NODE_ENV=production

Si quieres leer más acerca de workers y todo el rollo de escalabilidad en heroku visita este [link](http://devcenter.heroku.com/articles/node-js).

## En conclusión

Como pueden ver existen una cantidad bastante considerable de servicios de hosting para node.js y muchos de ellos grátis, ¿excelente no? Si necesitas montar tu propio servicio existen ya muchos métodos bastante efectivos como el propio [nodester](http://github.com/nodester) o [haibu](http://github.com/nodejitsu/haibu), este último es el servidor que usa nodejitsu para su plataforma, asi que todo el trabajo que necesitas hacer es instalarlos en tu propio servidor, de igual forma existen métodos donde no ocupas de toda una plataforma, particularmente encontre de mucha ayuda [este post de clock.co.uk](http://blog.clock.co.uk/2011/04/11/deploying-node-js-apps/), ellos usan una técnica bastante útil y aparte le sacan provecho a la versionización de los proyectos.

### Definiciones:
- [SaaS](http://es.wikipedia.org/wiki/Software_como_servicio):  es un modelo de distribución de software donde el software y los datos que maneja se alojan en servidores de la compañía de tecnologías de información y comunicación (TIC) y se accede con un navegador web a través de internet. La empresa TIC provee el servicio de mantenimiento, operación diaria, y soporte del software usado por el cliente. Regularmente el software puede ser consultado en cualquier computador, esté presente en la empresa o no. Se deduce que la información, el procesamiento, los insumos y los resultados de la lógica de negocio del software están hospedados en la compañía de TIC.

### Goodie:

El goodie de esta semana, es más que una buena práctica de *npm*, lo más lógico al instalar paquetes con npm necesitas hacer sudo verdad. Bueno lo más apropiado es no usar *sudo*, por el simple hecho de que hay modulos que interactuan con muchas otras cosas y desde el momento que lo instalas con sudo todos sus procesos necesita hacerlos como master lo cual no es muy bueno que digamos. Para este pequeño capricho o problema podemos cambiar los permisos a el directorio personal (que es donde se instalan los modulos) y cambiar de propietario a tu perfil de usuario mediante:

    > sudo chown -R $USER /usr/local

Una vez hecho esto ya no ocupas hacer:

    > sudo npm install -g package


_disclaimer_ Hay muchas compañias que ofrecen hosting para [node.js][1] si se me olvida alguno, dejalo en los comentarios ;)

Gracias por leer hasta el final y no te olvides de darle un follow a [@NodeHispano](http://twitter.com/NodeHispano) y dejar tu comentario.


[1]: http://nodejs.org "nodejs"
