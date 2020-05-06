let fs = require('fs')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createSingle = () => {
    rl.question('Ingrese el nombre de su Single:\t', (name) => {
        if (name) {
            const nombre = capitalizarNombre(name)
            fs.writeFile(`./src/singles/${nombre}.jsx`, src(nombre), function (err) {
                if (err) throw err;

                console.log(`Single Creado con exito en la carpeta :'`);
                console.log('\x1b[33m%s\x1b[0m', `${__dirname}\\src\\singles\\${nombre}.jsx`);
            });
            console.log(`Single:${nombre} creado con éxito`);
            rl.close();
        } else {
            return
        }
    });
}

const src = (nombre) => {
    return (
        `import React from 'react'

const ${nombre} = props => {
    const { /* indique las propiedades del single */ } = props
    return (
        <h1>${nombre}</h1>
    );
}

export default ${nombre};`
    );
}

const capitalizarNombre = (nombre) => {
    const capital = nombre.charAt(0).toUpperCase()
    const rest = nombre.slice(1, nombre.length).toLowerCase()
    return capital + rest
}

createSingle();







