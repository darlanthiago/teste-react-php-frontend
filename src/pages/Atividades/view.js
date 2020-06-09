import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import { Container, Spinner, Jumbotron, Button } from "react-bootstrap";

function AtividadesView() {
  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [activity, setActivity] = useState({});
  const [project, setProject] = useState({});

  useEffect(() => {
    loadActivity();
  }, [id]);

  async function loadActivity() {
    setLoading(true);

    await api
      .get(`/atividade/${id}`)
      .then((resp) => {
        setLoading(false);
        setActivity(resp.data);
        setProject(resp.data.projeto);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  async function handleRemoveActivity() {
    setRemoveLoading(true);

    await api.delete(`/atividade/${id}`).then((resp) => {
      setRemoveLoading(false);
      alert("Atividade removida com sucesso!");
      history.push("/");
    });
  }

  return (
    <Container>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Link to="/">Voltar</Link>
          <Jumbotron fluid>
            <Container>
              <h1>Atividade: {activity.descricao}</h1>
              <h5>Projeto: {project.descricao}</h5>
            </Container>
          </Jumbotron>
          <Button
            variant="danger"
            className="mr-4"
            onClick={handleRemoveActivity}
          >
            {removeLoading ? "Excluindo ..." : "Excluir Atividade"}
          </Button>
          <Link className="btn btn-primary" to={`/activityEdit/${id}`}>
            Editar
          </Link>
        </>
      )}
    </Container>
  );
}

export default AtividadesView;
