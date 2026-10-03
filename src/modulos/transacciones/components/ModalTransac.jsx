import Modal from 'react-bootstrap/Modal';

const ModalTransac = ({titulo, show, handleClose, children}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title className='text-primary' > {show === 'editar' ? "Editando..." : titulo} </Modal.Title>
        </Modal.Header>
        <Modal.Body> {children} </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalTransac
