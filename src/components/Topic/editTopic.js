import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
// import EditTopicForm from './editTopicForm';

// const EditTopic = ({ editTopic }) => {
const EditTopic = ({ editTopic }) => {

    const [topic, setTopic] = useState(editTopic.topic)
    const [objective, setObj] = useState(editTopic.objective)
    const [category, setCategory] = useState("IT")
    // const [resPerson, setResPerson] = useState("")
    const [level, setLevel] = useState("Easy")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = (e) => {
        // e.preventDefault()
        // console.log("testing")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            topic,
            objective,
            category,
            level,
            state: null,
            version: null
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/topic/${editTopic.id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        alert("topic edited")
        handleClose()
    }

    useEffect(() => {
        // console.log(editTopic)
    })

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditTopicForm handleSave={handleSave} editTopic={props.data} /> */}
                    <Form className='container'>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control placeholder="Enter topic" value={topic} required onChange={(e) => setTopic(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Objective</Form.Label>
                            <Form.Control type="text" placeholder="objective" value={objective} required onChange={(e) => setObj(e.target.value)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                        <option defaultValue>IT</option>
                                        <option>HR</option>
                                        <option>General</option>
                                        <option>It</option>
                                        <option>Technical</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            {/* <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Person responsible</Form.Label>
                                    <Form.Control type="text" placeholder="person responsible" value={resPerson} required onChange={(e) => setResPerson(e.target.value)} />
                                </Form.Group>
                            </Col> */}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSave(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditTopic;

