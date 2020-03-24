import React, { useContext } from 'react'
import catalogosContext from "./../context/catalogos/catalogosContext";


const SelectTipoVialidades = (props) => {
    const catsContext = useContext(catalogosContext)
    /* componente que extrae */
    const { name, className, onChange } = props
    
    const data = catsContext.catalogos.tipo_vialialidades

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.cve_tipo_vial} value={item.cve_tipo_vial}>{item.descripcion}</option>)}
        </select>
    );
}

export default SelectTipoVialidades;