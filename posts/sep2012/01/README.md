# ES6 y Clases
--------------

No hace mucho, se publicó un nuevo spec de ECMAScript,(ES6), con muchas cosas nuevas y otras todavia en debate. Pero sin duda hay algunas que llma mucho la atención.

[ES6 introduce el concepto de clases](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes) en JavaScript, así como; [`Quasi Literals`](http://wiki.ecmascript.org/doku.php?id=harmony:quasis), Template Strings o como a mi me gusta llamarlo: "interpolación" aunque sea más que eso.


Ahora supongamos que tenemos este código, que simplemente define un punto con coordenas x, y, calcula la distancia entre las dos coordenadas y además permite extender sus coordenadas:

```javascript

// usando Node
module.exports = Punto

var util = require('util')

function Punto(coordenadas) {
    util._extend(this, coordenadas)
}

Punto.fn = Punto.prototype // Simple shorthand, muy a lo jQuery.

Punto.fn.__defineGetter__('distancia', function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
})

Punto.fn.__defineGetter__('area', function(){
    return (0.5 * Number(this.x) * Number(this.y))
})

Punto.fn.extend = function(coordenada, mas) {
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida')
    this[coordenada] += mas
    return this
}
```

Creariamos una nueva instancia de `Punto` como sigue:

```javascript
var punto = new Punto({x:1, y:2})

// comprobando sus propiedades
assert.equal(punto.x, 1)
assert.equal(punto.distancia, 2.23606797749979)
assert.equal(punto.area, 1)

punto.extend('x', 3)
assert.equal(punto.distancia, 4.47213595499958)

```

Como podemos ver, es la tipica definición o emulación de clases en JavaScript que sabemos hacer, claro, antes de ES6 ;). 

En la nueva versión la palabra reservada: `class` ya tiene una función bastante útil y de cierta manera más semanticamente correcta.

Para poder definir una clase los requerimientos minimos son:

- Tiene una forma de declaración que usa la palabra `class` y un identificador para ser creada
- Tiene un cuerpo que puede ser incluido tanto en el `constructor` de la función como en los métodos de la instancia (`prototype`), incluidos las propiedades `getter` y `setter`.
- La clase puede ser incluida como subclase de otra clase (probablemente con la keyword `extends`)
- `super` esta disponible desde cada uno de los métodos o el `constructor` de la función.

En forma de código quedaria como lo que sigue:

```javascript
class <nombre> {
  constructor(){
  }
  propiedad(){
    ...
  }
  otra_propiedad(...args){
    ...
  }
  get propi(){
    ...
  	return this.propi;
  }
}
```

Siguiendo con el ejemplo de `Punto`, la primer parte quedaría reescrita así:

```javascript
class Punto {
  constructor (coordenadas){
    util._extend(this, coordenadas)
  }
}
```

Como puedes ver, ahora ya defines implicitamente el `constructor`, el cual a su vez es opcional, si este no es declarado al ser creada una nueva instancia de la clase retornaria Empty (`constructor() { [empty] }`).

Ahora para definir propiedades tiene dos opciones, con `prototype` o con la nueva sintaxis:

```javascript
class Punto {
  // constructor() {...}
  extend (coordenada, mas){
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida')
    this[coordenada] += mas
    return this
  }
}
```

Y claro puedes definir `Setter`s y `Getters`.

```javascript
class Punto {
  // constructor() {...}
  // ...
  get distancia(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  get area(){
    return (0.5 * Number(this.x) * Number(this.y))
  }
}
```

Por lo tanto la función `Punto` fue reescrita en forma de `Clase`y el resultado es el siguiente:

```javascript
class Punto extends EventEmitter {
  constructor (coordenadas){
    util._extend(this, coordenadas)
  }
  extend (coordenada, mas){
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida')
    this[coordenada] += mas
    this.emit('change', `Hooray! ${coordenada} ha cambiado`)
    return this
  }
  get distancia(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  get area(){
    return (0.5 * Number(this.x) * Number(this.y))
  }
}
```

Como puedes ver, es más compacta, pero a la vez pierde algo de readibilidad para las personas que no conocen muy bien el lenguaje, además puedes ver que los métodos o propiedades pierden la característica de ser definidos como funciones, sintácticamente hablando. Tiene muchos beneficios que no te daras cuenta hasta que te toque a tì [escribir código que necesita ser tratado especialmente](https://gist.github.com/3718393).


`extends` te permite crear clases que sean subclases de otros métodos (herencias?) lo cual es un poco trabajoso. Pero usando esta keyword, nosotros podriamos escribir la función Punto como una instancia de EventEmitter de la siguiente manera:

```javascript

class Punto extends EventEmitter {
  // ...
  extend (coordenada, mas){
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida')
    this[coordenada] += mas
    this.emit('change', "Hooray!" +  coordenada + " ha cambiado")
    return this
  }
}

var punto = new Punto({/*, */})

punto.on('change', function (msg){
  console.log(msg)
})

punto.extend('x', 2) // => 'Hooray! x ha cambiado
```

Ya no necesitas hacer: `EventEmitter.call(this); util.inherits(Punto, EventEmitter);` sin duda algo muy bueno y que ayudara a reducir la cantidad de caracteres ha escribir.

## Quasi Literals

Ahora ya por último dejame contarte de `quasi literals`, estos permiten que dentro de cadenas de caracteres existan expresiones embebidas, esto es llamado comunmente *"String Interpolation"*, y utiliza "back ticks" en vez de comillas o single quotes.  Además hace uso de `${}` para embeber expresiones, tal y como mirabamos en la expresión de arriba. Además este, te permite escribir strings de esta forma:

    var s = `Hoy es ${Date.now}`
    var otras = ` strings
      multilinea, oh yeahh!
      ${foo + bar}
    `

Fijate bien en los **`**.

	
 Siguiendo con nuestro ejemplo, el  `.emit` bien puede usar `quasi literals`, esa linea quedaria reescrita de la siguiente manera:

```javascript
  this.emit('change', `Hooray! ${coordenada} ha cambiado`)
```

Particularmente, esta era una de las cosas que más estaba esperando, ya que puedes concatenar variables con texto sin estar haciendo tantas `+ 'st' + ...`, además no solo variables sino expresiones completas.

Entonces nuestra función quedaria finalmente así:
```javascript
var util = require('util')
var EventEmitter = require('events').EventEmitter

class Punto extends EventEmitter {
  constructor (coordenadas){
    util._extend(this, coordenadas)
  }
  extend (coordenada, mas){
    if (!this[coordenada]) throw new TypeError('Coordenada Inválida')
    this[coordenada] += mas
    this.emit('change', `Hooray! ${coordenada} ha cambiado`)
    return this
  }
  get distancia(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  get area(){
    return (0.5 * Number(this.x) * Number(this.y))
  }
}


// TEST:
var punto = new Punto({x:1, y:2})

punto.on('change', function (msg){
  console.log(msg)
})
// comprobando sus propiedades
assert.equal(punto.x, 1)
assert.equal(punto.distancia, 2.23606797749979)
assert.equal(punto.area, 1)

punto.extend('x', 3) // => 'Hooray! x ha cambiado'
assert.equal(punto.distancia, 4.47213595499958)

```

¿Divertido no? Más adelante estare hablandoles acerca de la nueva forma de [definir funciones](http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax), [eagal](http://wiki.ecmascript.org/doku.php?id=harmony:egal), [`rest parameters`](http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters) y muchas cosas más que se vienen en este nuevo release.


**Nota**

Tu puedes correr el código con sintáx es6 simplemente instalando [`six`](https://github.com/matthewrobb/six) (`npm install -g six`) y luego: `six script.js` y listo.


Todo el código esta en: https://gist.github.com/3803344
















