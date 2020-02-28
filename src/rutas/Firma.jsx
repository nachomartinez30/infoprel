import React from 'react'
import FirmaDigitalForm from "../componentes/FirmaDigitalForm";

const Firma = () => {
    return (
        <React.Fragment>
            <h1>Firma</h1>
            <FirmaDigitalForm
                textButton={'Firmar'}
            />
        </React.Fragment>
    );
}

export default Firma;