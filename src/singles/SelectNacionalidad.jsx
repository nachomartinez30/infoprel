import React, { useEffect, useState } from 'react'
import AlertError from './AlertError';

const SelectNacionalidad = (props) => {

    const [nacionalidad, setNacionalidad] = useState([])

    useEffect(() => {
        getData();
    }, [''])

    const getData = () => {
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}catalogos/nacionalidades`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setNacionalidad(result.nacionalidades)
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
            {nacionalidad.map(item => <option key={item.id} value={item.clave}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectNacionalidad;