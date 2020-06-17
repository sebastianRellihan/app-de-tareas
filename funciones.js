const fs = require('fs');
const chalk = require('chalk');

function leerArchivoJSON() {
    let tareasJson = fs.readFileSync('./tareas.json', 'utf-8');
    return JSON.parse(tareasJson);
}

let tareas = leerArchivoJSON();

// Microdesafío
// 1. Crear la funcion escribirArchivoJSON()
// - La función va a recibir un array
// - Van a convertir el array a JSON
// - Usando fs.writeFileSync van a escribir el archivo JSON
function escribirArchivoJSON(array) {
    let arrayJson = JSON.stringify(array, null, ' ');
    fs.writeFileSync('./tareas.json', arrayJson);
}

function todas() {
    tareas.forEach(element => {
        if(element.estado == 'Pendiente'){ 
            console.log(chalk.inverse(' ► ', element.titulo + ' - ') + chalk.black.bgRedBright('(' + element.estado + ')'));
        } else if(element.estado == 'En progreso') {
            console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgYellowBright('(' + element.estado + ')'));
        } else {
            console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgGreenBright('(' + element.estado + ')'));
        }
    });
}
function pendientes() {
    let filtroPendientes = tareas.filter(element => element.estado == 'Pendiente');
    filtroPendientes.forEach(element => {
        console.log(chalk.inverse(' ► ', element.titulo + ' - ') + chalk.black.bgRedBright('(' + element.estado + ')'));
    });
}

function progreso() {
    let filtroEnProgreso = tareas.filter(element => element.estado == 'En progreso');
    filtroEnProgreso.forEach(element => {
        console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgYellowBright('(' + element.estado + ')'));
    });
}

function terminadas() {
    let filtroTerminadas = tareas.filter(element => element.estado == 'Terminado');
    filtroTerminadas.forEach(element => {
        console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgGreenBright('(' + element.estado + ')'));
    });
}
// Microdesafío
// 1. Atajar el caso de 'crear'
// 2. Hacer un console.log() de el titulo y de la descripción
// 3. Crear un objeto literal a partir de lo que envía el usuario
// {
//     "titulo": "una nueva",
//     "descripcion": "con su descripción",
//     "estado": "pendiente"
//    }
function crear(titulo = '', descripcion = '', estado = 'Pendiente') {
    if (titulo.length > 5) {
        let tareaNueva = {
            titulo: titulo,
            descripcion: descripcion,
            estado: estado
        }
        tareas.push(tareaNueva);
        escribirArchivoJSON(tareas);
        console.log(chalk.bgGreenBright.black('¡Tarea creada con éxito!'));
    } else {
        console.log(chalk.bgYellowBright.black('Debes ingresar un título y debe tener al menos 5 caracteres'));
    }
}
// Micro desafío
// 1. Atajar el caso de 'borrar'
// 2. Vamos a recorrer el array de tareas
//  - usar filter()
// 3. Vamos a filtrar la tarea que corresponda
// 4. Vamos a guardar los cambios
function borrar(title) {
    let tareasActualizadas = tareas.filter(tareas => title !== tareas.titulo);   
    if (tareas.length !== tareasActualizadas.length) {
        escribirArchivoJSON(tareasActualizadas);
        console.log(chalk.bgGreenBright.black('¡Tarea borrada exitosamente!'));
    } else {
        console.log(chalk.bgYellowBright.black('No encontré la tarea que estas buscando :-/'));
    }
}
// Micro desafío
// 1. Crear función listar
// Toma como parámetro opcional el estado (pendientes, terminadas, etc)
// - Si llega el estado lista solo las de ese estado
// - Si no llega el estado, lista todas
function listar(estado) {
    switch (estado) {
        case undefined:
            tareas.forEach(element => {
                if(element.estado == 'Pendiente'){ 
                    console.log(chalk.inverse(' ► ', element.titulo + ' - ') + chalk.black.bgRedBright('(' + element.estado + ')'));
                } else if(element.estado == 'En progreso') {
                    console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgYellowBright('(' + element.estado + ')'));
                } else {
                    console.log(chalk.inverse(' ► ', element.titulo + ' - ' )+  chalk.black.bgGreenBright('(' + element.estado + ')'));
                }
            });
            break;
        case 'pendientes':
            pendientes();
            break;
        case 'en progreso':
            progreso();
            break;
        case 'terminadas':
            terminadas();
            break;
        default:
            console.log(chalk.bgYellowBright.black('Perdon, pero no reconozco ese estado :/'));
            break;
    }
}
// Micro desafío
// 1. Atajar el caso de 'completar'
// 2. Vamos a recorrer el array de tareas
//  - usar map()
//  - usar un if()
// 3. Vamos a modificar la tarea que corresponda
// 4. Vamos a guardar los cambios
function completar(title) {
    let completar = tareas.map(elemento => {
        if (elemento.titulo == title) {
            let completo = {
                titulo: elemento.titulo,
                descripcion: elemento.descripcion,
                estado: 'Terminado',
            }
            elemento = completo;
            console.log(chalk.bgGreenBright.black('Tarea completada!'));            
            return elemento;
        } else {                      
            return elemento;
        }
    });
    // Me di cuenta que si no se encontraba no estaba haiendo ni informando nada, entonces plantie lo siguiente
    if(completar != tareas) {
        escribirArchivoJSON(completar);
    }else {
        console.log(chalk.bgRedBright.black('No pude encontrar la tarea que queres completar')); // Por que no se imprime?????????
    }   
}
// Crear método detalle
// La función detalle toma un título por parámetro
// Busca la tarea por título (investiguen el método find() ;-))
// Si la encuenta muestra título, descripción y estado
// Si no la encuentra avisa al usuario
function detalle(title) {
    let find = tareas.find(element => element.titulo == title);
    if(find == undefined) {
        console.log(chalk.bgYellowBright.black('Perdon, pero no pude encontrar la tarea que buscas :('));
    } else {
        console.log(chalk.bgBlueBright.black('Titulo:', find.titulo));
        console.log(chalk.bgBlueBright.black('Descripcion:', find.descripcion));
        console.log(chalk.bgBlueBright.black('Estado:', find.estado));
    }
}
module.exports = {
    todas, // todas: todas // si el nombre de nuestra propiedad es igual al valor puede esribirse asi
    pendientes, // pendientes: pendientes
    progreso, // progreso: progresp
    terminadas, 
    crear,
    borrar,
    listar,
    completar,
    detalle
};
