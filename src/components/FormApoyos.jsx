import React, { useContext, useState, useEffect } from 'react';
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";
import apoyosContext from "./../context/apoyos/apoyosContext";
/* COMPONENTES */
import LineaDivision from '../singles/LineaDivision';
import SelectCatalogo from '../singles/SelectCatalogo';
import SelectComponentes from '../singles/SelectComponentes';
import SelectApoyos from '../singles/SelectApoyos';

const FormApoyos = ({ state, setState }) => {
    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

    /* Contiene los apoyos disponibles adquiridos por request */
    const [apoyosDisp, setApoyosDisp] = useState([])
    /* State local para agregar a state global del componente pádre */
    const [apoyosSeleccionados, setApoyosSeleccionados] = useState({})

    const catsContext = useContext(catalogosContext)
    const { tipos_productores } = catsContext.catalogos

    const apoyoContext = useContext(apoyosContext)

    const setInfo = (input) => {

        setApoyosSeleccionados({
            ...apoyosSeleccionados,
            [input.target.name]: input.target.value
        })
    }

    const getApoyosDisponibles = event => {
        const { token } = apoyoContext.registros
        const { componente_seleccionado } = apoyosSeleccionados

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        let formdata = new FormData();
        formdata.append("componente", componente_seleccionado);
        formdata.append("tipo_productor", "10");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(API_REQUEST + "infoprel_online/disponibles/apoyos", requestOptions)
            .then(response => response.json())
            .then(result => {
                /* TODO: filtrar arreglo dependiendo si el state global ya tiene agregados los apoyos
                 para que no sean agregados 2 veces */
                setApoyosDisp(result.data)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getApoyosDisponibles()
    }, [apoyosSeleccionados])

    const agregarApoyo = () => {
        /* Se agrega al state del componente padre */
        setState([
            ...state,
            apoyosSeleccionados
        ])
        /* TODO: filtrado de apoyos agregados para no capturar repetidos */
    }

    return (
        <div className='col-md-12'>
            <h2>Seleccion de Apoyos</h2>
            <LineaDivision />
            <label>Tipo Productor:</label>
            <SelectCatalogo
                // onChange={setInfo}
                className="form-control"
                name="tipo_productor"
            // data={tipos_productores.data}
            />
            <br />
            <label>Componente:</label>
            <SelectComponentes
                className='form-control'
                name='componente_seleccionado'
                onChange={setInfo}
            />
            <br />

            <label>Apoyo a solicitar:</label>
            {(typeof apoyosDisp != 'undefined' && apoyosDisp.length > 0) ?
                <SelectApoyos
                    className='form-control'
                    name='apoyo_seleccionado'
                    onBlur={setInfo}
                    data={apoyosDisp}
                />
                :
                <div className="alert alert-warning" role="alert">
                    No hay apoyos disponibles para este componente
                </div>
            }
            <button className='btn btn-danger'
                onClick={agregarApoyo}
            >Agregar Apoyo</button>
        </div>
    );
}

export default FormApoyos;

/* TODO: completar formulario de montos, cantidad, unidad de medida, aportacion y folio de asesor */
/* TODO: eliminacion de apoyos seleccionados */
/* TODO: traer las unidades de medidas maximos y minios, cuando se selecciona un apoyo */