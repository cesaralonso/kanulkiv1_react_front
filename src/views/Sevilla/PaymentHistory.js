import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { Card, ListGroupItem, Nav, Button, Table } from "react-bootstrap";
import "./styles.css";

import { TenantPaymentsAPI, TenantsAPI } from "../../constants/api";
import { SevillaURL } from "../../constants/routes";

export default class SevillaPaymentHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenant: { user_id: "" },

      payments: [],
    };

    this.getTenant = this.getTenant.bind(this);
    this.getPaymentDetails = this.getPaymentDetails.bind(this);
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
      this.setState(
        { tenant: result[0], isLoadingTenant: false },
        this.getPaymentDetails
      );
    } catch (error) {
      this.setState({ isLoadingTenant: false });
      console.log(error);
    }
  }

  async getPaymentDetails() {
    try {
      // Get Tenant ID
      const { tenant } = this.state;
      // Get Tenant by ID request
      const response = await fetch(TenantPaymentsAPI.byTenantId(tenant.id));
      // Get request result
      const result = await response.json();

      this.setState({ payments: result.payments, isLoadingPayments: false });
    } catch (error) {
      this.setState({ isLoadingPayments: false });
      console.log(error);
    }
  }

  async delete(id) {
    if (
      window.confirm(
        "¿Estás seguro que deseas eliminar el pago? Esta acción no se puede deshacer."
      )
    ) {
      try {
        const response = await fetch(TenantPaymentsAPI.byId(id), {
          method: "DELETE",
        });

        if (response) {
          window.alert("El pago ha sido eliminado correctamente");

          this.getPaymentDetails();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    // Get state
    const { tenant, payments } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <Card.Header>
            {/* Title */}
            <h6 className="mb-4">
              <i className="fa fa-history mr-1"></i> Histórico de pagos
            </h6>

            {/* Nav tabs */}
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  exact={true}
                  to={SevillaURL.RESIDENT_INFO(tenant.user_id)}
                >
                  <i className="fa fa-address-book-o mr-1"></i> Información
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  exact={true}
                  to={SevillaURL.RESIDENT_PAYMENTS(tenant.user_id)}
                >
                  <i className="fa fa-history px-2"></i>
                  Histórico de pagos
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            {payments.length > 0 &&
              payments.map((payment, index) => (
                <Fragment key={`payment-${index}`}>
                  <ListGroupItem>
                    <h5>
                      Factura / Folio: <b>{payment.payment_description}</b>
                    </h5>

                    <p className="mb-0">${payment.amount}</p>

                    <div className="payment-actions">
                      <Link
                        to={SevillaURL.EDIT_PAYMENT(tenant.user_id, payment.id)}
                      >
                        <Button
                          className="mr-2"
                          size="sm"
                          title="Editar"
                          variant="light"
                        >
                          <i className="fa fa-pencil"></i>
                        </Button>
                      </Link>

                      <a href={TenantPaymentsAPI.download(payment.id)}>
                        <Button
                          className="mr-2"
                          size="sm"
                          title="Descargar"
                          variant="dark"
                        >
                          <i className="fa fa-download"></i>
                        </Button>
                      </a>

                      <Button
                        onClick={() => this.delete(payment.id)}
                        size="sm"
                        variant="danger"
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </div>
                  </ListGroupItem>

                  <Table bordered responsive striped>
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                      </tr>
                    </thead>

                    <tbody>
                      {payment.charges.map((charge, index) => (
                        <tr key={`charge-${index}`}>
                          <th>{index + 1}</th>

                          <td>{charge.description}</td>

                          <td>${charge.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Fragment>
              ))}

            {payments.length === 0 && (
              <p className="lead">No hay pagos registrados</p>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
