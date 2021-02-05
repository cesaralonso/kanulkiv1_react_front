import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Button, Card, Col, Nav, Row, Table} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';
import moment from 'moment';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import './styles.css';

import {BASE_API_URL, TenantChargesAPI, TenantsAPI} from '../../constants/api';
import {PlumbagoURL} from '../../constants/routes';

export default class PlumbagoTenantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading Tenant info?
      isLoadingTenant: true,

      // Tenant info
      tenant: {
        user_id: '',
        image: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        rfc: '',
        address: '',
        created_at: '',
        updated_at: '',
      },

      // Is loading balances?
      isLoadingBalances: true,

      balances: {
        balance: '0.00',
        pending_charges: [
          {
            id: 0,
            tenant_id: 0,
            house_id: 0,
            description: '',
            month: '',
            year: '',
            type: 0,
            amount: 0,
            paid: 0,
            tenant_payment_id: null,
            created_at: '',
            updated_at: '',
          },
        ],
      },
    };

    this.getTenant = this.getTenant.bind(this);
    this.getTenantBalances = this.getTenantBalances.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
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

      // Get request result
      const result = await response.json();

      // Update state
      this.setState({tenant: result[0], isLoadingTenant: false}, () => {
        this.getTenantBalances();
      });
    } catch (error) {
      this.setState({isLoadingTenant: false});
    }
  }

  /**
   * Get balances.
   */
  async getTenantBalances() {
    try {
      // Get Tenant
      const {tenant} = this.state;

      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.balanceDetailById(tenant.id));

      // Get request result
      const result = await response.json();

      // Update state
      this.setState({balances: result, isLoadingBalances: false});
    } catch (error) {
      this.setState({isLoadingBalances: false});
    }
  }

  /**
   * Delete charge.
   * @param id - Charge ID.
   */
  async delete(id) {
    if (
      window.confirm(
        '¿Estás seguro que deseas eliminar el cargo? Esta acción no se puede deshacer.',
      )
    ) {
      try {
        const response = await fetch(TenantChargesAPI.byId(id), {
          method: 'DELETE',
        });

        if (response) {
          this.getTenantBalances();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * OnClick Back button event.
   */
  onClickBack() {
    this.props.history.goBack();
  }

  render() {
    // Get state
    const {balances, isLoadingBalances, isLoadingTenant, tenant} = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header>
            {/* Title */}
            <h6 className="mb-4">
              <i className="fa fa-user-o mr-1"></i> Información de{' '}
              <span className="font-weight-bold">{tenant.name}</span>
            </h6>

            {/* Nav tabs */}
            <Nav variant="tabs">
              {/* Condo tab */}
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  exact={true}
                  to={PlumbagoURL.RESIDENT_INFO(tenant.user_id)}>
                  <i className="fa fa-user-o mr-1"></i> Información
                </Nav.Link>
              </Nav.Item>

              {/* Houses tab */}
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  exact={true}
                  to={PlumbagoURL.RESIDENT_PAYMENTS(tenant.user_id)}>
                  <i className="fa fa-history mr-1"></i> Histórico de pagos
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            <h5 className="text-primary mb-2">Información personal</h5>

            {isLoadingTenant ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <>
                <Row>
                  <Col sm="12" md="6" lg="4">
                    {/* Profile picture */}
                    <h6>Foto de perfil</h6>

                    <img
                      alt=" "
                      className="mb-3"
                      id="actual_photo"
                      name="actual_photo"
                      src={`${BASE_API_URL}/${tenant.image}`}
                      width="175px"
                    />
                  </Col>
                </Row>

                <Row>
                  {/* Name input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Nombre</h6>

                    <p className="text-muted">{tenant.name}</p>
                  </Col>

                  {/* Last name input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Apellidos</h6>

                    <p className="text-muted">{tenant.last_name}</p>
                  </Col>
                </Row>

                <Row>
                  {/* E-mail input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Correo electrónico</h6>

                    <p className="text-muted">{tenant.email}</p>
                  </Col>

                  {/* Phone input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Teléfono</h6>

                    <p className="text-muted">{tenant.phone}</p>
                  </Col>
                </Row>

                <Row>
                  {/* RFC input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>RFC</h6>

                    <p className="text-muted">{tenant.rfc}</p>
                  </Col>

                  {/* Address input */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Dirección</h6>

                    <p className="text-muted">{tenant.address}</p>
                  </Col>
                </Row>
              </>
            )}

            <h5 className="text-primary mb-2">Saldo</h5>

            {isLoadingBalances ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : balances.pending_charges.length > 0 ? (
              <>
                <h6 className="mb-3">
                  Saldo pendiente: $ {balances.balance.toFixed(2)}
                </h6>

                <Table bordered hover responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Pagado</th>
                      <th>Mes</th>
                      <th>Año</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {balances.pending_charges.map((balance, index) => (
                      <tr key={`balance-${index}`}>
                        <td>{index + 1}</td>

                        <td>{balance.description}</td>

                        <td>${parseFloat(balance.amount).toFixed(2)}</td>

                        <td>${parseFloat(balance.paid).toFixed(2)}</td>

                        <td className="balance-month">
                          {moment(balance.month, 'MM').format('MMMM')}
                        </td>

                        <td>{balance.year}</td>

                        <td className="text-center" width={100}>
                          {/* Delete charge button */}
                          <Button
                            onClick={() => this.delete(balance.id)}
                            size="sm"
                            variant="danger">
                            <i className="fa fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <p className="lead">No tiene saldo pendiente</p>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Edit button */}
            <Link to={PlumbagoURL.EDIT_RESIDENT(tenant.user_id)}>
              <Button className="mr-2 mb-2 mb-md-0" variant="primary">
                Editar información
              </Button>
            </Link>

            {/* Edit button */}
            <Link to={PlumbagoURL.editPassword(tenant.user_id)}>
              <Button className="mr-2 mb-2 mb-md-0" variant="info">
                <i className="fa fa-lock"></i> Editar contraseña
              </Button>
            </Link>

            {/* Add charge */}
            <Link to={PlumbagoURL.ADD_CHARGE(tenant.user_id)}>
              <Button className="mr-2 mb-2 mb-md-0" variant="success">
                Generar cargo / pago
              </Button>
            </Link>

            {/* Account status */}
            <a href={TenantsAPI.pendingPDF(tenant.id)}>
              <Button className="mr-2 mb-2 mb-md-0" variant="dark">
                <i className="fa fa-download mr-2"></i> Estado de cuenta
              </Button>
            </a>

            {/* Cancel button */}
            <Button
              className="mr-2 mb-2 mb-md-0"
              onClick={this.onClickBack}
              variant="danger">
              Regresar
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
