import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import "../../styles/publish.css";

export const Oferts = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="text-center">
        <h1>Ofertas de Compra 🤑</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Categoría</th>
              <th>Se Ofrecen</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {store.ofertas.map((oferta) => {
              return (
                <tr key={oferta.id}>
                  <td>{oferta.titulo}</td>
                  <td>{oferta.categoria}</td>
                  <td>{oferta.oferta}</td>
                  <td>{oferta.descripcion}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};