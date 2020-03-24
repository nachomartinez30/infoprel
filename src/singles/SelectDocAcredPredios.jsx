import React, { useContext, useState, useEffect } from 'react'
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const SelectDocAcredPredios = (props) => {
    
    /* componente que extrae */
    const { name, className, onChange } = props
    const [data, setData] = useState([])


    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;



    useEffect(() => {
        fetch(`${API_REQUEST}catalogos/documentos_acreditacion_predios`)
            .then(response => response.json())
            .then(data => setData(data.data))
    }, [''])

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectDocAcredPredios;