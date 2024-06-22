document.addEventListener('DOMContentLoaded', function() {
    const formularioContacto = document.querySelector('.form-contacto');

    // Función para guardar los datos del formulario en localStorage
    const guardarDatosEnLocalStorage = () => {
        const datosFormulario = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value,
            planSeleccionado: document.querySelector('input[name="plan"]:checked').value
        };

        // Convertir los datos a formato JSON y guardar en localStorage
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    };

    // Función para mostrar los datos del formulario guardados en consola
    const mostrarDatosGuardados = () => {
        const datosGuardados = localStorage.getItem('datosFormulario');

        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            console.log('Datos del formulario almacenados:');
            console.log('Nombre:', datos.nombre);
            console.log('Correo:', datos.correo);
            console.log('Teléfono:', datos.telefono);
            console.log('Mensaje:', datos.mensaje);
            console.log('Plan seleccionado:', datos.planSeleccionado);
        } else {
            console.log('Aún no hay datos del formulario almacenados.');
        }
    };

    // Mostrar los datos guardados al cargar la página
    mostrarDatosGuardados();

    formularioContacto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Guardar los datos del formulario en localStorage
        guardarDatosEnLocalStorage();

        // Mostrar los datos en consola
        mostrarDatosGuardados();

        // Opcional: limpiar el formulario después de guardar los datos
        formularioContacto.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formularioContacto = document.querySelector('.form-contacto');

    // Función para guardar los datos del formulario en localStorage
    const guardarDatosEnLocalStorage = () => {
        const datosFormulario = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value,
            planSeleccionado: document.querySelector('input[name="plan"]:checked').value
        };

        // Convertir los datos a formato JSON y guardar en localStorage
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    };

    // Función para mostrar SweetAlert y guardar los datos del formulario
    const enviarFormulario = () => {
        // Mostrar SweetAlert
        Swal.fire({
            title: '¡Gracias por enviar su solicitud!',
            text: 'En breve nos comunicaremos con usted.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            // Guardar los datos del formulario en localStorage
            guardarDatosEnLocalStorage();

            // Opcional: limpiar el formulario después de guardar los datos
            formularioContacto.reset();
        });
    };

    formularioContacto.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Llamar a la función para mostrar SweetAlert
        enviarFormulario();
    });
});

