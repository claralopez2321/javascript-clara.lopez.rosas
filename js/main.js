//? condicional

//*     ==              Es igual
//*     !=              Es distinto
//*     <               Es menor
//*     >               Es mayor 
//*     <=              Es menor o igual
//*     >=              Es mayor o igual
//*     && AND
//*     || OR



// While

// Obtener el elemento h1 mediante getElementsByClassName
const titulo = document.getElementsByClassName('titulo1')[0];

// Definir una función para cambiar el estilo del texto
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

//------------------------------------



//------------------ pedir nombre y mostrarlo

function saludoinicial(nombre) {
  alert("Hola " + nombre + " elije el plan para tí!");
}

let nombreIngresado;
do {
  nombreIngresado = prompt("Ingresá tu nombre, crack");
  console.log(nombreIngresado); // Agrega esta línea para verificar el valor de nombreIngresado
} while (!nombreIngresado || nombreIngresado === "Escribe tu nombre");

saludoinicial(nombreIngresado);


//---------------
// Función para manejar el clic en un botón de producto
function handleProductClick(price) {
  // Sumar el precio al total
  total += price;

  // Mostrar el mensaje de alerta con el total actualizado
  showAlert(total);
}

// Variable para almacenar el total del pedido
var total = 0;

// Obtener todos los botones por su clase y agregar evento de clic
var buttons = document.querySelectorAll('.btn.btn-primary.bg-warning');

// Iterar sobre cada botón y agregar un evento de clic
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Obtener el precio del botón
    var buttonText = this.textContent.trim();
    var price = parseFloat(buttonText.split(' ')[2]);
    // Llamar a la función para manejar el clic en el botón
    handleProductClick(price);
  });
});

// Función para mostrar el mensaje de alerta con el precio
function showAlert(total) {
  alert("El total de tu pedido es " + total + " USD");
}

// Función para limpiar el carrito
function limpiarCarrito() {
  total = 0;
  showAlert(total); // Mostrar un mensaje indicando que el carrito ha sido limpiado
}

// Obtener el botón de limpiar carrito por su ID
var btnLimpiarCarrito = document.getElementById('limpiar-carrito');

// Agregar evento de clic al botón de limpiar carrito
btnLimpiarCarrito.addEventListener('click', limpiarCarrito);
//----------------------------------

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

// Función para manejar la lógica de mostrar la promoción
function manejarPromocion(boton, promocion) {
  boton.addEventListener("click", function() {
    mostrarPromocion(promocion);
  });
}

// Obtener los botones de las promociones
var botonPromocion1 = document.getElementById("boton-promocion1");
var botonPromocion2 = document.getElementById("boton-promocion2");

// Ejecutar la lógica para manejar cada botón y su respectiva promoción
manejarPromocion(botonPromocion1, promocion1);
manejarPromocion(botonPromocion2, promocion2);

console.log( new Date() );


//--------------------

