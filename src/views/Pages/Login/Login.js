import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
import "./styles.css";

import LogoImage from "../../../assets/img/brand/logo.png";
import { AuthAPI } from "../../../constants/api";
import {
  DASHBOARDBTN,
  ERRORATLOGIN,
  ONLYADMINUSERSLOGIN,
} from "../../../constants/constants";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
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
    this.login();
  }

  async login() {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      const body = new URLSearchParams();
      body.append("email", this.state.email);
      body.append("password", this.state.password);

      const response = await fetch(AuthAPI.login, {
        method: "POST",
        headers,
        body: body.toString(),
      });

      const result = await response.json();

      if (result && !result.error) {
        localStorage.setItem("token", JSON.stringify(result.user));
        localStorage.setItem("roleId", JSON.stringify(result.user.role_id));
        localStorage.setItem("userId", JSON.stringify(result.user.id));

        if (result.user.role_id === 1) {
          this.props.history.push(DASHBOARDBTN);

          window.location.reload();
        } else {
          alert(ONLYADMINUSERSLOGIN);
        }
      } else {
        alert(ERRORATLOGIN);
      }
    } catch (error) {
      console.log(error);
      alert(ERRORATLOGIN);
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
                      <h1>Iniciar sesión</h1>

                      <p className="text-muted">Ingresa con tu cuenta</p>
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

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      autoComplete="off"
                      autoCapitalize="off"
                      name="password"
                      onChange={this.onChange}
                      placeholder="Contraseña"
                      type="password"
                      value={this.state.password}
                    />
                  </InputGroup>

                  <Row>
                    <Col className="text-center" sm="12" lg="6">
                      <Button className="submit" type="submit" value="submit">
                        Entrar
                      </Button>
                    </Col>

                    <Col className="text-center" sm="12" lg="6">
                      <Link to="/forgot-password">
                        <Button color="link" className="px-0" type="button">
                          ¿Olvidaste tu contraseña?
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

export default Login;
