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
    case undefined: 
        console.log(chalk.black.bgYellow('Tenes que ingresar un parametro en la consola >'));
        break;
    case 'todas': 
        tareas.todas()
        break;
    case 'pendientes':
        tareas.pendientes();
        break;
    case 'progreso':
        tareas.progreso();
        break;    
    case 'terminadas':
        tareas.terminadas();
        break;    
    case 'crear':  
        tareas.crear(parametros[0], parametros[1], parametros[2])    
        break;  
    case 'borrar':
        tareas.borrar(parametros[0]);
        break;
    case 'listar':
        tareas.listar(parametros[0]);
        break;
    case 'completar':
        tareas.completar(parametros[0]);
        break;
    case 'detalle': 
        tareas.detalle(parametros[0]);
        break;
    default:
        console.log(chalk.black.bgYellow('Perdon, pero no entiendo esa accion'));         
        break;
}
