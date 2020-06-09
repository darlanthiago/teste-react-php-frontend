import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";

import api from "../../services/api";
import { useHistory, Link } from "react-router-dom";

function AtividadesCreate() {
  const history = useHistory();
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

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
      .post("/atividade", {
        descricao: String(description),
        projeto_id: Number(selectedProject),
      })
      .then((resp) => {
        alert("Atividade criada com sucesso");
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
            {loadingProjects ? <Spinner animation="border" size="sm" /> : ""}
          </Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedProject(e.target.value)}
            value={selectedProject}
            required
          >
            <option>Selecione um projeto</option>
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
    </Container>
  );
}

export default AtividadesCreate;
