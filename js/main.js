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
const [titulo] = document.getElementsByClassName('titulo1');

// Definir una función para cambiar el estilo del texto
const animarTitulo = () => titulo.style.color = titulo.style.color === 'blue' ? 'red' : 'blue';

// Llamar a la función animarTitulo() cada 1 segundo
setInterval(animarTitulo, 1000);

//---------------------

// Función para saludar al usuario por su nombre
const saludarPorNombre = () => {
  const nombre = prompt("Por favor, ingresa tu nombre:")?.trim();
  const mensaje = nombre ? `¡Hola, ${nombre}! Bienvenido a ForeverFramed` : "¡Hola! Bienvenido a ForeverFramed";
  alert(mensaje);
  console.log(mensaje);
};

// Llamar a la función para saludar al usuario por su nombre
saludarPorNombre();


// Array para almacenar los elementos del carrito
let carrito = [];

// Función para agregar un producto al carrito
const agregarAlCarrito = (precio, descripcion) => {
  // Usar el operador de propagación para crear un nuevo array con el nuevo precio
  carrito = [...carrito, {precio, descripcion}];
  mostrarCarrito();
  abrirCarrito();
};

// Función para mostrar los elementos del carrito y el total en la barra lateral
const mostrarCarrito = () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  
  // Limpiar la lista actual
  listaCarrito.innerHTML = '';

  // Agregar cada elemento del carrito a la lista
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.descripcion}: $${item.precio} USD`;
    listaCarrito.appendChild(li);
  });

  // Calcular el total
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalCarrito.textContent = `Total: $${total} USD`;
};

// Función para limpiar el carrito
const limpiarCarrito = () => {
  carrito = [];
  mostrarCarrito();
};

// Función para abrir el carrito
const abrirCarrito = () => {
  document.getElementById('carrito-lateral').classList.add('visible');
};

// Función para cerrar el carrito
const cerrarCarrito = () => {
  document.getElementById('carrito-lateral').classList.remove('visible');
};

// Obtener el botón de limpiar carrito por su ID
const btnLimpiarCarrito = document.getElementById('limpiar-carrito');

// Agregar evento de clic al botón de limpiar carrito
btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

// Obtener el botón de cerrar carrito por su ID
const btnCerrarCarrito = document.getElementById('cerrar-carrito');

// Agregar evento de clic al botón de cerrar carrito
btnCerrarCarrito.addEventListener('click', cerrarCarrito);

// Obtener todos los botones de agregar al carrito por su clase y agregar evento de clic
document.querySelectorAll('.btn.btn-primary.bg-warning').forEach(boton => {
  boton.addEventListener('click', () => {
    const textoBoton = boton.textContent.trim();
    const precio = parseFloat(textoBoton.split(' ')[2]);
    const descripcion = boton.parentElement.querySelector('h5').textContent.trim();
    agregarAlCarrito(precio, descripcion);
  });
});

// Obtener el botón de comprar por su ID y agregar evento de clic
const btnComprar = document.getElementById('comprar');

btnComprar.addEventListener('click', () => {
  if (carrito.length > 0) {
    alert('Gracias por su compra!');
    carrito = [];
    mostrarCarrito();
    cerrarCarrito();
  } else {
    alert('El carrito está vacío.');
  }
});
//----------------------------------

// Definir objetos para representar promociones de servicios
const promocion1 = {
  titulo: "Promoción 1",
  descripcion: "¡Aprovecha nuestra oferta especial de edición de fotografías! Transforma tus imágenes en obras de arte digitales por un precio increíble.",
  precio: 50
};

const promocion2 = {
  titulo: "Promoción 2",
  descripcion: "¿Necesitas un logotipo único y memorable para tu negocio? Con nuestra promoción especial de diseño de logotipo, obtén un diseño profesional a un precio accesible.",
  precio: 100
};

// Función para agregar promociones al carrito
const agregarPromocionAlCarrito = (promocion) => {
  const descripcion = `${promocion.titulo}: ${promocion.descripcion}`;
  agregarAlCarrito(promocion.precio, descripcion);
};

// Función para manejar la lógica de mostrar la promoción
const manejarPromocion = (boton, promocion) => {
  boton.addEventListener("click", () => agregarPromocionAlCarrito(promocion));
};

// Obtener los botones de las promociones
const botonPromocion1 = document.getElementById("boton-promocion1");
const botonPromocion2 = document.getElementById("boton-promocion2");

// Ejecutar la lógica para manejar cada botón y su respectiva promoción
manejarPromocion(botonPromocion1, promocion1);
manejarPromocion(botonPromocion2, promocion2);

//---------



//----sorteo

// Definir función para realizar el sorteo
function realizarSorteo() {
  var userNumber = parseInt(document.getElementById("userNumber").value);
  var randomNumber = Math.floor(Math.random() * 100) + 1;
  var resultadoSorteo = document.getElementById("resultadoSorteo");
  
  // Mostrar el número sorteado en el elemento resultadoSorteo
  resultadoSorteo.innerHTML = "Número sorteado: " + randomNumber;

  // Verificar si el número ingresado por el usuario coincide con el número sorteado
  if (userNumber === randomNumber) {
      resultadoSorteo.innerHTML += "<br><strong>Ganaste el 40% de descuento!</strong>";
  } else {
      resultadoSorteo.innerHTML += "<br><strong>Mala suerte!</strong>";
  }
}

//---- barra busqueda


// Función para realizar la búsqueda
const buscar = () => {
  const input = document.getElementById("searchBar");
  const query = input.value.toLowerCase();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  // Si la consulta está vacía, no hacer nada
  if (query === "") {
    return; // Salir de la función
  }

  // Buscar productos que coincidan con la consulta
  const productosCoincidentes = [
    { nombre: "Viajes inolvidables", precio: 10 },
    { nombre: "Fiestas únicas", precio: 15 },
    { nombre: "Días para recordar", precio: 20 },
  ].filter((producto) => producto.nombre.toLowerCase().includes(query));

  // Mostrar los resultados de la búsqueda
  productosCoincidentes.forEach((producto) => {
    const elemento = document.createElement("p");
    elemento.textContent = `Producto: ${producto.nombre}, Precio: $${producto.precio} USD`;
    resultados.appendChild(elemento);
  });

  if (productosCoincidentes.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron resultados.";
    resultados.appendChild(mensaje);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  // Asociar la función buscar al evento de clic en el input de búsqueda
  document.getElementById("searchBar").addEventListener("focus", buscar);
});

//----------- Sweet alert

// Variable para verificar si la promoción ya se aplicó
let promocionAplicada = false;

// Función para aplicar un descuento del 50% al carrito
const aplicarDescuento = () => {
  // Verificar si la promoción ya se aplicó
  if (!promocionAplicada) {
    // Iterar sobre cada producto en el carrito
    carrito.forEach(producto => {
      // Calcular el descuento del 50% para el precio actual del producto
      const descuento = producto.precio * 0.5;
      // Restar el descuento al precio del producto
      producto.precio -= descuento;
    });
    // Establecer la bandera promocionAplicada como true
    promocionAplicada = true;
  }
};

// SweetAlert para el botón de promoción 3
document.getElementById("boton-promocion3").addEventListener("click", () => {
  // Verificar si la promoción ya se aplicó
  if (!promocionAplicada) {
    Swal.fire({
      title: 'Promoción 3',
      text: 'Si eres de México tienes un 50% de descuento en tu compra final',
      icon: 'info',
      confirmButtonText: '<i class="fas fa-flag"></i> Soy de México ¡Quiero este beneficio!',
      confirmButtonColor: '#FFA500', // Naranja
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aplicar descuento al carrito
        aplicarDescuento();
        // Mostrar mensaje de éxito
        Swal.fire('¡Descuento aplicado!', 'Se ha aplicado un 50% de descuento a tu carrito.', 'success');
        // Actualizar la visualización del carrito
        mostrarCarrito();
      }
    });
  } else {
    // Si la promoción ya se aplicó, mostrar un mensaje indicando que ya se utilizó
    Swal.fire('Promoción ya utilizada', 'Esta promoción ya ha sido aplicada en tu carrito.', 'info');
  }
});