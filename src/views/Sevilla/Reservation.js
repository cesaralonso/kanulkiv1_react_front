import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import moment from "moment";

import {
  ClubHouseReservationsAPI,
  TenantsAPI,
  PAYMENT_METHODS_URL,
} from "../../constants/api";
import { SevillaURL } from "../../constants/routes";
import { formatCurrency } from "../../constants/utils";

export default class SevillaReservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading reservation?
      isLoading: true,

      // Reservation info
      reservation: {
        id: 0,
        tenant_id: 0,
        condo_id: 0,
        date: "",
        turn: "",
        cost: 0,
        deposit: 0,
        refund: 0,
        created_at: "",
        updated_at: "",
        event_type: "",
        number_of_people: 0,
        approved: 0,
      },

      // Tenant info
      tenant: {
        user_id: "",
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

      // Payment description
      payment_description: "",

      // Payment methods list
      payment_methods: [],

      // Selected payment method
      payment_method: "0",
    };

    // Bind methods
    this.getReservation = this.getReservation.bind(this);
    this.getTenant = this.getTenant.bind(this);
    this.getPaymentMethods = this.getPaymentMethods.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getReservation();
    this.getPaymentMethods();
  }

  /**
   * Get reservation.
   */
  async getReservation() {
    try {
      const { reservation_id } = this.props.match.params;

      const response = await fetch(
        ClubHouseReservationsAPI.getReservationById(reservation_id)
      );

      const result = await response.json();

      this.setState({ reservation: result.reservation }, this.getTenant);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get Tenant.
   */
  async getTenant() {
    try {
      // Get Tenant ID
      const { tenant_id } = this.state.reservation;

      if (tenant_id !== 1) {
        // Get Tenant by ID request
        const response = await fetch(TenantsAPI.byTenantId(tenant_id));

        // Get request result
        const result = await response.json();

        // Update state
        this.setState({ tenant: result[0], isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  /**
   * Get payment methods.
   */
  async getPaymentMethods() {
    try {
      // Get Tenant by ID request
      const response = await fetch(PAYMENT_METHODS_URL);

      // Get request result
      const result = await response.json();

      this.setState({ payment_methods: result });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * OnChange input event.
   * @param {*} e
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * OnSubmit form event.
   * @param {*} e
   */
  async onSubmit(e) {
    e.preventDefault();

    const { payment_description, payment_method, reservation } = this.state;

    if (payment_method === "0") {
      alert("Selecciona un método de pago");
    } else {
      try {
        const body = new URLSearchParams();
        body.append("reservation_id", String(reservation.id));
        body.append("payment_description", payment_description);
        body.append("payment_method", payment_method);

        const response = await fetch(ClubHouseReservationsAPI.payment, {
          method: "POST",
          body,
        });

        const result = await response.json();

        if (result) {
          alert("El pago se ha guardado con éxito");

          this.props.history.push(SevillaURL.CLUB_HOUSE);
        }
      } catch (error) {
        alert("Hubo un problema para guardar el pago. Intente más tarde");
        console.log(error);
      }
    }
  }

  render() {
    // Get state
    const { payment_methods, reservation, tenant } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header as="h6">
            {/* Title */}
            <i className="fa fa-glass"></i> Casa club - Reservación{" "}
            <b>{moment(reservation.date).format("DD-MM-YYYY")}</b>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            <Row>
              {/* Reservation event type */}
              <Col>
                <h6>Tipo de evento</h6>

                <p>{reservation.event_type}</p>
              </Col>

              {/* Reservation created at */}
              <Col>
                <h6>Fecha de registro</h6>

                <p>{moment(reservation.created_at).format("DD-MM-YYYY")}</p>
              </Col>
            </Row>

            <Row>
              {/* Reservation reserved by */}
              <Col>
                <h6>Reservado por</h6>

                {tenant.name ? (
                  <Link to={SevillaURL.RESIDENT_INFO(tenant.user_id)}>
                    <p>
                      {tenant.name || ""} {tenant.last_name || ""}
                    </p>
                  </Link>
                ) : (
                  <p className="font-italic">Sin datos</p>
                )}
              </Col>

              {/* Reservation number of people */}
              <Col>
                <h6>Número de personas</h6>

                <p>{reservation.number_of_people}</p>
              </Col>
            </Row>

            <Row>
              {/* Reservation cost */}
              <Col>
                <h6>Costo</h6>

                <p>${formatCurrency(reservation.cost)}</p>
              </Col>

              {/* Reservation deposit */}
              <Col>
                <h6>Depósito</h6>

                <p>${formatCurrency(reservation.deposit)}</p>
              </Col>
            </Row>

            <Row>
              {/* Reservation approved */}
              <Col>
                <h6>Aprobada</h6>

                {reservation.approved ? (
                  <p>
                    <i className="fa fa-check-circle text-success mr-1"></i> Sí
                  </p>
                ) : (
                  <p>
                    <i className="fa fa-minus-circle text-danger mr-1"></i> No
                  </p>
                )}
              </Col>
            </Row>

            {reservation.approved === 0 && (
              <Form onSubmit={this.onSubmit}>
                <hr />

                <p className="lead" style={{ fontWeight: 500 }}>
                  Registrar pago
                </p>

                <Row>
                  <Col sm="12" lg="4">
                    <Form.Group controlId="payment_method">
                      <Form.Label>Método de pago</Form.Label>

                      <Form.Control
                        as="select"
                        name="payment_method"
                        onChange={this.onChange}
                        required
                        type="select"
                      >
                        <option value="0">Selecciona un método</option>

                        {payment_methods.map(
                          (t, index) =>
                            t.id !== 4 && (
                              <option key={`type-${index}`} value={t.id}>
                                {t.name}
                              </option>
                            )
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col sm="12" lg="6">
                    <Form.Group controlId="payment_description">
                      <Form.Label>Factura / Folio</Form.Label>

                      <Form.Control
                        name="payment_description"
                        onChange={this.onChange}
                        placeholder="Factura / Folio del pago"
                        required
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="mr-1" type="submit" variant="primary">
                  Guardar pago
                </Button>
              </Form>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            <Link to={SevillaURL.CLUB_HOUSE}>
              <Button variant="danger">Regresar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
