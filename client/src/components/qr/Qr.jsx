import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context'
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code'
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import ('./Qr.css')

const Qr = () => {

    const {tableId, number} = useParams()

    const { user } = useContext(AuthContext);

    console.log('restaurant Id', user._id,  'table id', tableId)


    return (
        <>

        <QRCode className='qr' value={`https://waiterhack.herokuapp.com/${user._id}/${tableId}/vista-cliente`}></QRCode>
        <p onClick={window.print()}>Mesa {number}</p>
        </>

    )

}

export default Qr