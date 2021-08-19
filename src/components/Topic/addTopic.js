import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
// import EditTopicForm from './editTopicForm';

// const EditTopic = ({ editTopic }) => {
const AddTopic = () => {

    const [topic, setTopic] = useState("")
    const [objective, setObj] = useState("")
    const [category, setCategory] = useState("IT")
    const [resPerson, setResPerson] = useState("")
    const [level, setLevel] = useState("Easy")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        console.log("submitting")
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            topic, objective, category, resPerson, level
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_URL}/topic`, requestOptions)
            .then(response => response.json())
            // .then(result => alert(result.message))
            .then(result => {
                alert("topic added")
                handleClose()
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        // console.log(editTopic)
    })

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i class="fa fa-plus-square" aria-hidden="true"></i>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditTopicForm handleSave={handleSave} editTopic={props.data} /> */}
                    <Form className='container' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control placeholder="Enter topic" required onChange={(e) => setTopic(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Objective</Form.Label>
                            <Form.Control type="text" placeholder="objective" required onChange={(e) => setObj(e.target.value)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <select id="inputState" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                        <option defaultValue>IT</option>
                                        <option>HR</option>
                                        <option>General</option>
                                        <option>It</option>
                                        <option>Technical</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Person responsible</Form.Label>
                                    <Form.Control type="text" placeholder="person responsible" required onChange={(e) => setResPerson(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Level</Form.Label>
                                    <select id="inputState" className="form-control" onChange={(e) => setLevel(e.target.value)}>
                                        <option defaultValue>Easy</option>
                                        <option>Intermediate</option>
                                        <option>Advance</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTopic;

