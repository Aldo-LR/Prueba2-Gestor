import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useState } from 'react';
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Button,
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter, } from "reactstrap";

const columns = [
  { field: "nombre", headerName: "Nombre", type: "string", minWidth: 150 },
  {
    field: "direccion",
    headerName: "Dirección",
    type: "string",
    minWidth: 150,
  },
  { field: "distrito", headerName: "Distrito", type: "string", minWidth: 150 },
  { field: "dni", headerName: "DNI", type: "string", minWidth: 100 },
  { field: "telefono", headerName: "Telefono", type: "string", minWidth: 150 },
  { field: "correo", headerName: "Correo", type: "string", minWidth: 150 },
  {
    field: "actions",
    type: "actions",
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem 
      icon={<EditIcon />} 
      label="Edit" 
      //onClick={()=>seleccionarCliente(elemento,'Editar')}
      />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];


const rows = [
  {
    id: 1,
    nombre: "juan",
    direccion: "calle 9 de octubre",
  },
];


const styles = {
  height: "100%",
  width: "100%",
};



const ClientesTable = () => {
  const [modalInsertar,setModalInsertar] = useState(0);
  const [data, setData] = useState(rows);   
  const [modalEditar,setModalEditar] = useState(0);
  const [modalEliminar,setModalEliminar] = useState(0);
  const [clienteSeleccionado,setClienteSeleccionado] = useState({
    id:'',
    nombre:'',
    direccion:'',
    distrito:'',
    dni:'',
    telefono:'',
    correo:'',
  });
  const seleccionarCliente =(elemento,caso)=>{
    setClienteSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true);
}
const handleChange=e=>{
  const{name,value}=e.target;
  setClienteSeleccionado(prevState=>({
      ...prevState,
      [name]:value
  }));
}
const editar=()=>{
  var dataNueva = data;
  dataNueva.map((elemento)=>{
    if(elemento.id===clienteSeleccionado.id){
      elemento.nombre=clienteSeleccionado.nombre;
      elemento.direccion=clienteSeleccionado.direccion;
      elemento.distrito=clienteSeleccionado.distrito;
      elemento.dni=clienteSeleccionado.dni;
      elemento.telefono=clienteSeleccionado.telefono;
      elemento.correo=clienteSeleccionado.correo;
    }
})
setData(dataNueva);
setModalEditar(false);
}
const eliminar=()=>{
  setData(data.filter(elemento=>elemento.id!==clienteSeleccionado.id));
  setModalEliminar(false);
}
const abrirModalInsertar=()=>{
  setClienteSeleccionado(null);
  setModalInsertar(true);
}

const insertar=()=>{
  var valorInsertar = clienteSeleccionado;
  valorInsertar.id=data[data.length-1].id+1;
  var dataNueva = data;
  dataNueva.push(valorInsertar);
  setData(dataNueva);
  setModalInsertar(false);
}



  return (

    <div className="Clientes-table" style={styles}>
      <table style={{display:"none"}}>
        <tbody>
          {data.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.direccion}</td>
              <td>{elemento.distrito}</td>
              <td>{elemento.dni}</td>
              <td>{elemento.telefono}</td>
              <td>{elemento.correo}</td> 
            </tr>
          ))}
        </tbody>
      </table>
      <Button color="success" onClick={()=>abrirModalInsertar()} >
        Crear Cliente
      </Button>
      <DataGridPro
        rows={rows}
        columns={columns}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
      />
    

    <Modal isOpen={modalInsertar} >
      <ModalHeader>
        <div><h3>Crear Cliente</h3></div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
        <label>Id:</label>
        <input 
        className="form-control" 
        readonly 
        type="text"
        value={clienteSeleccionado && clienteSeleccionado.id} 
        onChange={handleChange}
        value={data[data.length-1].id+1} />
        </FormGroup>
        <FormGroup>
        <label>Nombre:</label>
        <input
        className="form-control"
        type="text"
        name="nombre"
        value={clienteSeleccionado ? clienteSeleccionado.nombre:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Direccion:</label>
        <input
        className="form-control"
        type="text"
        name="direccion"
        value={clienteSeleccionado ? clienteSeleccionado.direccion:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Distrito:</label>
        <input
        className="form-control"
        type="text"
        name="distrito"
        value={clienteSeleccionado ? clienteSeleccionado.distrito:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>DNI:</label>
        <input
        className="form-control"
        type="text"
        name="dni"
        value={clienteSeleccionado ? clienteSeleccionado.dni:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Telefono:</label>
        <input
        className="form-control"
        type="text"
        name="telefono"
        value={clienteSeleccionado ? clienteSeleccionado.telefono:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Correo:</label>
        <input
        className="form-control"
        type="text"
        name="correo"
        value={clienteSeleccionado ? clienteSeleccionado.correo:''}
        onChange={handleChange}/>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={()=>insertar()}>Insertar</Button>
      <Button color="danger" onClick={()=>setModalInsertar(false)}>Cancelar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEditar} >
      <ModalHeader>
        <div><h3>Editar Cliente</h3></div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
        <label>Nombre:</label>
        <input
        className="form-control"
        type="text"
        name="nombre"
        value={clienteSeleccionado ? clienteSeleccionado.nombre:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Direccion:</label>
        <input
        className="form-control"
        type="text"
        name="direccion"
        value={clienteSeleccionado ? clienteSeleccionado.direccion:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Distrito:</label>
        <input
        className="form-control"
        type="text"
        name="distrito"
        value={clienteSeleccionado ? clienteSeleccionado.distrito:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Telefono:</label>
        <input
        className="form-control"
        type="text"
        name="telefono"
        value={clienteSeleccionado ? clienteSeleccionado.telefono:''}
        onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
        <label>Correo:</label>
        <input
        className="form-control"
        type="text"
        name="correo"
        value={clienteSeleccionado ? clienteSeleccionado.correo:''}
        onChange={handleChange}/>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={()=>editar()}>Grabar</Button>
      <Button color="danger" onClick={()=>setModalEditar(false)}>Cancelar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar} >
      <ModalBody>
          ¿Estas seguro que deseas eliminar al cliente {clienteSeleccionado && clienteSeleccionado.nombre} ?
      </ModalBody>
      <ModalFooter>
      <Button color="danger" onClick={()=>eliminar()}>Si</Button>
                    <Button color="secondary" onClick={()=>setModalEliminar(false)}>No</Button>
                </ModalFooter>
      </Modal>

    </div>
  );
};

export default ClientesTable;
