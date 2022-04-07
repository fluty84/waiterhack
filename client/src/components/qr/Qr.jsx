import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import QRCode from 'react-qr-code'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import('./Qr.css')

const Qr = () => {

    const navigate = useNavigate()

    const { tableId, number } = useParams()
    const { user } = useContext(AuthContext);

    return (
        <>

            <div className='flexDiv'>
                <QRCode className='qr' value={`https://waiterhack.netlify.app/${user._id}/${tableId}/vista-cliente`}></QRCode>
                <Button className='btn-primary block' onClick={() => window.print()}>Mesa {number}</Button>
                <Button onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </>

    )

}

export default Qr