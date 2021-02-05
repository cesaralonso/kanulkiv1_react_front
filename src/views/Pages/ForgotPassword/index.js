import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import "./styles.css";

import LogoImage from "../../../assets/img/brand/logo.png";
import { AuthAPI } from "../../../constants/api";

export const history = createHashHistory();

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * OnChange Input event.
   * @param {*} event - Event.
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * OnSubmit Form event.
   * @param {*} event - Event.
   */
  onSubmit(event) {
    event.preventDefault();
    this.submit();
  }

  async submit() {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const body = new URLSearchParams();
      body.append("email", this.state.email);

      const response = await fetch(AuthAPI.forgotPassword, {
        method: "POST",
        headers,
        body: body.toString(),
      });

      const result = await response.json();

      console.log(result);

      if (result) {
        alert(
          "Se ha enviado un correo para recuperar su contraseña. Revise su bandeja de entrada."
        );

        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const token = localStorage.getItem("token");

    if (token != null) {
      return <Redirect to="/" />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Card className="col-sm-12 col-md-8 col-lg-6 p-2">
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                      <h1>¿Olvidaste tu contraseña?</h1>

                      <p className="text-muted">
                        Escribe tu correo electrónico y te enviaremos las
                        instrucciones para cambiarla.
                      </p>
                    </div>

                    <div>
                      <img
                        alt="Kanulki Logo"
                        className="img-fluid ml-2 logo"
                        src={LogoImage}
                      />
                    </div>
                  </div>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      autoComplete="on"
                      autoCapitalize="off"
                      inputMode="email"
                      placeholder="Correo electrónico"
                      name="email"
                      onChange={this.onChange}
                      type="email"
                      value={this.state.email}
                    />
                  </InputGroup>

                  <Row>
                    <Col className="text-center" sm="12" lg="6">
                      <Button className="submit" type="submit" value="submit">
                        Enviar correo
                      </Button>
                    </Col>

                    <Col className="text-center" sm="12" lg="6">
                      <Link to="/login">
                        <Button color="link" className="px-0" type="button">
                          Regresar
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPasswordPage;
