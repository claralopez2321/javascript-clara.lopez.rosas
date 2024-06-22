// Obtener el elemento h1 mediante getElementsByClassName
const [titulo] = document.getElementsByClassName('titulo1');

// Definir una función para cambiar el estilo del texto
const animarTitulo = () => titulo.style.color = titulo.style.color === 'blue' ? 'red' : 'blue';

// Llamar a la función animarTitulo() cada 1 segundo
setInterval(animarTitulo, 1000);

// Array para almacenar los elementos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en LocalStorage
const guardarCarritoEnLocalStorage = () => localStorage.setItem('carrito', JSON.stringify(carrito));

// Función para agregar un producto al carrito
const agregarAlCarrito = (precio, descripcion) => {
  carrito = [...carrito, { precio, descripcion }];
  guardarCarritoEnLocalStorage();
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

// Función para limpiar el carrito
const limpiarCarrito = () => {
  carrito = [];
  guardarCarritoEnLocalStorage();
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

// Función para mostrar la promoción en SweetAlert2
const mostrarPromocion = promocion => {
  Swal.fire({
    title: promocion.titulo,
    text: promocion.descripcion,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Agregar al carrito',
    cancelButtonText: 'Cancelar'
  }).then(({ isConfirmed }) => {
    if (isConfirmed) agregarPromocionAlCarrito(promocion);
  });
};

// Función para agregar promociones al carrito
const agregarPromocionAlCarrito = promocion => {
  const descripcion = `${promocion.titulo}: ${promocion.descripcion}`;
  agregarAlCarrito(promocion.precio, descripcion);
};

// Función para manejar la lógica de mostrar la promoción
const manejarPromocion = (boton, promocion) => boton.addEventListener("click", () => mostrarPromocion(promocion));

// Obtener los botones de las promociones
const botonPromocion1 = document.getElementById("boton-promocion1");
const botonPromocion2 = document.getElementById("boton-promocion2");

// Ejecutar la lógica para manejar cada botón y su respectiva promoción
manejarPromocion(botonPromocion1, promocion1);
manejarPromocion(botonPromocion2, promocion2);

//---------alert promo 3

// Objeto para la promoción 3
const promocion3 = {
  titulo: "Promoción primer compra",
  descripcion: "Si es tu primera compra, tendrás el 50% de descuento en tu carrito!",
  aplicada: localStorage.getItem('promocion3Aplicada') === 'true', // Verificar si ya fue aplicada
  aplicarDescuento() {
    if (!this.aplicada) {
      // Aplicar descuento del 50% al carrito
      carrito = carrito.map(item => ({ ...item, precio: item.precio * 0.5 }));
      guardarCarritoEnLocalStorage();
      mostrarCarrito();
      this.aplicada = true;
      localStorage.setItem('promocion3Aplicada', 'true'); // Marcar como aplicada en localStorage
      console.log("Descuento del 50% aplicado al carrito.");
    } else {
      console.log("Promoción ya aplicada anteriormente.");
      Swal.fire('Promoción ya aplicada', 'No puedes aplicar esta promoción más de una vez.', 'error');
    }
  }
};

// Función para mostrar SweetAlert2 con la promoción 3
const mostrarPromocion3 = () => {
  Swal.fire({
    title: promocion3.titulo,
    text: promocion3.descripcion,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Es mi primera compra!',
    cancelButtonText: 'No es mi primera compra'
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      // Usuario confirma que es su primera compra
      promocion3.aplicarDescuento();
      if (!promocion3.aplicada) {
        Swal.fire('¡Promoción aplicada!', 'Descuento del 50% aplicado en tu carrito.', 'success');
      }
    }
  });
};

// Obtener el botón de la promoción 3
const botonPromocion3 = document.getElementById("boton-promocion3");

// Ejecutar la lógica para manejar el botón de la promoción 3
botonPromocion3.addEventListener("click", mostrarPromocion3);


//----sorteo

// Definir función para realizar el sorteo
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
}

const productos = [
  { nombre: "Viajes inolvidables", precio: 10 },
  { nombre: "Fiestas únicas", precio: 15 },
  { nombre: "Días para recordar", precio: 20 },
];

// Función para mostrar productos
const mostrarProductos = productosAMostrar => {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  productosAMostrar.forEach(producto => {
    const elemento = document.createElement("p");
    elemento.textContent = `Producto: ${producto.nombre}, Precio: $${producto.precio} USD`;
    resultados.appendChild(elemento);
  });

  if (productosAMostrar.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron resultados.";
    resultados.appendChild(mensaje);
  }
};

// Función para realizar la búsqueda
const buscar = () => {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const productosCoincidentes = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(query)
  );
  mostrarProductos(productosCoincidentes);
};

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const botonBuscar = document.getElementById("botonBuscar");

  // Mostrar todos los productos cuando el usuario pone el cursor en el input
  searchBar.addEventListener("focus", () => mostrarProductos(productos));

  // Asociar la función buscar al evento de entrada en el input de búsqueda
  searchBar.addEventListener("input", buscar);

  // Asociar la función buscar al evento de clic en el botón de búsqueda
  botonBuscar.addEventListener("click", buscar);
});

//----------- Sweet alert btn comprar

// Obtener el botón de comprar por su ID y agregar evento de clic
const btnComprar = document.getElementById('comprar');

btnComprar.addEventListener('click', () => {
  if (carrito.length > 0) {
    Swal.fire({
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
        // Aquí puedes manejar el email (enviarlo a un servidor, etc.)
        // Por ahora solo mostraremos un mensaje con el email ingresado
        return new Promise(resolve => {
          setTimeout(() => resolve(email), 2000); // Simular una operación asincrónica
        });
      }
    }).then(({ isConfirmed, value: email }) => {
      if (isConfirmed) {
        // Aquí puedes continuar con lo que necesites hacer con el email
        console.log(`Email del usuario: ${email}`);

        // Calcular el total de la compra
        const total = carrito.reduce((acc, item) => acc + item.precio, 0);
        console.log(`Monto de la compra: $${total} USD`);

        Swal.fire({
          title: 'Gracias!',
          html: `Hemos enviado la factura a <strong>${email}</strong>.`,
          icon: 'success'
        });
        // Limpiar carrito después de la compra
        carrito = [];
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
        cerrarCarrito();
      }
    });
  } else {
    Swal.fire('El carrito está vacío.', '', 'error');
  }
});

// Mostrar carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);

//---- clima

// Función para simular datos de clima
const simularClima = () => ({
  temperatura: Math.floor(Math.random() * 51) - 10, // Generar valores aleatorios para temperatura (en grados Celsius)
  humedad: Math.floor(Math.random() * 81) + 20, // Generar valores aleatorios para humedad (en porcentaje)
  velocidadViento: Math.floor(Math.random() * 46) + 5, // Generar valores aleatorios para velocidad del viento (en km/h)
  descripcion: [
    "Despejado", "Nublado", "Parcialmente nublado", "Lluvioso", 
    "Tormentas", "Neblina", "Nieve ligera", "Nieve intensa"
  ][Math.floor(Math.random() * 8)] // Generar valores aleatorios para la descripción del clima
});

// Ejemplo de uso: Simular datos de clima
const datosClima = simularClima();
console.log(datosClima);

// Llenar los elementos HTML con los datos simulados
document.getElementById('temperatura').textContent = datosClima.temperatura;
document.getElementById('humedad').textContent = datosClima.humedad;
document.getElementById('velocidad-viento').textContent = datosClima.velocidadViento;
document.getElementById('descripcion').textContent = datosClima.descripcion;
