import React, { useEffect, useState } from 'react'
import AlertError from './AlertError';

const SelectTipoPersona = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [''])

    const getData = () => {
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}catalogos/tipos_solicitantes/personalidades_juridicas/1`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
            .catch(error => {
                AlertError(`Error al cargar ${name} `, error)
                console.log('error', error)
            });
    }

    /* componente que extrae */
    const { name, className, onChange } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectTipoPersona;