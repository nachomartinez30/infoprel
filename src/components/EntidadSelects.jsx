import React, { useState, useEffect, useContext } from 'react'
import AlertError from '../singles/AlertError'
import SelectEstados from '../singles/SelectEstados'
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const EntidadSelects = (props) => {
    /* Context catalogos */
    const catsContext = useContext(catalogosContext)
    const { estados } = catsContext.catalogos
    const { textoComplemetarioLabel, nameComplement, onBlur } = props

    const [entidad, setEntidad] = useState({
        municipios: [],
        localidades: [],
        cve_ent_selected: '',
        cve_mun_selected: ''
    })

    const getMunicipio = (foo) => {
        const cve_estado = foo.target.value
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL
        /* fetch para busqueda de estado */

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}inegi/municipios?paginate%5Bpage%5D=1&paginate%5BselectQuery%5D=null&paginate%5BbyColumn%5D=true&paginate%5Blimit%5D=600&paginate%5BorderBy%5D=nom_mun&paginate%5Bascending%5D=1&paginate%5BsQ%5D%5B0%5D%5BopT%5D=con&paginate%5BsQ%5D%5B0%5D%5Bop%5D=and&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5BopT%5D=com&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5Bop%5D=%3D&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5BsQ%5D%5Bcve_ent%5D=${cve_estado}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.unshift({ municipio_id: '', cve_ent: '', cve_mun: '', nom_mun: 'Seleccione', created_at: '', updated_at: '', cve_inegi: '' })
                /* setMunicipios a estad principal */
                setEntidad({
                    ...entidad,
                    municipios: result.data,
                    localidades: [],
                    cve_ent_selected: cve_estado
                })
            })
            .catch(error => {
                console.log('error', error)
                return AlertError('Error al cargar municipios', error)
            });
    }

    const getLocalidades = (foo) => {
        const cve_mun = foo.target.value
        const cve_ent = entidad.cve_ent_selected;
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}inegi/localidades?paginate%5Bpage%5D=1&paginate%5BselectQuery%5D=null&paginate%5BbyColumn%5D=true&paginate%5Blimit%5D=4000&paginate%5BorderBy%5D=nom_loc&paginate%5Bascending%5D=1&paginate%5BsQ%5D%5B0%5D%5BopT%5D=con&paginate%5BsQ%5D%5B0%5D%5Bop%5D=and&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5BopT%5D=com&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5Bop%5D=%3D&paginate%5BsQ%5D%5B0%5D%5BsQ%5D%5B0%5D%5BsQ%5D%5Bcve_ent%5D=${cve_ent}&paginate%5BsQ%5D%5B1%5D%5BopT%5D=con&paginate%5BsQ%5D%5B1%5D%5Bop%5D=and&paginate%5BsQ%5D%5B1%5D%5BsQ%5D%5B0%5D%5BopT%5D=com&paginate%5BsQ%5D%5B1%5D%5BsQ%5D%5B0%5D%5Bop%5D=%3D&paginate%5BsQ%5D%5B1%5D%5BsQ%5D%5B0%5D%5BsQ%5D%5Bcve_mun%5D=${cve_mun}`, requestOptions)
            .then(response => response.json())
            .then(result => {

                result.data.unshift({ localidad_id: "", municipio_id: "", cve_ent: "", cve_mun: "", cve_loc: "", nom_loc: "Seleccione", cve_periodo: "", ambito: "", created_at: null, updated_at: null })
                setEntidad({
                    ...entidad,
                    localidades: result.data
                })
            })
            .catch(error => {
                console.log('error', error)
                return AlertError('Error al cargar localidades', error)
            });
    }

    return (
        <React.Fragment>
            <div className='col-md-4'>
                <label className="control-label"> Estado de {textoComplemetarioLabel} *:</label>
                <SelectEstados
                    data={estados}
                    className='form-control'
                    name={`estado_${nameComplement}`}
                    onChange={getMunicipio}
                    onBlur={onBlur}
                />
            </div>
            {/* MUNICIPIO */}
            <div className='col-md-4'>
                <label className="control-label"> Municipio de {textoComplemetarioLabel} *:</label>
                <select
                    className="form-control"
                    name={`municipio_${nameComplement}`}
                    onChange={getLocalidades}
                    onBlur={onBlur}
                >
                    {/* <option key='' value=''>--Seleccione--</option> */}
                    {entidad.municipios.map((item) => <option key={item.cve_mun} value={item.cve_mun}>{item.nom_mun}</option>)}
                </select>
            </div>
            {/* LOCALIDAD */}
            <div className='col-md-4'>
                <label className="control-label"> Localidad de {textoComplemetarioLabel} *:</label>
                <select
                    className="form-control"
                    name={`localidad_${nameComplement}`}
                    onBlur={onBlur}
                >
                    {/* <option key='' value=''>--Seleccione--</option> */}
                    {entidad.localidades.map(item => <option key={item.localidad_id} value={item.cve_loc}>{item.nom_loc}</option>)}
                </select>
            </div>
        </React.Fragment>
    );
}

export default EntidadSelects;