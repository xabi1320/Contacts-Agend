const formularioContactos = document.querySelector('#contact'),
    listadoContactos = document.querySelector('#listing-contacts tbody'),
    inputBuscador = document.querySelector('#search');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar contacto
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    //Buscador
    if (inputBuscador) {
        inputBuscador.addEventListener('input', buscarContactos);
    }

    //Contador de contactos
    numeroContactos();
}

function leerFormulario(e) {
    //se recomienda colocarse cuando se utiliza un form con submit para prevenir el evento siempre
    e.preventDefault();

    //Leer Datos  de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#tel').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //Pasa la validacion llamado ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // console.log(...infoContacto);

        if (accion === 'crear') {
            //Crearemos nuevo contacto
            insertarBD(infoContacto);
        } else if (accion === 'editar') {
            //Editar el contacto
            //Leer el id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}
//Inserta en la base de datos via AJAX
function insertarBD(datos) {
    //llamado a ajax

    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    //pasar los datos
    xhr.onload = function() {
            if (this.status === 200) {
                //Leemos Respuesta
                const respuesta = JSON.parse(xhr.responseText);

                //Inserta un nuevo elemento en la tabla
                const nuevoContacto = document.createElement('tr');

                nuevoContacto.innerHTML = `
                    <td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.empresa}</td>
                    <td>${respuesta.datos.telefono}</td>
                `;

                //Crear contenedor para botones
                const contenedorAcciones = document.createElement('td');

                //Crear el icono  de editar
                const iconoEditar = document.createElement('i');
                iconoEditar.classList.add('fas', 'fa-pen-square');

                // Crear el enlace para editar
                const btnEditar = document.createElement('a');
                btnEditar.appendChild(iconoEditar);
                btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
                btnEditar.classList.add('btn', 'btn-edit');

                //Agregando al padre
                contenedorAcciones.appendChild(btnEditar);

                //crear el icono de eliminar
                const iconoEliminar = document.createElement('i');
                iconoEliminar.classList.add('fas', 'fa-trash-alt');

                //Crear boton de eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.appendChild(iconoEliminar);
                btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
                btnEliminar.classList.add('btn', 'btn-delete');

                //agregarlo al padre
                contenedorAcciones.appendChild(btnEliminar);

                //Agregarlo al tr
                nuevoContacto.appendChild(contenedorAcciones);

                //Agregarlos en los contactos
                listadoContactos.appendChild(nuevoContacto);

                //Resetear formulario
                document.querySelector('form').reset();

                //mostrar  notificacion
                mostrarNotificacion('Contacto creado correctamente', 'correcto');

                //actualizar numero
                numeroContactos();
            }
        }
        //enviar los datos
    xhr.send(datos);
}

function actualizarRegistro(datos) {
    //Crear objeto
    const xhr = new XMLHttpRequest;

    //Abrir conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    //leer la respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);

                if (respuesta.respuesta === 'correcto') {
                    //mostrar notificacion de correcto
                    mostrarNotificacion('Contacto editado correctamente', 'correcto');
                } else {
                    //Hubo un Error
                    mostrarNotificacion('Hubo un error...', 'error');
                }

                //Despues de 3 segundos redireccionar
                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 4000);
            }
        }
        //Enviar la peticion
    xhr.send(datos);

}
//Eliminar el contacto
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-delete')) {
        //tomar ID
        const id = e.target.parentElement.getAttribute('data-id');

        // console.log(id);
        //Preguntar al usuario
        const respuesta = confirm('Estás Seguro(a) ?');

        if (respuesta) {
            //Llamado a ajax
            //Crear objeto
            const xhr = new XMLHttpRequest();

            //Abrir Coenexion
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            //Leer respuesta
            xhr.onload = function() {
                if (this.status == 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta == 'correcto') {
                        //eliminar registro del DOM
                        // console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();
                        //mostrar notificacion
                        mostrarNotificacion('Contacto Eliminado', 'correcto');
                        //actualizar numero
                        numeroContactos();
                    } else {
                        //Mostramos notificacion
                        mostrarNotificacion('Hubo un Error...', 'error');
                    }
                }
            }

            //Enviar la peticion
            xhr.send();
        }
    }
}

//Notificacion en pantalla
function mostrarNotificacion(mesanje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'shadow');
    notificacion.textContent = mesanje;

    //Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}

//Buscador de registros
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"),
        registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';

        console.log(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1);
        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }

        numeroContactos();
    })

}

//Muestra  el numero de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contacts span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });
    // console.log(total);

    contenedorNumero.textContent = total;
}