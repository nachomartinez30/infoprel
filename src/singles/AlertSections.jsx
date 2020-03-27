import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlertSections = (msg) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: <p>Hello World</p>,
        html: <p>Lorem</p>,
    })
}
export default AlertSections;