import "./styles.css";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Delete as DeleteIcon,
  DownloadDone,
  Edit as EditIcon,
  LibraryBooks as LibraryBooksIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import { useState } from "react";
import PagosEditDialog from "../PagosEditDialog";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable'


// https://codi.link/%7C%7CY29uc3QgbmV4dFdlZWsgPSAoZGF0ZSkgPT4gew0KICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGRhdGUpOw0KICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlKTsNCiAgDQogIG5leHREYXRlLnNldE1vbnRoKG5leHREYXRlLmdldE1vbnRoKCkgKyAxKTsNCg0KICBjb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnREYXRlKQ0KICBjb25zb2xlLmxvZygnbmV4dCcsIG5leHREYXRlKQ0KfQ0KDQpuZXh0V2VlaygnMjAyMi0xLTMwJyk7
const columns = [
  { field: "id", headerName: "Código", width: 70 },
  { field: "cliente", headerName: "Cliente", type: "string", minWidth: 150 },
  { field: "manzana", headerName: "Manzana", type: "string", minWidth: 100 },
  {
    field: "lote",
    headerName: "Número terreno",
    type: "string",
    minWidth: 150,
  },
  { field: "moneda", headerName: "Moneda", type: "string", minWidth: 100 },
  {
    field: "fechaInicio",
    headerName: "Fecha inicio",
    type: "date",
    minWidth: 120,
  },
  {
    field: "siguientePago",
    headerName: "Siguiente pago",
    type: "date",
    minWidth: 130,
  },
  {
    field: "cuotasVencidas",
    headerName: "Cuotas vencidas",
    type: "number",
    minWidth: 140,
  },
  {
    field: "deudaPendiente",
    headerName: "Deuda pendiente",
    type: "number",
    minWidth: 140,
  },
  {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <GridActionsCellItem icon={<LibraryBooksIcon />} label="Excel" />,
      <GridActionsCellItem icon={<PictureAsPdfIcon />} label="Pdf" />,
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];

const rows = [
  {
    id: 1,
    cliente: "Damien",
    manzana: "B",
    lote: 2,
    moneda: "Dolar",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 2,
    cliente: "Jorge",
    manzana: "A",
    lote: 3,
    moneda: "Dolar",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 3,
    cliente: "Manrique",
    manzana: "C",
    lote: 2,
    moneda: "Sol",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 4,
    cliente: "Eduardo",
    manzana: "B",
    lote: 2,
    moneda: "Sol",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
];

const PagosTable = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cuotasEdit, setCuotasEdit] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleShowEditDialog = (params) => {
    setOpenEditDialog(true);
  };

  const handleShowDeleteDialog = (params) => {
    setOpenDeleteDialog(true);
  };

  const DownloadPdf = () => {
    const doc=new jsPDF();
    doc.text("Gestor de pagos",14,10)
    doc.autoTable({
      columns:columns.map(col=>({title:col.headerName,dataKey:col.field})),
      body:rows.map(row=>Object.values(row))
    })
    doc.save('table.pdf')
  };

  return (

    <div className="Pagos-table">
      <table className="table table-striped" id="emp-table" style={{display:"none"}}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Manzana</th>
            <th>Número terreno</th>
            <th>Moneda</th>
            <th>Fecha inicio</th>
            <th>Siguiente pago</th>
            <th>Cuotas vencidas</th>
            <th>Deuda pendiente</th>
            
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.cliente}</td>
              <td>{row.manzana}</td>
              <td>{row.lote}</td>
              <td>{row.moneda}</td>
              <td>{row.fechaInicio}</td>
              <td>{row.siguientePago}</td>
              <td>{row.cuotasVencidas}</td>
              <td>{row.deudaPendiente}</td>
              </tr>
            ))}
      </tbody>
      </table>
      <DataGridPro
        rows={rows}
        columns={[
          { field: "id", headerName: "Código", width: 70 },
          {
            field: "cliente",
            headerName: "Cliente",
            type: "string",
            minWidth: 150,
          },
          {
            field: "manzana",
            headerName: "Manzana",
            type: "string",
            minWidth: 100,
          },
          {
            field: "lote",
            headerName: "Número terreno",
            type: "string",
            minWidth: 150,
          },
          {
            field: "moneda",
            headerName: "Moneda",
            type: "string",
            minWidth: 100,
          },
          {
            field: "fechaInicio",
            headerName: "Fecha inicio",
            type: "date",
            minWidth: 120,
          },
          {
            field: "siguientePago",
            headerName: "Siguiente pago",
            type: "date",
            minWidth: 130,
          },
          {
            field: "cuotasVencidas",
            headerName: "Cuotas vencidas",
            type: "number",
            minWidth: 140,
          },
          {
            field: "deudaPendiente",
            headerName: "Deuda pendiente",
            type: "number",
            minWidth: 140,
          },
          {
            field: "actions",
            type: "actions",
            width: 200,
            getActions: (params) => [
              <ReactHTMLTableToExcel
              table="emp-table"
              filename="tablexls"
              sheet="tablexls"
              buttonText="EXCEL" 
              class="fa fa-download">
              
              </ReactHTMLTableToExcel>,
              
              <GridActionsCellItem 
              icon={<PictureAsPdfIcon />} 
              label="Pdf" 
              onClick={() => DownloadPdf()}
              />,

              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleShowEditDialog(params)}
              />,

              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleShowDeleteDialog(params)}
              />,
            ],
          },
        ]}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
      />
      <PagosEditDialog open={openEditDialog} setOpen={setOpenEditDialog} />
    </div>
  );
};

export default PagosTable;
