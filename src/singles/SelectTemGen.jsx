import React, { useContext } from 'react'
import catalogosContext from "./../context/catalogos/catalogosContext";


const SelectTemGen = (props) => {
    const catsContext = useContext(catalogosContext)
    const { name, className, onChange, key } = props
    const data = catsContext.catalogos.terminos_genericos

    return (
        <select
            key={key}
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.cve_tipo_asen} value={item.cve_tipo_asen}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectTemGen;