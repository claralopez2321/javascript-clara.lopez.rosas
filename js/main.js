// Obtener el elemento h1 mediante getElementsByClassName
const [titulo] = document.getElementsByClassName('titulo1');

// Función para cambiar el estilo del texto con azúcar sintáctico
const animarTitulo = () => {
  titulo.style.color = titulo.style.color === 'blue' ? 'red' : 'blue';
};

// Llamar a la función animarTitulo() cada 1 segundo con setInterval
setInterval(animarTitulo, 1000);

// Array para almacenar los elementos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en LocalStorage de forma asíncrona
const guardarCarritoEnLocalStorage = async () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para agregar un producto al carrito de forma asíncrona
const agregarAlCarrito = async (precio, descripcion) => {
  carrito = [...carrito, { precio, descripcion }];
  await guardarCarritoEnLocalStorage();
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
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.descripcion}: $${item.precio} USD`;
    listaCarrito.appendChild(li);
  });

  // Calcular el total
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalCarrito.textContent = `Total: $${total} USD`;
};

// Función para limpiar el carrito de forma asíncrona
const limpiarCarrito = async () => {
  carrito = [];
  await guardarCarritoEnLocalStorage();
  mostrarCarrito();
};

// Función para abrir el carrito
const abrirCarrito = () => document.getElementById('carrito-lateral').classList.add('visible');

// Función para cerrar el carrito
const cerrarCarrito = () => document.getElementById('carrito-lateral').classList.remove('visible');

// Obtener el botón de limpiar carrito por su ID y agregar evento de clic
document.getElementById('limpiar-carrito').addEventListener('click', limpiarCarrito);

// Obtener el botón de cerrar carrito por su ID y agregar evento de clic
document.getElementById('cerrar-carrito').addEventListener('click', cerrarCarrito);

// Obtener el botón de abrir carrito por su ID y agregar evento de clic
document.getElementById('carrito-button').addEventListener('click', abrirCarrito);

// Obtener todos los botones de agregar al carrito por su clase y agregar evento de clic
document.querySelectorAll('.btn.btn-primary.bg-warning').forEach(boton => {
  boton.addEventListener('click', () => {
    const [_, precio] = boton.textContent.trim().split(' ').slice(1);
    const descripcion = boton.parentElement.querySelector('h5').textContent.trim();
    agregarAlCarrito(parseFloat(precio), descripcion);
  });
});

//----------------------------------

// Definir las promociones como objetos literales
const promocion1 = {
  titulo: "Promoción 1",
  descripcion: "¡Aprovecha nuestra oferta especial de edición de fotografías! ¡Transforma tus imágenes en obras de arte digitales por 50 usd!.",
  precio: 50
};

const promocion2 = {
  titulo: "Promoción 2",
  descripcion: "¿Necesitas un logotipo único y memorable para tu negocio? Con nuestra promoción especial de diseño de logotipo, obtén un diseño profesional por solo 100 USD.",
  precio: 100
};

// Función para mostrar la promoción con SweetAlert2 de forma asíncrona
const mostrarPromocion = async (promocion) => {
  const { isConfirmed } = await Swal.fire({
    title: promocion.titulo,
    text: promocion.descripcion,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Agregar al carrito',
    cancelButtonText: 'Cancelar'
  });

  if (isConfirmed) {
    await agregarAlCarrito(promocion.precio, `${promocion.titulo}: ${promocion.descripcion}`);
  }
};

// Función para manejar la lógica de mostrar la promoción
const manejarPromocion = (boton, promocion) => boton.addEventListener("click", () => mostrarPromocion(promocion));

// Obtener los botones de las promociones por su ID y ejecutar la lógica para cada uno
const botonPromocion1 = document.getElementById("boton-promocion1");
const botonPromocion2 = document.getElementById("boton-promocion2");

manejarPromocion(botonPromocion1, promocion1);
manejarPromocion(botonPromocion2, promocion2);

//---------alert promo 3

// Objeto para la promoción 3 con aplicarDescuento como método
const promocion3 = {
  titulo: "Promoción primer compra",
  descripcion: "Si es tu primera compra, tendrás el 50% de descuento en tu carrito!",
  aplicada: localStorage.getItem('promocion3Aplicada') === 'true',

  // Método para aplicar el descuento de forma asíncrona
  async aplicarDescuento() {
    if (!this.aplicada) {
      carrito = carrito.map(item => ({ ...item, precio: item.precio * 0.5 }));
      await guardarCarritoEnLocalStorage();
      mostrarCarrito();
      this.aplicada = true;
      localStorage.setItem('promocion3Aplicada', 'true');
      Swal.fire('¡Promoción aplicada!', 'Descuento del 50% aplicado en tu carrito.', 'success');
    } else {
      Swal.fire('Promoción ya aplicada', 'No puedes aplicar esta promoción más de una vez.', 'error');
    }
  }
};

// Función para mostrar la promoción 3 con SweetAlert2 de forma asíncrona
const mostrarPromocion3 = async () => {
  const { isConfirmed } = await Swal.fire({
    title: promocion3.titulo,
    text: promocion3.descripcion,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Es mi primera compra!',
    cancelButtonText: 'No es mi primera compra'
  });

  if (isConfirmed) {
    await promocion3.aplicarDescuento();
  }
};

// Obtener el botón de la promoción 3 por su ID y agregar evento de clic
const botonPromocion3 = document.getElementById("boton-promocion3");
botonPromocion3.addEventListener("click", mostrarPromocion3);

//----sorteo

// Función para realizar el sorteo
const realizarSorteo = () => {
  const userNumber = parseInt(document.getElementById("userNumber").value);
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const resultadoSorteo = document.getElementById("resultadoSorteo");

  // Mostrar el número sorteado en el elemento resultadoSorteo
  resultadoSorteo.innerHTML = `Número sorteado: ${randomNumber}`;

  // Verificar si el número ingresado por el usuario coincide con el número sorteado
  resultadoSorteo.innerHTML += userNumber === randomNumber ?
    "<br><strong>Ganaste el 40% de descuento!</strong>" :
    "<br><strong>Mala suerte!</strong>";
};

const productos = [
  { nombre: "Viajes inolvidables", precio: 10 },
  { nombre: "Fiestas únicas", precio: 15 },
  { nombre: "Días para recordar", precio: 20 },
];

// Función para mostrar productos de forma asíncrona
const mostrarProductos = async (productosAMostrar) => {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  productosAMostrar.forEach(producto => {
    const elemento = document.createElement("p");
    elemento.textContent = `Producto: ${producto.nombre}, Precio: $${producto.precio} USD`;
    resultados.appendChild(elemento);
  });

  if (productosAMostrar.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay productos disponibles con ese precio.";
    resultados.appendChild(mensaje);
  }
};

// Función para manejar el cambio en el campo de texto y buscar productos
const manejarCambioPrecio = async (event) => {
  const precioMaximo = parseInt(event.target.value);
  if (isNaN(precioMaximo)) {
    await mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);
    await mostrarProductos(productosFiltrados);
  }
};

// Obtener el campo de texto para filtrar por precio y agregar evento de cambio
const campoPrecio = document.getElementById("precioMaximo");
campoPrecio.addEventListener("input", manejarCambioPrecio);

//----------- Sweet alert btn comprar

// Obtener el botón de comprar por su ID y agregar evento de clic
const btnComprar = document.getElementById('comprar');
btnComprar.addEventListener('click', async () => {
  if (carrito.length > 0) {
    const { isConfirmed, value: email } = await Swal.fire({
      title: 'Gracias por su compra!',
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Introduce tu email">
        <p>Introduce tu email para mandar tu factura y para que nuestros diseñadores comiencen a trabajar contigo.</p>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: false,
      showCloseButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const email = document.getElementById('email').value;
        return new Promise(resolve => {
          setTimeout(() => resolve(email), 2000); // Simular una operación asincrónica
        });
      }
    });

    if (isConfirmed) {
      const total = carrito.reduce((acc, item) => acc + item.precio, 0);

      Swal.fire({
        title: 'Gracias!',
        html: `Hemos enviado la factura a <strong>${email}</strong>.`,
        icon: 'success'
      });

      carrito = [];
      await guardarCarritoEnLocalStorage();
      mostrarCarrito();
      cerrarCarrito();
    }
  } else {
    Swal.fire('El carrito está vacío.', '', 'error');
  }
});

// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);

