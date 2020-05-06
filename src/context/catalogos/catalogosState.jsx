import React, { useReducer } from 'react'

import { AGREGAR_CATALOGOS } from "../../types";

import catalogosContext from "./catalogosContext";
import catalogosReducer from './catalogosReducer'

const CatalogosState = (props) => {

    const stateInicial = {
        catalogos: {
            some: null
        }
    }

    const [state, dispatch] = useReducer(catalogosReducer, stateInicial)

    const agregarCatalogos = catalogos => {
        dispatch({
            tipo: AGREGAR_CATALOGOS,
            payload: catalogos
        })
    }


    return (<catalogosContext.Provider
        value={
            {
                catalogos: {
                    ...state.catalogos,
                    agregarCatalogos
                }
            }
        }
    >
        {props.children}
    </catalogosContext.Provider>
    )
}

export default CatalogosState;