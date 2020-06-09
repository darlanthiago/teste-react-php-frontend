import React, { useState } from "react";

import { Navbar, Form, Button, FormControl } from "react-bootstrap";

import Logo from "../../assets/img/php-react.jpg";
import api from "../../services/api";

function Header() {
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    await api
      .post("/projeto", {
        descricao: String(project),
      })
      .then((resp) => {
        setLoading(false);
        setProject("");
        alert("Projeto criado com sucesso!");
      })
      .catch((error) => {
        setLoading(false);
        alert("Não foi possível criar, tente novamente!");
      });
  }

  return (
    <Navbar bg="light" className="mb-5">
      <Navbar.Brand>
        <img
          alt=""
          src={Logo}
          width="100"
          className="d-inline-block align-top"
        />{" "}
        React + PHP
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Criar projeto"
            className="mr-sm-2"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <Button variant="outline-success" onClick={handleSubmit}>
            {loading ? "Salvando ..." : "Salvar"}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
