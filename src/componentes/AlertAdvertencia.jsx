import Swal from 'sweetalert2'

const AlertAdvertencia = (msg) => {
    Swal.fire({
        title: msg,
        type: 'warning',
        icon: 'warning'
    })
}

export default AlertAdvertencia;