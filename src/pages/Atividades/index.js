import React, { useEffect, useState } from "react";

import api from "../../services/api";
import { Container, Spinner, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function Atividades() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    setLoading(true);

    await api
      .get("/atividade")
      .then((resp) => {
        setLoading(false);
        setActivities(resp.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <Container>
      <h1 className="text-center mb-4">Atividades</h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="text-center mb-3">
            <Link to="/activityCreate">Criar Nova</Link>
          </div>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Projeto</th>
                <th>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((ac) => (
                <tr key={ac.id}>
                  <td>{ac.id}</td>
                  <td>{ac.descricao}</td>
                  <td>{ac.projeto.descricao}</td>
                  <td>
                    <LinkContainer to={`/activityView/${ac.id}`}>
                      <Button variant="primary" size="sm">
                        <FaEye />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default Atividades;
