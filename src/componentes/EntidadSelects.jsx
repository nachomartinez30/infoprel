import React, { useState, useEffect, useContext } from 'react'
import AlertError from '../componentes/AlertError'

const EntidadSelects = ({ textoComplemetarioLabel, nameComplement }) => {

    const [entidad, setEntidad] = useState({
        estados: [
            { value: '00', name: 'Selecciona' },
            { value: '01', name: 'AGUASCALIENTES' },
            { value: '02', name: 'BAJA CALIFORNIA' },
            { value: '03', name: 'BAJA CALIFORNIA SUR' },
            { value: '04', name: 'CAMPECHE' },
            { value: '07', name: 'CHIAPAS' },
            { value: '08', name: 'CHIHUAHUA' },
            { value: '09', name: 'CIUDAD DE MÉXICO' },
            { value: '05', name: 'COAHUILA DE ZARAGOZA' },
            { value: '06', name: 'COLIMA' },
            { value: '10', name: 'DURANGO' },
            { value: '11', name: 'GUANAJUATO' },
            { value: '12', name: 'GUERRERO' },
            { value: '13', name: 'HIDALGO' },
            { value: '14', name: 'JALISCO' },
            { value: '15', name: 'MÉXICO' },
            { value: '16', name: 'MICHOACÁN DE OCAMPO' },
            { value: '17', name: 'MORELOS' },
            { value: '18', name: 'NAYARIT' },
            { value: '19', name: 'NUEVO LEÓN' },
            { value: '20', name: 'OAXACA' },
            { value: '21', name: 'PUEBLA' },
            { value: '22', name: 'QUERÉTARO' },
            { value: '23', name: 'QUINTANA ROO' },
            { value: '24', name: 'SAN LUIS POTOSÍ' },
            { value: '25', name: 'SINALOA' },
            { value: '26', name: 'SONORA' },
            { value: '27', name: 'TABASCO' },
            { value: '28', name: 'TAMAULIPAS' },
            { value: '29', name: 'TLAXCALA' },
            { value: '30', name: 'VERACRUZ DE IGNACIO DE LA LLAVE' },
            { value: '31', name: 'YUCATÁN' },
            { value: '32', name: 'ZACATECAS' }
        ],
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
                <select
                    className="form-control"
                    name={`estado_${nameComplement}`}
                    onChange={getMunicipio}
                >
                    {entidad.estados.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
                </select>
            </div>
            {/* MUNICIPIO */}
            <div className='col-md-4'>
                <label className="control-label"> Municipio de {textoComplemetarioLabel} *:</label>
                <select
                    className="form-control"
                    name={`municipio_${nameComplement}`}
                    onChange={getLocalidades}
                >
                    {/* <option key='' value=''>Selecciona</option> */}
                    {entidad.municipios.map((item) => <option key={item.cve_mun} value={item.cve_mun}>{item.nom_mun}</option>)}
                </select>
            </div>
            {/* LOCALIDAD */}
            <div className='col-md-4'>
                <label className="control-label"> Localidad de {textoComplemetarioLabel} *:</label>
                <select
                    className="form-control"
                    name={`localidad_${nameComplement}`}
                >
                    {/* <option key='' value=''>Selecciona</option> */}
                    {entidad.localidades.map(item => <option key={item.cve_loc} value={item.cve_loc}>{item.nom_loc}</option>)}
                </select>
            </div>
        </React.Fragment>
    );
}

export default EntidadSelects;