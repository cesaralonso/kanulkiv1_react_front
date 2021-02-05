import React, { Component } from "react";
import * as Constants from "../../../constants/constants";
import { Link } from "react-router-dom";
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
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businessName: "",
      semadetNumber: "",
      rfc: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenceFile: "",
      fiscalAddress: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (this.state.password != this.state.confirmPassword) {
      alert("Las contraseñas no coinciden");
    } else {
      console.log(this.state);
      /*fetch(Constants.APIURLBASE + 'register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',  
        }, 
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
           alert('Usuario creado correctamente');
           this.props.history.push('/login');
        }); */

      const formData = new FormData();
      formData.append("business_name", this.state.businessName);
      formData.append("SEMADET_number", this.state.semadetNumber);
      formData.append("rfc", this.state.rfc);
      formData.append("phone", this.state.phone);
      formData.append("contact", this.state.contact);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      formData.append("confirmPassword", this.state.confirmPassword);
      formData.append("licenceFile", this.state.licenceFile);
      formData.append("fiscal_address", this.state.fiscalAddress);
      formData.append("status", false);

      axios
        .post(Constants.APIURLBASE + "recollectors", formData)
        .then((response) => {
          this.props.history.push("/registerSuccess");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    event.preventDefault();
  }

  handleText(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  fileChangedHandler = (event) => {
    this.setState({ licenceFile: event.target.files[0] });
  };

  render() {
    const centerScreen = {
      //width: '100%',
      // height: '100%',
      //display: 'flex',
      //alignItems: 'center' /*centers items on the cross-axis (y by default)*/
    };

    return (
      <>
        {/*<div className="app flex-row align-items-center"> */}
        <div style={centerScreen}>
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Registro</h1>
                      <p className="text-muted">
                        {Constants.TXTBEFOREREGISTRATION}
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Nombre"
                          autoComplete="nameLegalOwner"
                          name="contact"
                          id="contact"
                          onChange={(e) => this.handleText(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Correo Electrónico"
                          autoComplete="email"
                          name="email"
                          id="email"
                          onChange={(e) => this.handleText(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          autoComplete="new-password"
                          name="password"
                          id="password"
                          onChange={(e) => this.handleText(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirmar Contraseña"
                          autoComplete="new-password"
                          name="confirmPassword"
                          onChange={(e) => this.handleText(e)}
                        />
                      </InputGroup>
                      &nbsp;
                      <Button
                        type="submit"
                        value="submit"
                        color="success"
                        block
                      >
                        Registrarse
                      </Button>
                      &nbsp;
                      <Link to="/">
                        <Button color="warning" block>
                          Cancelar
                        </Button>
                      </Link>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Register;
