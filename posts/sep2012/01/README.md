# ES6 y Clases: Reescribiendo tus funciones
-------------------------------------------

¡*yay*!

No hace mucho, se publico el último spec de ECMAScript, ya la versión 6, con muchas cosas nuevas y otras todavia en debate. Pero sin duda hay algunas que me llamarón mucho la atención.

[ES6 introduce el concepto de clases](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes) en JavaScript, así como [`Quasi Litarals`](http://wiki.ecmascript.org/doku.php?id=harmony:quasis) o como a mi me gusta llamarlo: "interpolación" aunque sea más que eso.

Supongamos que tenemos este código, sencillo:

```javascript
module.exports = Punto

var util = require('util')

function Punto(coordenadas) {
    if (!(this instanceof Punto)) return new Punto(coordenadas)
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

Como podemos ver, es la tipica definición o emulación de clases en JavaScript que sabemos hacer, claro, antes de ES6 ;). 

En la nueva versión la palabra reservada: `class` ya tiene una funciòn muy útil. 