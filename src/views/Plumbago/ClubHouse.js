import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { Card, Modal, Nav, Button, Form, InputGroup } from "react-bootstrap";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import { ClubHouseReservationsAPI, UsersAPI } from "../../constants/api";
import { CONDO } from "../../constants/constants";
import { PlumbagoURL } from "../../constants/routes";

export default class PlumbagoClubHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading events?
      isLoading: true,

      // Events list
      events: [],

      // Show modal?
      show: false,

      // Selected date
      date: "",

      // Tenant list
      tenants: [],

      // Tenant ID
      tenant_id: "0",

      // Event type
      event_type: "",

      // Event cost
      cost: "0.00",

      // Event deposit
      deposit: "0.00",

      // Event number of people
      number_of_people: "0",
    };

    this.getReservations = this.getReservations.bind(this);
    this.dateClick = this.dateClick.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.eventRender = this.eventRender.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getReservations();
    this.getTenants();
  }

  /**
   * Get reservations.
   */
  async getReservations() {
    try {
      const response = await fetch(
        ClubHouseReservationsAPI.byCondoId(CONDO.PLUMBAGO.ID)
      );

      const result = await response.json();

      const events = result.reservations.map(
        ({ id, event_type, date, approved }) => ({
          title: event_type,
          start: date,
          backgroundColor: "#2f353a",
          borderColor: "#2f353a",
          textColor: "#FFF",
          allDay: true,
          extendedProps: {
            id,
            approved: approved ? "Aprobada" : "Pendiente",
          },
        })
      );

      this.setState({ events });
    } catch (error) {
      console.log(error);
    }
  }

  async getTenants() {
    try {
      const response = await fetch(UsersAPI.usersByCondoId(CONDO.PLUMBAGO.ID));

      const result = await response.json();

      this.setState({ tenants: result });
    } catch (error) {
      console.log(error);
    }
  }

  dateClick({ dateStr }) {
    const hasEvent = this.state.events.filter((event) => {
      const date = moment(event.start).format("YYYY-MM-DD");

      return date === dateStr;
    });

    if (hasEvent.length === 0) {
      this.setState({ date: dateStr }, this.handleShow);
    }
  }

  /**
   * Event click event.
   * @param {*} param0
   */
  eventClick({ event }) {
    this.props.history.push(PlumbagoURL.RESERVATION(event.extendedProps.id));
  }

  /**
   * Custom event render.
   * @param {*} param0
   */
  eventRender({ event, el }) {
    const content = (
      <div className="p-1" style={{ cursor: "pointer" }}>
        <div>{event.title}</div>

        <div className="font-weight-light">{event.extendedProps.approved}</div>
      </div>
    );

    ReactDOM.render(content, el);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  /**
   * OnChange input event.
   * @param {*} e
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    const {
      date,
      cost,
      deposit,
      event_type,
      number_of_people,
      tenant_id,
    } = this.state;

    if (tenant_id === "") {
      alert("Selecciona un residente");
    } else if (event_type === "") {
      alert("Ingresa el tipo de evento");
    } else if (cost === "") {
      alert("Ingresa el costo");
    } else if (parseFloat(cost) < 0) {
      alert("El costo debe ser mayor a cero");
    } else if (deposit === "") {
      alert("Ingresa el depósito");
    } else if (parseFloat(deposit) < 0) {
      alert("El depósito debe ser mayor a cero");
    } else if (number_of_people === "") {
      alert("Ingresa el número de personas");
    } else if (parseFloat(number_of_people) < 0) {
      alert("El número de personas debe ser mayor a cero");
    } else {
      try {
        const body = new FormData();
        body.append("tenant_id", tenant_id);
        body.append("condo_id", CONDO.PLUMBAGO.ID);
        body.append("date", date);
        body.append("turn", "2");
        body.append("cost", cost);
        body.append("deposit", deposit);
        body.append("refund", "0");
        body.append("event_type", event_type);
        body.append("number_of_people", number_of_people);
        body.append("card_index", "0");

        const response = await fetch(ClubHouseReservationsAPI.index, {
          method: "POST",
          body,
        });

        const result = await response.json();

        if (result.reservation) {
          alert("La reservación se ha guardado con éxito.");

          this.setState(
            {
              tenant_id: "0",
              event_type: "",
              cost: "0.00",
              deposit: "0.00",
              number_of_people: "0",
            },
            this.handleClose
          );

          this.getReservations();
          this.getTenants();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header>
            {/* Title */}
            <h6 className="mb-4">
              <i className="fa fa-glass"></i> {CONDO.PLUMBAGO.NAME} - Casa club
            </h6>

            {/* Nav tabs */}
            <Nav variant="tabs">
              {/* Condo tab */}
              <Nav.Item>
                <Nav.Link as={NavLink} exact={true} to={PlumbagoURL.INDEX}>
                  <i className="fa fa-building-o mr-1"></i> Condominio
                </Nav.Link>
              </Nav.Item>

              {/* Houses tab */}
              <Nav.Item>
                <Nav.Link as={NavLink} exact={true} to={PlumbagoURL.HOUSES}>
                  <i className="fa fa-home mr-1"></i> Casas
                </Nav.Link>
              </Nav.Item>

              {/* Club house tab */}
              <Nav.Item>
                <Nav.Link as={NavLink} exact={true} to={PlumbagoURL.CLUB_HOUSE}>
                  <i className="fa fa-glass mr-1"></i> Casa club
                </Nav.Link>
              </Nav.Item>

              {/* Residents tab */}
              <Nav.Item>
                <Nav.Link as={NavLink} exact={true} to={PlumbagoURL.RESIDENTS}>
                  <i className="fa fa-address-book-o mr-1"></i> Residentes
                </Nav.Link>
              </Nav.Item>

              {/* Add user tab */}
              <Nav.Item>
                <Nav.Link as={NavLink} exact={true} to={PlumbagoURL.ADD_USER}>
                  <i className="fa fa-plus mr-1"></i> Crear usuario
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            <FullCalendar
              bootstrapFontAwesome={true}
              dateClick={this.dateClick}
              eventClick={this.eventClick}
              eventRender={this.eventRender}
              events={this.state.events}
              header={{
                left: "prev, next today",
                center: "title",
                right: "dayGridMonth, listWeek",
              }}
              initialView="dayGridMonth"
              locale={esLocale}
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              themeSystem="bootstrap"
            />
          </Card.Body>
        </Card>

        <Modal
          backdrop="static"
          keyboard={false}
          centered
          scrollable
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crear reservación</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-4">
            <h6>Fecha seleccionada</h6>

            <p>
              {moment(this.state.date).format("dddd DD [de] MMMM [del] YYYY")}
            </p>

            <Form>
              <Form.Group controlId="tenant_id">
                <Form.Label>Reservado por</Form.Label>

                <Form.Control
                  as="select"
                  name="tenant_id"
                  onChange={this.onChange}
                  type="select"
                  value={this.state.tenant_id}
                >
                  <option value="0">Selecciona un residente</option>

                  {this.state.tenants.map((tenant, index) => (
                    <option key={`tenant-${index}`} value={tenant.id}>
                      {tenant.name} {tenant.last_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="event_type">
                <Form.Label>Tipo de evento</Form.Label>

                <Form.Control
                  name="event_type"
                  onChange={this.onChange}
                  placeholder="Tipo de evento"
                  type="text"
                  value={this.state.event_type}
                />
              </Form.Group>

              <Form.Group controlId="cost">
                <Form.Label>Costo</Form.Label>

                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-usd fa-lg"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>

                  <Form.Control
                    min={0}
                    name="cost"
                    onChange={this.onChange}
                    placeholder="Costo"
                    type="number"
                    value={this.state.cost}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="deposit">
                <Form.Label>Depósito</Form.Label>

                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-usd fa-lg"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>

                  <Form.Control
                    min={0}
                    name="deposit"
                    onChange={this.onChange}
                    placeholder="Depósito"
                    type="number"
                    value={this.state.deposit}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="number_of_people">
                <Form.Label>Número de personas</Form.Label>

                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-users"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>

                  <Form.Control
                    min={0}
                    name="number_of_people"
                    onChange={this.onChange}
                    placeholder="Número de personas"
                    type="number"
                    value={this.state.number_of_people}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.onSubmit} variant="primary">
              Crear reservación
            </Button>

            <Button onClick={this.handleClose} variant="danger">
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
