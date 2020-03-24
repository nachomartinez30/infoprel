const extractInfoCurp = (curp) => {
    const anio = curp.substr(4, 2)
    const mes = curp.substr(6, 2)
    const dia = curp.substr(8, 2)
    const sexo = curp.substr(10, 1)
    const nacionalidad = 1
    return ({
        anio,
        mes,
        dia,
        sexo,
        nacionalidad
    });
}

export default extractInfoCurp;