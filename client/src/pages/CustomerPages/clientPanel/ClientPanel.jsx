
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import restaurantService from '../../../services/restaurant.services'
import ReactStars from "react-rating-stars-component"

import './ClientPanel.css'


const ClientPanel = () => {

    const [table, setTable] = useState("");
    const [paid, setPaid] = useState(false)

    const { _id, tableId } = useParams()

    useEffect(() => {
        const refresh = setInterval(() => {
            loadRestarurant()
        }, 1000)

        return () => clearInterval(refresh)
    }, [table])

    const loadRestarurant = () => {
        restaurantService
            .checkTable(tableId)
            .then(res => setTable(res.data.customer))
            .catch(err => console.log(err))
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };


    return (
        <>
            {!table ?
                <div className='bye'>
                    <h2>Gracias por su visita</h2>
                    <p>por favor, puntue su satisfacción</p>
                    <article className='stars'><ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    /></article>
                </div> 
                :
                <div>
                    <h1>Bienvenido a Bar Cenas</h1>
                    <h3>Buen Provecho</h3>
                    <Row>
                        <Col md={6}>
                            <Link to={`/${_id}/${tableId}/customer-order`} className='link'><Button className="btn-primary" >Haz tu pedido</Button></Link>
                        </Col>

                        <Col md={6}>
                            <Link to={`/restaurante/${_id}/${tableId}/check-out`}><Button className="btn-primary" >Pago</Button></Link>
                        </Col>
                    </Row>
                </div>}
        </>
    )
}

export default ClientPanel