import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BaseColaboradores } from '../bbdd/BaseColaboradores';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { default as Navbarbootstrap } from 'react-bootstrap/Navbar';

const Contenedor = () => {

    const [nombreColaborador, setNombreColaborador] = useState("");
    const [emailColaborador, setEmailColaborador] = useState("");
    const [arrayColaboradores, setArrayColaboradores] = useState(BaseColaboradores);
    const [alerta, setAlerta] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState("")

    const inputNav = (e) =>{
        e.preventDefault();
        setIsModalOpen(true)
    }
    const setTxt = (e) => {
        setInput(e.target.value)
        /* console.log(input) */
    }

    const setNombre = (e) => {
        setNombreColaborador(e.target.value)
        /* console.log(nombreColaborador) */
    }

    const setEmail = (e) => {
        setEmailColaborador(e.target.value)
        /* console.log(emailColaborador) */
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombreColaborador !== "" && emailColaborador !== "") {
            setArrayColaboradores([...arrayColaboradores, { id: arrayColaboradores.length + 1, nombre: nombreColaborador, correo: emailColaborador }])
            /* console.log(arrayColaboradores) */
        } else {
            setAlerta(true)
            return
        }
        setAlerta(false)
    };


    return (
        <>
            {/* NAVBAR */}
            <Navbarbootstrap className='bg-dark text-light ' expand="lg" >
                <Container fluid className='bg-dark text-light d-flex '>
                    <Navbarbootstrap.Brand className='text-light'>Colaboradores</Navbarbootstrap.Brand>
                    <Form className="d-flex" onSubmit={inputNav}>
                        <Form.Control
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Buscar"
                            onChange={setTxt}
                        />
                        <Form.Group>
                        <Button variant="outline-light" >Filtrar</Button>
                        </Form.Group>
                        
                    </Form>

                </Container>
            </Navbarbootstrap>
            {/* FORMULARIO */}
            {alerta && <Alert variant="danger">Rellenar todos los datos</Alert>}
            <Form className='m-4' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre del Colaborador</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa nombre del Colaborador"
                        onChange={setNombre}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Correo del Colaborador</Form.Label>
                    <Form.Control type="email" placeholder="Ingresa correo del Colaborador"
                        onChange={setEmail}
                    />

                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar colaborador
                    </Button>
                </Form.Group>
            </Form>
            {/* LISTA DE COLABORADORES */}
            <ul>
                {arrayColaboradores.map(colaborador => <li
                    key={colaborador.id}>
                    {colaborador.nombre} - {colaborador.correo}
                </li>)}
            </ul>

            {/* BOTON PARA ACTIVAR MODAL SOBREPUESTO */}
            <ListaDeColaboradores
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                arrayColaboradores={arrayColaboradores} input={input} />
        </>
    );
}


function ListaDeColaboradores({ isOpen, onClose, arrayColaboradores, input }) {
    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-backdrop fade show" />
            <div className="modal fade show d-flex align-items-center" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Resultados : { }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {arrayColaboradores
                            // eslint-disable-next-line array-callback-return
                            .filter((colaborador) => {
                                if (input === "") {
                                return colaborador
                                }else if(
                                    colaborador.nombre.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                                    colaborador.correo.toLocaleLowerCase().includes(input.toLocaleLowerCase())
                                ){
                                    return colaborador
                                } 
                            }).map((colaborador) => (
                                <div key={colaborador.id}>
                                    {colaborador.nombre} - {colaborador.correo}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
/*   <ul>
                                {arrayColaboradores.map(colaborador => <li
                                    key={colaborador.id}>
                                    {colaborador.id} - {colaborador.nombre} - {colaborador.correo}
                                </li>)}
                            </ul> */

export default Contenedor