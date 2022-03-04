
import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services"
import mesaOn from './mesa-on.png'
import('./DayPanel.css')

const DayPanel = () => {

    // const date = new Date()
    // console.log(date)
    const { user } = useContext(AuthContext);
    const [tables, setTables] = useState()

    useEffect(() => {
        loadTables()
    }, [])

    const loadTables = () => {

        restaurantService
            .getRestaurant(user)
            .then((response) => setTables(response.data.tables))
            .catch((err) => console.log(err));
    }



    return (

        <>
            <h1>Jornada </h1>
            <Row className="justify-content-md-center">
                {
                    tables?.map((table, idx) => {
                        console.log(table)
                        return (
                            <Col md={3} className="mesa">
                                <h1>Mesa {idx + 1}</h1>
                                <Link to={`/restaurante/${user._id}/panel/${table}`}> <img src={mesaOn} alt="" /> </Link>
                            </Col>
                        )
                    })
                }

            </Row>

        </>
    )
}

export default DayPanel