import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import apoyosContext from "./../context/apoyos/apoyosContext";


const Generales = () => {
    const apoyoContext = useContext(apoyosContext)
    const { cerValido, rfc } = apoyoContext.checkCertState;

    const [infoGeneral, setInfoGeneral] = useState({

    })

    return (
        <section>
            {!rfc && <Redirect to='/'/>}
            <h1>Datos génerales</h1>
            lorem='{rfc}'
        </section>
    );
}

export default Generales;