import React, { useContext } from 'react'
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const SelectTipoAsentamiento = (props) => {
    const catsContext = useContext(catalogosContext)
    /* componente que extrae */
    const { name, className, onChange } = props

    const data = catsContext.catalogos.tipos_asentamientos

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.cve_tipo_asen} value={item.cve_tipo_asen}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectTipoAsentamiento;