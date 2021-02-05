import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";

import logo from "../../../assets/img/brand/logo_redi_clean_blue.png";

class RegisterSuccess extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <img alt="Logo" src={logo} />
          </Row>
          <Row className="justify-content-center">
            <h2>
              Su información ha sido recibida y en breve nos contactaremos con
              usted.
            </h2>
          </Row>
          <Row className="justify-content-center">
            <p>Atte. El equipo de REDI</p>
          </Row>
          <Row className="justify-content-center">
            <Link to="/">
              <Button color="primary">Regresar a la pagina principal</Button>
            </Link>
          </Row>
        </Container>
      </div>
    );
  }
}

export default RegisterSuccess;
