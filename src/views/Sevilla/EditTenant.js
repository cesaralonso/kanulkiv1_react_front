import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import { BASE_API_URL, TenantsAPI } from "../../constants/api";
import { ERRORSAVING, SUCCESSFULSAVING } from "../../constants/constants";
import { SevillaURL } from "../../constants/routes";

export default class SevillaEditTenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: true,

      // Tenant info
      tenant: {
        image: "",
        name: "",
        last_name: "",
        email: "",
        phone: "",
        rfc: "",
        address: "",
        created_at: "",
        updated_at: "",
      },

      // Tenant image
      image: "",

      // Tenant name
      name: "",

      // Tenant last name
      last_name: "",

      // Tenant e-mail
      email: "",

      // Tenant phone
      phone: "",

      // Tenant RFC
      rfc: "",

      // Tenant name
      address: "",

      // Is saving?
      isSaving: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.isSaving = this.isSaving.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.getTenant();
  }

  /**
   * Get Tenant
   */
  async getTenant() {
    try {
      // Get Tenant ID
      const { tenant_id } = this.props.match.params;
      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.tenantById(tenant_id));
      // Get request result
      const result = await response.json();

      // Update state
      this.setState({
        tenant: result[0],
        name: result[0].name,
        last_name: result[0].last_name,
        email: result[0].email,
        phone: result[0].phone,
        rfc: result[0].rfc,
        address: result[0].address,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  }

  /**
   * OnChange Input event.
   * @param {*} event - Event.
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * OnChange File input event.
   * @param {*} e - Event.
   */
  onChangeFile(event) {
    this.setState({ image: event.target.files[0] });
  }

  /**
   * Is saving?
   * @param {boolean} isSaving - Is saving?
   * @param {*} callback - Callback function.
   */
  isSaving(isSaving = true, callback = () => {}) {
    this.setState({ isSaving }, callback);
  }

  /**
   * OnSubmit form event.
   */
  onSubmit(e) {
    e.preventDefault();

    this.isSaving(true, this.save);
  }

  /**
   * Submit Save changes request.
   */
  async save() {
    const {
      address,
      email,
      image,
      last_name,
      name,
      phone,
      rfc,
      tenant,
    } = this.state;

    const body = new FormData();
    body.append("user_id", tenant.user_id);
    body.append("email", email);
    body.append("condo_id", tenant.condo_id);
    body.append("house_id", tenant.house_id);
    body.append("name", name);
    body.append("last_name", last_name);
    body.append("address", address);
    body.append("rfc", rfc);
    body.append("phone", phone);
    if (image) {
      body.append("image", image, image.name);
    } else {
      body.append("image", "");
    }
    body.append("country_id", tenant.country_id);

    try {
      const response = await fetch(TenantsAPI.update, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (result.user && result.tenant) {
        alert(SUCCESSFULSAVING);

        this.props.history.push(SevillaURL.RESIDENT_INFO(tenant.user_id));
      } else {
        alert(
          "Algo salió mal al actualizar la información del residente, intente más tarde."
        );
      }
    } catch (error) {
      console.log(error);

      alert(ERRORSAVING);
    }
  }

  onClickCancel() {
    this.props.history.goBack();
  }

  render() {
    const {
      address,
      email,
      isLoading,
      last_name,
      name,
      phone,
      rfc,
      tenant,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header as="h6">
            <i className="fa fa-pencil"></i> Editar información de{" "}
            <b className="text-primary">{tenant.name}</b>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <Form id="edit-tenant" onSubmit={this.onSubmit}>
                <Row>
                  <Col sm="12" md="5" lg="4">
                    {/* Profile picture */}
                    <Form.Group controlId="image">
                      <Form.Label as="h6">Foto de perfil</Form.Label>

                      <div>
                        <img
                          alt=" Sin foto de perfil"
                          className="mb-3"
                          id="actual_photo"
                          name="actual_photo"
                          src={`${BASE_API_URL}/${tenant.image}`}
                          height="175px"
                        />
                      </div>

                      <Form.Control
                        accept="image/*"
                        onChange={this.onChangeFile}
                        multiple={false}
                        name="image"
                        type="file"
                      />
                    </Form.Group>
                  </Col>

                  <Col sm="12" md="7" lg="8">
                    {/* Tenant name section */}
                    <Row>
                      {/* Name input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="name">
                          <Form.Label as="h6">Nombre</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="Nombre del residente"
                            name="name"
                            required
                            type="text"
                            value={name}
                          />
                        </Form.Group>
                      </Col>

                      {/* Last name input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="last_name">
                          <Form.Label as="h6">Apellidos</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="Apellidos del residente"
                            name="last_name"
                            required
                            type="text"
                            value={last_name}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Tenant contact section */}
                    <Row>
                      {/* E-mail input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="email">
                          <Form.Label as="h6">Correo electrónico</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="Correo electrónico"
                            name="email"
                            required
                            type="email"
                            value={email}
                          />
                        </Form.Group>
                      </Col>

                      {/* Phone input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="phone">
                          <Form.Label as="h6">Teléfono</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="Teléfono"
                            name="phone"
                            required
                            type="text"
                            value={phone}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* RFC input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="rfc">
                          <Form.Label as="h6">RFC</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="RFC"
                            name="rfc"
                            type="text"
                            value={rfc}
                          />
                        </Form.Group>
                      </Col>

                      {/* Address input */}
                      <Col sm="12" md="12" lg="6">
                        <Form.Group controlId="address">
                          <Form.Label as="h6">Dirección</Form.Label>

                          <Form.Control
                            onChange={this.onChange}
                            placeholder="Dirección"
                            name="address"
                            required
                            type="textarea"
                            value={address}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Save button */}
            <Button
              className="mr-2"
              disabled={this.state.isSaving}
              form="edit-tenant"
              type="submit"
              variant="primary"
            >
              Guardar cambios
            </Button>

            {/* Cancel button */}
            <Link to={SevillaURL.RESIDENT_INFO(tenant.user_id)}>
              <Button variant="danger">Cancelar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
