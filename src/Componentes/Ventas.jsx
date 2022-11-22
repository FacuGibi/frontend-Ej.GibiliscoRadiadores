import "../Components.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function Ventas(props) {
  const [show, setShow] = useState(false);
  const [codigoRadiador, setCodigoRadiador] = useState();

  const modalClose = () => {
    setShow(false);
  };
  const modalShow = () => {
    setShow(true);
  };

  function cargarRadiadores() {
    props.radiadores.map((item) =>(
      document.getElementById("selectCodigo").innerHTML += `<option value="${item.cod_radiador}">${item.cod_radiador}</option>`)
    )
  }

  async function cargarDatosRadiador(codigo) {
    console.log(codigo);
    await axios.get(props.baseUrl+"/consultas/datosRadiador/"+codigo)
    .then((response) => {
      console.log(response.data[0].marca)
      document.getElementById("iptMarcaRadiador").value = response.data[0].marca
      document.getElementById("iptModeloRadiador").value = response.data[0].modelo
    })
  }

  return (
    <div>
      <table class="tableStock table-sm table-bordered mb-2 ms-5">
        <thead>
          <tr>
            <th colSpan="6" class="bg-primary">
              VENTAS
            </th>
          </tr>
          <tr class="table-group-divider">
            <th class="bg-success" scope="col">
              Codigo
            </th>
            <th class="bg-success" scope="col">
              Marca
            </th>
            <th class="bg-success" scope="col">
              Modelo
            </th>
            <th class="bg-success" scope="col">
              Fecha Venta
            </th>
            <th class="bg-success" scope="col">
              Unidades
            </th>
            <th class="bg-success" scope="col">
              Precio Venta
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-primary mb-3" onClick={modalShow}>
          Resgistrar Venta
        </button>
      </div>

      <Modal show={show} onHide={modalClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
            <select
              placeholder="Codigo"
              id="selectCodigo"
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onFocus={cargarRadiadores}
              onChange={(e) => {
                setCodigoRadiador(e.target.value);
                cargarDatosRadiador(e.target.value);
              }}
            >
              <option selected>Codigo</option>
            </select>
            <input
              type="text"
              class="form-control"
              id="iptMarcaRadiador"
              placeholder="Marca"
              readOnly
            />
            <input
              type="text"
              class="form-control"
              id="iptModeloRadiador"
              placeholder="Modelo"
              readOnly
            />
            <input
              type="date"
              class="form-control"
              id="iptFechaEg"
              placeholder="Fecha Venta"
            />
            <input
              type="number"
              class="form-control"
              id="iptDescripcionEg"
              placeholder="Unidades"
            />
            <span class="input-group-text">$</span>
            <input
              type="number"
              class="form-control"
              id="iptMontoEg"
              placeholder="Precio Venta"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" class="btn btn-danger" onClick={modalClose}>
            Cerrar
          </button>
          <button type="button" class="btn btn-success">
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
