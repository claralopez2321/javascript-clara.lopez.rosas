// Obtener el elemento h1 mediante getElementsByClassName
const [titulo] = document.getElementsByClassName('titulo1');

// Definir una función para cambiar el estilo del texto
const animarTitulo = () => titulo.style.color = titulo.style.color === 'blue' ? 'red' : 'blue';

// Llamar a la función animarTitulo() cada 1 segundo
setInterval(animarTitulo, 1000);

// Array para almacenar los elementos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en LocalStorage
const guardarCarritoEnLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

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
  guardarCarritoEnLocalStorage();
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
const mostrarPromocion = (promocion) => {
  Swal.fire({
    title: promocion.titulo,
    text: promocion.descripcion,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Agregar al carrito',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      agregarPromocionAlCarrito(promocion);
    }
  });
};

// Función para agregar promociones al carrito
const agregarPromocionAlCarrito = (promocion) => {
  const descripcion = `${promocion.titulo}: ${promocion.descripcion}`;
  agregarAlCarrito(promocion.precio, descripcion);
};

// Función para manejar la lógica de mostrar la promoción
const manejarPromocion = (boton, promocion) => {
  boton.addEventListener("click", () => mostrarPromocion(promocion));
};

// Obtener los botones de las promociones
const botonPromocion1 = document.getElementById("boton-promocion1");
const botonPromocion2 = document.getElementById("boton-promocion2");

// Ejecutar la lógica para manejar cada botón y su respectiva promoción
manejarPromocion(botonPromocion1, promocion1);
manejarPromocion(botonPromocion2, promocion2);

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

const productos = [
  { nombre: "Viajes inolvidables", precio: 10 },
  { nombre: "Fiestas únicas", precio: 15 },
  { nombre: "Días para recordar", precio: 20 },
];

// Función para mostrar productos
const mostrarProductos = (productosAMostrar) => {
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  productosAMostrar.forEach((producto) => {
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
  const input = document.getElementById("searchBar");
  const query = input.value.toLowerCase();

  const productosCoincidentes = productos.filter((producto) => 
      producto.nombre.toLowerCase().includes(query)
  );

  mostrarProductos(productosCoincidentes);
};

document.addEventListener("DOMContentLoaded", function() {
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
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000); // Simular una operación asincrónica
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = document.getElementById('email').value;
        // Aquí puedes continuar con lo que necesites hacer con el email
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


//noticiAS

document.addEventListener('DOMContentLoaded', function() {
  const noticiasContainer = document.getElementById('noticias-container');

  // URL de la API de noticias (reemplaza con tu propia URL)
  const apiKey = 'ee448611893848f39d508fad6c4f8f3f';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  // Realizar solicitud a la API de noticias
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          let noticias = data.articles.slice(0, 3); // Tomar solo las primeras 3 noticias

          // Reorganizar aleatoriamente las noticias
          noticias = shuffleArray(noticias);

          // Construir las tarjetas de noticias
          noticias.forEach(noticia => {
              const noticiaCard = `
                  <div class="col-md-4">
                      <div class="card noticia-card">
                          <img src="${noticia.urlToImage}" class="card-img-top" alt="Imagen de la noticia">
                          <div class="card-body">
                              <h5 class="card-title">${noticia.title}</h5>
                              <p class="card-text">${noticia.description}</p>
                              <a href="${noticia.url}" target="_blank" class="btn btn-primary">Leer más</a>
                          </div>
                      </div>
                  </div>
              `;
              noticiasContainer.innerHTML += noticiaCard;
          });
      })
      .catch(error => {
          console.error('Error al obtener noticias:', error);
      });

  // Función para reordenar aleatoriamente un array (Algoritmo de Fisher-Yates)
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
});
