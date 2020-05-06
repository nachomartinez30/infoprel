import React, { useEffect, useContext, useState } from 'react'
/* CONTEXT */
import apoyosContext from "../context/apoyos/apoyosContext";


const SelectComponentes = (props) => {
    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;
    
    const [data, setData] = useState([])
    const apoyoContext = useContext(apoyosContext)


    const { name, className, onChange, onBlur } = props

    const getComponentes = () => {
        const { token } = apoyoContext.registros
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}infoprel_online/disponibles/componentes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result.data)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getComponentes()
    }, [''])

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectComponentes;