//Fondo animado
$('.container').Geometryangle({
    mesh: {
        width: 1.6,
        height: 1.6,
        depth: 15,
        zoom:2,
        xRange: 0.8,
        yRange: 0.1,
        zRange: 1.5,
        ambient: 'rgba(0, 255, 50, 1)',
        diffuse: 'rgba(0, 255, 130, 1)',
        background: 'rgb(0, 0, 0)',
        speed: 0.0004,
    },
    line: {
        fill: "rgba(0, 0, 0, 0)",
    }
});
$('body').css('background', 'black')
//variables
const dropzone = document.querySelector('.dropzone');
const dropzoneText = dropzone.querySelector('h3');
const inputFile = dropzone.querySelector('#input-files');
const errorMsj = document.querySelector("#errorMsj");
const buttonUpload = document.querySelector('.btn-upload');
let archivos;
let archivosCargados = false;
//Funciones
function mostrarArchivos(archivos) { 
    if (archivos["length"] === 1) {
        analizarArchivos(archivos[0]); 
    } else {
        for (const archivo of archivos) {        
            analizarArchivos(archivo);
        }
    }
}
function listarArchivos(estado, nombre) {
    if (estado) {
        const parrafo = document.createElement("p");
        const text = document.createTextNode(nombre);
        parrafo.appendChild(text);
        document.getElementById("listaArchivos").appendChild(parrafo);
        dropzoneText.style.display = "none";
        document.getElementById("listaArchivos").style.display = "flex";
    } else {
        document.getElementById("listaArchivos").style.display = "none";
    }
}
function analizarArchivos(archivo) {
    const docType = archivo.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (validExtensions.includes(docType)) {
        archivosCargados = true;
        listarArchivos(true, archivo.name);
    } else {
        mensajeError(true);
    }
}
function subirArchivos() {
    if (archivosCargados) {
        document.getElementById("listaArchivos").style.display = "none";
        dropzoneText.style.display = "none";
        document.getElementById("enviadoMsj").style.display = "block";
        
    } else {
        mensajeError(true);
    }
}
function mensajeError(estado) {
    if (estado) {
        dropzoneText.style.display = "none";
        document.getElementById("listaArchivos").style.display = "none";
        document.getElementById("errorMsj").style.display = "block";
    } else {
        document.getElementById("errorMsj").style.display = "none";
        dropzoneText.style.display = "block";
        dropzoneText.textContent = ""
        location.reload();
    }
}
//Capturador de eventos del dropzone
inputFile.addEventListener("change", (e) => {
    archivos = this.files
    dropzone.classList.add("destacado");
    mostrarArchivos(archivos);
    dropzone.classList.remove("destacado");
})
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("destacado")
    dropzoneText.textContent = "Suelta tus archivos!"
})
dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropzone.classList.remove("destacado");
    dropzoneText.textContent = "Arrastra tus archivos aqui!"
})
dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    archivos = e.dataTransfer.files;
    mostrarArchivos(archivos);
    dropzone.classList.remove("destacado");
})




