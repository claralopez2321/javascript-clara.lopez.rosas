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
//---------- Saludo inicial


//----------------

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


//---------------------


// Función para saludar al usuario por su nombre
function saludarPorNombre() {
  // Solicitar al usuario que ingrese su nombre
  const nombre = prompt("Por favor, ingresa tu nombre:");

  // Verificar si el usuario ingresó un nombre
  if (nombre !== null) {
    // Verificar si el nombre no está vacío
    if (nombre.trim() !== "") {
      // Mostrar el saludo con el nombre del usuario en una ventana emergente
      alert(`¡Hola, ${nombre.trim()}! Bienvenido a ForeverFramed`);

      // Mostrar el saludo con el nombre del usuario en la consola del navegador
      console.log(`¡Hola, ${nombre.trim()}! Bienvenido a ForeverFramed`);
    } else {
      // Mostrar un saludo genérico en una ventana emergente si el usuario no ingresó un nombre
      alert("¡Hola! Bienvenido a ForeverFramed");

      // Mostrar un saludo genérico en la consola del navegador
      console.log("¡Hola! Bienvenido a ForeverFramed");
    }
  }
}

// Llamar a la función para saludar al usuario por su nombre
saludarPorNombre();

//---------------array productos

const items = [
  { name: "Viajes inolvidables", description: "Viajes de todo tipo, recuerdos para siempre.", price: 10 },
  { name: "Fiestas únicas", description: "Bodas, cumpleaños, aniversarios.", price: 15 },
  { name: "Días para recordar", description: "Bautizos, graduaciones, eventos.", price: 20 },
];

// Función para saludar al cargar la página
function saludoinicial() {
  console.log("Bienvenido a ForeverFramed");
}

// Función para buscar elementos
function buscar() {
  const input = document.getElementById('searchBar').value.toLowerCase();
  const resultados = items.filter(item => item.name.toLowerCase().includes(input));
  mostrarResultados(resultados);
}

// Función para mostrar los resultados de búsqueda
function mostrarResultados(resultados) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores
  resultados.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('result-item');
      div.innerHTML = `<h5>${item.name}</h5><p>${item.description}</p><p>Precio: $${item.price} USD</p>`;
      resultadosDiv.appendChild(div);
  });
}

//---------------
// Array para almacenar los elementos del carrito
const carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(precio) {
  // Agregar el precio al carrito
  carrito.push(precio);
  
  // Actualizar la interfaz de usuario
  mostrarCarrito();
}

// Función para mostrar los elementos del carrito y el total en una ventana emergente y en la consola
function mostrarCarrito() {
  const total = carrito.reduce((acc, precio) => acc + precio, 0);
  const mensaje = `Elementos en el carrito: ${carrito.length}\nTotal: $${total} USD`;

  // Mostrar en ventana emergente
  alert(mensaje);

  // Mostrar en la consola
  console.log(mensaje);
}

// Función para limpiar el carrito
function limpiarCarrito() {
  // Vaciar el array del carrito
  carrito.length = 0;

  // Actualizar la interfaz de usuario
  mostrarCarrito();
}

// Obtener el botón de limpiar carrito por su ID
const btnLimpiarCarrito = document.getElementById('limpiar-carrito');

// Agregar evento de clic al botón de limpiar carrito
btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

// Obtener todos los botones de agregar al carrito por su clase y agregar evento de clic
const botonesAgregarCarrito = document.querySelectorAll('.btn.btn-primary.bg-warning');

botonesAgregarCarrito.forEach(function(boton) {
  boton.addEventListener('click', function() {
    // Obtener el precio del botón
    const precio = parseFloat(this.textContent.trim().split(' ')[2]);
    // Llamar a la función para agregar al carrito
    agregarAlCarrito(precio);
  });
});

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



