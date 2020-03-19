import React from 'react'
import AlertError from '../singles/AlertError';

const getFetch = (REQUEST_URL, name) => {

    const resultado = []

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(REQUEST_URL, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            AlertError(`Error al cargar ${name} `, error)
            console.log('error', error)
        });

    return (resultado);

}

export default getFetch;