import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';

import {TenantsAPI} from '../constants/api';
import {PlumbagoURL} from '../constants/routes';

export default class PlumbagoEditPassword extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      // Is loading?
      isLoading: true,

      // Tenant info
      tenant: {
        name: '',
        last_name: '',
      },

      // New password
      password: '',

      // Confirm password
      confirm_password: '',

      // Is saving?
      disabled: false,
    };

    // Bind methods
    this.onChange = this.onChange.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      const {tenant_id} = this.props.match.params;

      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.tenantById(tenant_id));

      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Update state
        this.setState({tenant: result[0], isLoading: false});
      } else {
        // Update state
        this.setState({isLoading: false});
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  /**
   * OnChange Input event.
   * @param {*} event - Event.
   */
  onChange({target: {id, value}}) {
    this.setState({[id]: value});
  }

  /**
   * Toggle disabled state.
   * @param {*} callback - Callback function.
   */
  toggleDisabled(callback = () => {}) {
    this.setState({disabled: !this.state.disabled}, callback);
  }

  /**
   * OnSubmit form event.
   */
  onSubmit(e) {
    e.preventDefault();

    // Get component state
    const {tenant, password, confirm_password} = this.state;

    if (password !== confirm_password) {
      alert('Las contraseñas ingresadas no coinciden.');
    } else {
      this.toggleDisabled(async () => {
        try {
          const body = new FormData();
          body.append('user_id', tenant.user_id);
          body.append('password', password);
          body.append('confirm_password', confirm_password);

          const response = await fetch(TenantsAPI.changePassword(), {
            method: 'POST',
            body,
          });

          if (response.status === 200) {
            const result = await response.json();

            if (result.success) {
              alert('La contraseña del usuario se ha cambiado exitosamente.');

              this.props.history.push(
                PlumbagoURL.RESIDENT_INFO(tenant.user_id),
              );
            } else {
              alert(
                'Ha ocurrido un problema al actualizar la contraseña del usuario.',
              );
            }
          } else {
            this.toggleDisabled();

            alert(
              'No se pudo actualizar la contraseña del usuario. Intente más tarde.',
            );
          }
        } catch (error) {
          this.toggleDisabled();

          alert(
            'Ha ocurrido un problema al actualizar la contraseña del usuario.',
          );
        }
      });
    }
  }

  render() {
    // Get component state
    const {isLoading, tenant, password, confirm_password} = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header as="h6">
            <i className="fa fa-lock"></i>
            {' Editar contraseña de '}
            <b className="text-primary">{tenant.name}</b>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <Form id="edit-password" onSubmit={this.onSubmit}>
                <Row>
                  <Col sm="12" md="12" lg="6">
                    {/* E-mail input */}
                    <Form.Group controlId="password">
                      <Form.Label as="h6">Nueva contraseña</Form.Label>

                      <Form.Control
                        onChange={this.onChange}
                        placeholder="Nueva contraseña"
                        required
                        type="password"
                        value={password}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12" md="12" lg="6">
                    {/* E-mail input */}
                    <Form.Group className="mb-1" controlId="confirm_password">
                      <Form.Label as="h6">Confirmar contraseña</Form.Label>

                      <Form.Control
                        onChange={this.onChange}
                        placeholder="Confirmar contraseña"
                        required
                        type="password"
                        value={confirm_password}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Save button */}
            <Button
              className="mr-1"
              disabled={this.state.disabled}
              form="edit-password"
              type="submit"
              variant="primary">
              Guardar contraseña
            </Button>

            {/* Cancel button */}
            <Link to={PlumbagoURL.RESIDENT_INFO(tenant.user_id)}>
              <Button variant="danger">Cancelar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
