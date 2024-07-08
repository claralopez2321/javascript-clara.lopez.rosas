// noticias.js
// Función para obtener noticias desde la API de Google News (Argentina)
const obtenerNoticias = async () => {
  const apiKey = 'ee448611893848f39d508fad6c4f8f3f';
  const url = `https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      mostrarNoticias(data.articles.slice(0, 6)); // Mostrar solo las primeras 6 noticias
    } else {
      console.error('No se encontraron artículos.');
      mostrarError();
    }
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    mostrarError();
  }
};

// Función para mostrar las noticias en el HTML
const mostrarNoticias = (noticias) => {
  const noticiasContainer = document.getElementById('noticias-container');
  noticiasContainer.innerHTML = ''; // Limpiar el contenido actual

  noticias.forEach((noticia, index) => {
    const { title, description, url } = noticia;
    const article = document.createElement('div');
    article.classList.add('card', 'mb-3');
    article.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a href="${url}" target="_blank" class="btn btn-primary">Leer más</a>
      </div>
    `;
    noticiasContainer.appendChild(article);

    if (index < noticias.length - 1) {
      noticiasContainer.appendChild(document.createElement('hr')); // Separador entre noticias
    }
  });
};

// Función para mostrar un mensaje de error si falla la carga de noticias
const mostrarError = () => {
  const noticiasContainer = document.getElementById('noticias-container');
  noticiasContainer.innerHTML = '<p>Se produjo un error al cargar las noticias.</p>';
};

// Cargar las noticias al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNoticias);


