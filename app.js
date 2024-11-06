document.addEventListener('DOMContentLoaded', () => {
    const registrarBtn = document.getElementById('registrar-btn');
    const actualizarBtn = document.getElementById('actualizar-btn');
    const filtroEstatus = document.getElementById('filtro-estatus');
    const tablaCuerpo = document.getElementById('tabla-cuerpo');

    registrarBtn.addEventListener('click', registrarRemision);
    actualizarBtn.addEventListener('click', actualizarTarea);
    filtroEstatus.addEventListener('change', filtrarTareas);

    function registrarRemision() {
        try {
            const remitenteNombre = document.getElementById('remitente-nombre').value;
            const destinatarioNombre = document.getElementById('destinatario-nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const peso = document.getElementById('peso').value;
            const dimensiones = document.getElementById('dimensiones').value;
            const fechaSalida = document.getElementById('fecha-salida').value;
            const fechaLlegada = document.getElementById('fecha-llegada').value;
            const precio = document.getElementById('precio').value;

            if (!remitenteNombre || !destinatarioNombre || !descripcion || !peso || !dimensiones || !fechaSalida || !fechaLlegada || !precio) {
                throw new Error("Por favor, complete todos los campos.");
            }

            const fila = document.createElement('tr');
            const estatus = "En progreso"; // Valor por defecto
            const comentarios = "";

            [remitenteNombre, destinatarioNombre, descripcion, peso, dimensiones, fechaSalida, fechaLlegada, precio, estatus, comentarios].forEach(texto => {
                const celda = document.createElement('td');
                celda.textContent = texto;
                fila.appendChild(celda);
            });

            tablaCuerpo.appendChild(fila);
            limpiarCampos();
        } catch (error) {
            alert(error.message);
        }
    }

    function filtrarTareas() {
        const estatusSeleccionado = filtroEstatus.value;
        const filas = tablaCuerpo.querySelectorAll('tr');

        filas.forEach(fila => {
            const estatus = fila.cells[8].textContent; // Columna de estatus
            try {
                if (estatusSeleccionado === 'Todos' || estatus === estatusSeleccionado) {
                    fila.style.display = ''; // Mostrar fila
                } else {
                    fila.style.display = 'none'; // Ocultar fila
                }
            } catch (error) {
                console.error("Error al filtrar las tareas:", error);
            }
        });
    }

    function actualizarTarea() {
        try {
            const estatusModificar = document.getElementById('estatus-modificar').value;
            const nuevoComentario = document.getElementById('nuevo-comentario').value;
            const filas = tablaCuerpo.querySelectorAll('tr');
            const seleccionada = Array.from(filas).find(fila => fila.classList.contains('seleccionada'));

            if (seleccionada) {
                seleccionada.cells[8].textContent = estatusModificar; // Actualizar estatus
                if (nuevoComentario) {
                    const fecha = new Date().toLocaleString();
                    const comentariosExistentes = seleccionada.cells[9].textContent;
                    seleccionada.cells[9].textContent = comentariosExistentes ? `${fecha}: ${nuevoComentario}, ${comentariosExistentes}` : `${fecha}: ${nuevoComentario}`;
                }
                limpiarCampos();
            } else {
                alert("Por favor, selecciona una tarea para actualizar.");
            }
        } catch (error) {
            alert("Error al actualizar la tarea: " + error.message);
        }
    }

    function limpiarCampos() {
        document.getElementById('remitente-nombre').value = '';
        document.getElementById('destinatario-nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('dimensiones').value = '';
        document.getElementById('fecha-salida').value = '';
        document.getElementById('fecha-llegada').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('nuevo-comentario').value = '';
    }

    // Seleccionar fila de la tabla
    tablaCuerpo.addEventListener('click', (event) => {
        if (event.target.tagName === 'TD') {
            const fila = event.target.parentNode;
            fila.classList.toggle('seleccionada');
        }
    });
});
