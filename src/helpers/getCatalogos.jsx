const getCatalogos = () => {

    const API_REQUEST = 'https://localhost/siiac_ws_app/public/api/';

    const nacionalidades = fetch(`${API_REQUEST}catalogos/nacionalidades`)
        .then(response => response.json())
        .then(data => data)

    const tipos_etnias = fetch(`${API_REQUEST}catalogos/tipos_etnias`)
        .then(response => response.json())
        .then(data => data)

    const estados_civiles = fetch(`${API_REQUEST}catalogos/estados_civiles`)
        .then(response => response.json())
        .then(data => data)

    const documentos_acreditacion = fetch(`${API_REQUEST}catalogos/documentos_acreditacion`)
        .then(response => response.json())
        .then(data => data)

    const personalidades_juridicas_F = fetch(`${API_REQUEST}catalogos/tipos_solicitantes/personalidades_juridicas/1`)
        .then(response => response.json())
        .then(data => data)

    const personalidades_juridicas_M = fetch(`${API_REQUEST}catalogos/tipos_solicitantes/personalidades_juridicas/2`)
        .then(response => response.json())
        .then(data => data)

    const estados = fetch(`${API_REQUEST}inegi/estados`)
        .then(response => response.json())
        .then(data => data)

    const configuraciones = fetch(`${API_REQUEST}administracion/configuraciones/ciclos/actual_siguiente`)
        .then(response => response.json())
        .then(data => data)






    const fetchCatalogos = [nacionalidades, tipos_etnias, estados_civiles, documentos_acreditacion, personalidades_juridicas_F, personalidades_juridicas_M, estados, configuraciones]

Promise.all(fetchCatalogos)
        .then(respuestas => {
            const catalogos = {
                nacionalidades: respuestas[0].nacionalidades,
                tipos_etnias: respuestas[1].data,
                estados_civiles: respuestas[2].estados_civiles,
                documentos_acreditacion: respuestas[3].data,
                personalidades_juridicas_F: respuestas[4],
                personalidades_juridicas_M: respuestas[5],
                estados: respuestas[6]
            }
            return  catalogos
        })
        .catch(
            error => console.log(error)
        )
    }

let cata = await getCatalogos()
console.log(cata);
