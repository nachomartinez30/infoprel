import Swal from 'sweetalert2'
const AlertExito = (msg, txt = null) => {
    Swal.fire({
        title: msg,
        icon: 'success',
        timer: 3000,
        text: txt,
        showConfirmButton: false
    })

}

export default AlertExito;