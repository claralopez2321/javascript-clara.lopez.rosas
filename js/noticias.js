// noticias

// Función para obtener y mostrar las noticias
const mostrarNoticias = async () => {
  const apiKey = 'ee448611893848f39d508fad6c4f8f3f';
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
          const noticiasContainer = document.getElementById('noticias-container');

          // Limpiar contenido anterior
          noticiasContainer.innerHTML = '';

          // Mostrar solo las primeras 6 noticias
          const noticiasToShow = data.articles.slice(0, 6);

          // Mostrar cada noticia
          noticiasToShow.forEach(article => {
              const { title, description, url, urlToImage } = article;

              const card = `
                  <div class="col-md-4 mb-4">
                      <div class="card">
                          <img src="${urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="Imagen de la noticia">
                          <div class="card-body">
                              <h5 class="card-title">${title}</h5>
                              <p class="card-text">${description}</p>
                              <a href="${url}" target="_blank" class="btn btn-primary">Leer más</a>
                          </div>
                      </div>
                  </div>
              `;

              noticiasContainer.innerHTML += card;
          });
      } else {
          console.error('No se encontraron artículos.');
      }
  } catch (error) {
      console.error('Error al obtener noticias:', error);
  }
};

// Llamar a la función para mostrar noticias al cargar la página
document.addEventListener('DOMContentLoaded', mostrarNoticias);
