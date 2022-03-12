
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import NavbarClient from '../../../components/navbarClient/NavbarClient'
import { Button } from 'react-bootstrap'


import './ClientPanel.css'


const ClientPanel = () => {

    const { _id, tableId } = useParams()


    return (
        <>
           
            <h1>Bienvenido a Bar Cenas</h1>
            <h3>Buen Provecho</h3>
            <Row>
                <Col md={6}>
                    <Link to={`/${_id}/${tableId}/customer-order`} className='link'><Button className="btn-primary" >Haz tu pedido</Button></Link>
                </Col>

                <Col md={6}>
                    <Link to={`/restaurante/${_id}/${tableId}/check-out`}><Button className= "btn-primary" >Pago</Button></Link>
                </Col>
            </Row>
           


        </>
    )
}

export default ClientPanel