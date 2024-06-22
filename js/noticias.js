// Función para simular datos de clima
function simularClima() {
    // Generar valores aleatorios para temperatura (en grados Celsius)
    const temperatura = Math.floor(Math.random() * (40 - (-10) + 1)) + (-10);

    // Generar valores aleatorios para humedad (en porcentaje)
    const humedad = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

    // Generar valores aleatorios para velocidad del viento (en km/h)
    const velocidadViento = Math.floor(Math.random() * (50 - 5 + 1)) + 5;

    // Generar valores aleatorios para la descripción del clima
    const descripcionesClima = [
        "Despejado",
        "Nublado",
        "Parcialmente nublado",
        "Lluvioso",
        "Tormentas",
        "Neblina",
        "Nieve ligera",
        "Nieve intensa"
    ];
    const descripcion = descripcionesClima[Math.floor(Math.random() * descripcionesClima.length)];

    // Devolver un objeto con los datos simulados
    return {
        temperatura,
        humedad,
        velocidadViento,
        descripcion
    };
}

// Ejemplo de uso: Simular datos de clima
const datosClima = simularClima();
console.log(datosClima);

// Llenar los elementos HTML con los datos simulados
document.getElementById('temperatura').textContent = datosClima.temperatura;
document.getElementById('humedad').textContent = datosClima.humedad;
document.getElementById('velocidad-viento').textContent = datosClima.velocidadViento;
document.getElementById('descripcion').textContent = datosClima.descripcion;

