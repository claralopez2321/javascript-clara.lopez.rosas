//? condicional

//*     ==              Es igual
//*     !=              Es distinto
//*     <               Es menor
//*     >               Es mayor 
//*     <=              Es menor o igual
//*     >=              Es mayor o igual
//*     && AND
//*     || OR
//*      ! NOT



// While

// Obtener el elemento h1
const titulo = document.querySelector('.titulo1');

// apuntes en verde: Definir una función para cambiar el estilo del texto
function animarTitulo() {
  // Alternar entre dos colores diferentes cada 1 segundo
  if (titulo.style.color === 'blue') {
    titulo.style.color = 'red';
  } else {
    titulo.style.color = 'blue';
  }
}

// Llamar a la función animarTitulo() cada 1 segundo
setInterval(animarTitulo, 1000);

function saludoinicial(nombre) {
  alert("Hola " + nombre + " elije el plan para tí!");
}

let nombreIngresado;
do {
  nombreIngresado = prompt("Ingresá tu nombre, crack");
  console.log(nombreIngresado); // Agrega esta línea para verificar el valor de nombreIngresado
} while (!nombreIngresado || nombreIngresado === "Escribe tu nombre");

saludoinicial(nombreIngresado);

function sumar(num1, num2) {
  return num1 + num2;
}

let resultado = sumar(2, 30)
console.log(resultado)


// probando Función para mostrar el mensaje de alerta con el precio
function showAlert(total) {
  alert("El total de tu pedido es " + total + " USD");
}

// Variable para almacenar el total del pedido
var total = 0;

// Obtener todos los botones por su clase y agregar evento de clic
var buttons = document.querySelectorAll('.btn-primary');

// Iterar sobre cada botón y agregar un evento de clic
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
      // Obtener el precio del botón
      var buttonText = this.textContent.trim();
      var price = parseFloat(buttonText.split(' ')[2]);

      // Sumar el precio al total
      total += price;

      // Mostrar el mensaje de alerta con el total actualizado
      showAlert(total);
  });
});

// Función para limpiar el carrito
function limpiarCarrito() {
  total = 0;
  showAlert(total); // Mostrar un mensaje indicando que el carrito ha sido limpiado
}

// Obtener el botón de limpiar carrito por su ID
var btnLimpiarCarrito = document.getElementById('limpiar-carrito');

// Agregar evento de clic al botón de limpiar carrito
btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

// Definir objetos para representar promociones de servicios
var promocion1 = {
  titulo: "Promoción 1",
  descripcion: "¡Aprovecha nuestra oferta especial de edición de fotografías! Transforma tus imágenes en obras de arte digitales por un precio increíble.",
  precio: 50
};

var promocion2 = {
  titulo: "Promoción 2",
  descripcion: "¿Necesitas un logotipo único y memorable para tu negocio? Con nuestra promoción especial de diseño de logotipo, obtén un diseño profesional a un precio accesible.",
  precio: 100
};

// Probando Función para mostrar la información de la promoción 
function mostrarPromocion(promocion) {
  alert(`
      Título: ${promocion.titulo}
      Descripción: ${promocion.descripcion}
      Precio: ${promocion.precio} USD
  `);
}

// Obtener los botones de las promociones
var botonPromocion1 = document.getElementById("boton-promocion1");
var botonPromocion2 = document.getElementById("boton-promocion2");

// Agregar eventos de clic a los botones para mostrar la información de la promoción correspondiente
botonPromocion1.addEventListener("click", function() {
  mostrarPromocion(promocion1);
});

botonPromocion2.addEventListener("click", function() {
  mostrarPromocion(promocion2);
});