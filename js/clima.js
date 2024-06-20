// Función para mostrar los datos del clima
function mostrarClima(data) {
    const climaContainer = document.getElementById('clima-info');
    // Actualizar el contenido del elemento con los datos del clima
    climaContainer.innerHTML = `Clima en Santa Fe, Argentina: ${data.current.condition.text}, Temperatura: ${data.current.temp_c}°C`;
    console.log('Datos del clima mostrados:', data);
}

// Obtener el clima en Santa Fe, Argentina
function obtenerClima() {
    // URL de la API del clima
    const apiKey = 'f943f9772d5c4c21b0d122509242006';  // Tu clave API
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Santa%20Fe,AR&aqi=no`;
    console.log('Solicitando datos del clima...');
    // Hacer una solicitud GET a la API del clima
    fetch(url)
        .then(response => {
            console.log('Respuesta de la API recibida:', response);
            return response.json();
        })
        .then(data => {
            // Llamar a la función mostrarClima para mostrar los datos del clima
            mostrarClima(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
        });
}

// Llamar a la función obtenerClima cuando se cargue la página
window.onload = obtenerClima;
