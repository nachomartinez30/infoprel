import React  from 'react'

const SelectEstados = (props) => {

    const { name, className, onChange, onBlur, data } = props

    return (
        <select
            className={className}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value=''>--Seleccione--</option>

            {typeof data != 'undefined' && data.map((item) => <option key={item.cve_ent} value={item.cve_ent}>{item.nom_ent}</option>)}
        </select>
    );
}

export default SelectEstados;