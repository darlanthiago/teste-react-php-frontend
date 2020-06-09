import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";

import api from "../../services/api";
import { useHistory, Link, useParams } from "react-router-dom";

function AtividadesEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [loadingProjects, setLoadingProjects] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadActivity(id);
  }, [id]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadActivity(value) {
    setLoading(true);
    await api.get(`/atividade/${value}`).then((resp) => {
      setDescription(resp.data.descricao);
      setSelectedProject(resp.data.projeto.id);
      setLoading(false);
    });
  }

  async function loadProjects() {
    setLoadingProjects(true);

    await api
      .get("/projeto/simple")
      .then((resp) => {
        setLoadingProjects(false);

        setProjects(resp.data);
      })
      .catch((error) => {
        setLoadingProjects(false);
        console.log(error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitLoading(true);

    await api
      .put(`/atividade/${id}`, {
        descricao: String(description),
        projeto_id: Number(selectedProject),
      })
      .then((resp) => {
        alert("Atividade alterada com sucesso");
        setSubmitLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setSubmitLoading(false);

        alert("Ops! Tente novamente");
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
          <div className="mb-4">
            <Link to="/">Voltar</Link>
          </div>

          <Form className="w-50" onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreva uma descição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="project">
              <Form.Label>
                Escolha um projeto{" "}
                {loadingProjects ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  ""
                )}
              </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedProject(e.target.value)}
                value={selectedProject}
                required
              >
                {projects.map((proj) => (
                  <option value={proj.id} key={proj.id}>
                    {proj.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {submitLoading ? "Salvando ..." : "Salvar"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}

export default AtividadesEdit;
