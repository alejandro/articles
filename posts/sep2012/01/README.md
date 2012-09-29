# ES6 y Clases: Reescribiendo tus funciones
-------------------------------------------

¡*yay*!

No hace mucho, se publico el último spec de ECMAScript, ya la versión 6, con muchas cosas nuevas y otras todavia en debate. Pero sin duda hay algunas que me llamarón mucho la atención.

[ES6 introduce el concepto de clases](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes) en JavaScript, así como; [`Quasi Literals`](http://wiki.ecmascript.org/doku.php?id=harmony:quasis), Template Strings o como a mi me gusta llamarlo: "interpolación" aunque sea más que eso.

Básicamente este último te permite escribir strings de esta forma 

    var s = `Hoy es ${Date.now}`
    var otras = ` strings
      multilinea, ${foo + bar}
    `

Fijate bien en los **`**.
 
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

Y creariamos una nueva instancia de `Punto` como sigue:

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

En forma de código podemos definir una clase como sigue:

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


Antes de terminar me gustaria mencionar acerca de `extends` este, te permite crear subclases de métodos (herencias?) lo cual antes necesitabas de mucho trabajo para lograrlo, por ejemplo:

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




