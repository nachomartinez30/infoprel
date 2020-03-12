import React, { Fragment } from 'react'

const WizardSteps = () => {

    /* TODO Cambiar segun state principal*/
    return (
        <Fragment>
            <ul className="wizard-steps mt">
                <br />
                <li className={'completed'}>
                    <h5>Paso 1</h5>
                    <span>Datos generales</span>
                </li>
                <li className={''}>
                    <h5>Paso 2</h5>
                    <span>Solicitud</span>
                </li>
                <li className={'completed'}>
                    <h5>Paso 3</h5>
                    <span>Finalizado</span>
                </li>
                <li className={''}>
                    <i className="glyphicon glyphicon-ok-circle" />
                </li>
            </ul>
        </Fragment>
    );
}

export default WizardSteps;