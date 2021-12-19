import React, { Component } from 'react';
import { Form } from "react-bootstrap";

class Parking extends Component {

    render (){
        return (
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Введите марку машины или VIN" className={"mt-2 text-center"}/>
                </Form.Group>
            </Form>
        );
    }
}

export default Parking;