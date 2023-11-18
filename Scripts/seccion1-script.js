// seccion1-script.js
const opinionesContainer = document.getElementById("opiniones-container");
const opinionesList = document.getElementById("opiniones-list");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const comentarioInput = document.getElementById("comentario");

let opinionesListArray = [];

function agregarOpinion() {
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const comentario = comentarioInput.value;

    if (nombre && apellido && comentario) {
        const nuevaOpinion = {
            nombre: nombre,
            apellido: apellido,
            comentario: comentario,
            id: opinionesListArray.length,
            eliminado: false,
        };

        opinionesListArray.push(nuevaOpinion);
        localStorage.setItem("OPINIONES", JSON.stringify(opinionesListArray));
        mostrarOpiniones();
        limpiarFormulario();
    }
}

function mostrarOpiniones() {
    opinionesList.innerHTML = "";
    opinionesListArray.forEach((opinion) => {
        if (!opinion.eliminado) {
            const opinionHTML = `
                <div class="opinion-item">
                    <p><strong>${opinion.nombre} ${opinion.apellido}:</strong> ${opinion.comentario}</p>
                    <img src="images/trashicon.png" alt="Eliminar" class="eliminar-icon" onclick="eliminarOpinion(${opinion.id})">
                </div>
            `;
            opinionesList.insertAdjacentHTML("beforeend", opinionHTML);
        }
    });
}


function eliminarOpinion(id) {
    opinionesListArray[id].eliminado = true;
    localStorage.setItem("OPINIONES", JSON.stringify(opinionesListArray));
    mostrarOpiniones();
}

function limpiarFormulario() {
    nombreInput.value = "";
    apellidoInput.value = "";
    comentarioInput.value = "";
}

// Cargar opiniones almacenadas localmente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const storedOpiniones = localStorage.getItem("OPINIONES");
    if (storedOpiniones) {
        opinionesListArray = JSON.parse(storedOpiniones);
        mostrarOpiniones();
    }
});
