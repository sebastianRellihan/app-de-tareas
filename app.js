const tareas = require('./funciones');
const chalk = require('chalk');

let accion = process.argv[2];
let parametros = process.argv.slice(3)

let nombre = 'APLICACION DE TAREAS';
let subrayado = '-'.repeat(nombre.length);
console.log(chalk.inverse(nombre));
console.log(chalk.inverse(subrayado));
console.log(' '.repeat(nombre.length));

switch (accion) {
    // Si no se ingresa nada en la terminal
    case undefined: 
        console.log(chalk.black.bgYellow('Tenes que ingresar un parametro en la consola >'));
        break;
    // Si se ingresa la accion 'todas' le lista todas las tareas con sus titulos y sus respectivos estados 
    case 'todas': 
        tareas.todas()
        break;
    // Si se ingresa la accion 'pendientes' le lista todas las tareas que estan en estado Pendiente
    case 'pendientes':
        tareas.pendientes();
        break;
    // Si se ingresa la accion 'progreso' lista todas las tareas en estado En progreso
    case 'progreso':
        tareas.progreso();
        break;   
    // Si se ingresa la accion 'terminadas' lista todas las tareas en estado Terminado
    case 'terminadas':
        tareas.terminadas();
        break;    
    // Si se ingresa la accion 'crear', seguido de tres parametros opcionales mas (titulo, descripcion, estado), puede crear una nueva tarea.
    case 'crear':  
        tareas.crear(parametros[0], parametros[1], parametros[2])    
        break;  
    // Si se ingresa la accion 'borrar', seguido de un parametro (titulo), puede borrar una tarea.
    case 'borrar':
        tareas.borrar(parametros[0]);
        break;
    // Si se ingresa la accion 'listar', unicamente, se listaran todas las tareas de la misma forma que funciona la accion 'todas' mas arriba. 
    // Si se ingresa la accion 'listar', seguido de un parametro mas (estado), puede listar todas las tareas que esten en el estado que requerimos. 
    case 'listar':
        tareas.listar(parametros[0]);
        break;
    // Si se ingresa la accion 'completar', seguido de un parametro mas (titulo), puede completar una tarea, cambiandole el estado a Terminado
    case 'completar':
        tareas.completar(parametros[0]);
        break;
    // Si se ingresa la accion 'detalle', seguido de un parametro (titulo), puede ver todas las propiedades de nuestra tarea
    case 'detalle': 
        tareas.detalle(parametros[0]);
        break;
    // Si se ingresa un parametro desconocido devolvera este mensaje
    default:
        console.log(chalk.black.bgYellow('Perdon, pero no entiendo esa accion'));         
        break;
}
