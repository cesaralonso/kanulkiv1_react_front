import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Card, Col, Image, Nav, Row } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import { BASE_API_URL, CondosAPI, CondoFeesAPI } from "../../constants/api";
import { CONDO } from "../../constants/constants";
import { PlumbagoURL } from "../../constants/routes";

export default class Plumbago extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading info?
      isLoadingCondo: true,

      // Is loading info?
      isLoadingFees: true,

      // Condo info
      condo: {
        id: 0,
        image: "",
        name: "",
        description: "",
        phone: "",
      },

      // Condo fees
      fees: {},
    };

    this.getCondo = this.getCondo.bind(this);
    this.getFees = this.getFees.bind(this);
  }

  componentDidMount() {
    this.getCondo();
    this.getFees();
  }

  /**
   * Get Condo info.
   */
  async getCondo() {
    try {
      const response = await fetch(CondosAPI.condoById(CONDO.PLUMBAGO.ID));

      const result = await response.json();

      this.setState({ condo: result, isLoadingCondo: false });
    } catch (error) {
      this.setState({ isLoadingCondo: false });

      console.log(error);
    }
  }

  /**
   * Get Condo Fees.
   */
  async getFees() {
    try {
      const response = await fetch(CondoFeesAPI.feeById(CONDO.PLUMBAGO.ID));

      const result = await response.json();

      this.setState({ fees: result, isLoadingFees: false });
    } catch (error) {
      this.setState({ isLoadingFees: false });

      console.log(error);
    }
  }

  render() {
    // Get state
    const { condo, fees, isLoadingCondo, isLoadingFees } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header>
            {/* Title */}
            <h6 className="mb-4">
              <i className="fa fa-building-o mr-1"></i> {CONDO.PLUMBAGO.NAME}
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
            {isLoadingCondo || isLoadingFees ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <>
                {/* Condo information section */}
                <h5 className="text-primary mb-3">
                  Información del condominio
                </h5>

                {/* Cover photo */}
                <h6>Portada</h6>

                <div className="mb-3">
                  <Image
                    alt=" Sin portada"
                    src={`${BASE_API_URL}/${condo.image}`}
                    width="175px"
                  />
                </div>

                {/* Condo info section */}
                <Row className="mb-2">
                  {/* Condo name */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Nombre</h6>

                    <p>{condo.name}</p>
                  </Col>

                  {/* Condo description */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Descripción del lugar</h6>

                    <p>{condo.description}</p>
                  </Col>

                  {/* Condo legal name */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Nombre legal</h6>

                    <p>{condo.legal_name}</p>
                  </Col>
                </Row>

                {/* Condo address section */}
                <Row className="mb-2">
                  {/* Condo address */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Dirección</h6>

                    <p>{condo.address}</p>
                  </Col>

                  {/* Condo locality */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Colonia</h6>

                    <p>{condo.county}</p>
                  </Col>

                  {/* Condo city */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Ciudad</h6>

                    <p>{condo.city}</p>
                  </Col>
                </Row>

                {/* Condo contact section */}
                <Row className="mb-2">
                  {/* Condo phone */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Teléfono</h6>

                    <p>{condo.phone}</p>
                  </Col>
                </Row>

                {/* Condo fees section */}
                <h5 className="text-primary mb-3">Cuotas de mantenimiento</h5>

                {/* Condo maintenance section */}
                <Row className="mb-2">
                  {/* Condo maintenance */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Mantenimiento</h6>

                    <p>${fees.maintenance}</p>
                  </Col>

                  {/* Condo interest */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Interés (revolvente)</h6>

                    <p>${fees.interest}</p>
                  </Col>

                  {/* Condo payment day */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Último día de pago</h6>

                    <p>{fees.last_payment_day}</p>
                  </Col>
                </Row>

                {/* Club house fees */}
                <h6 className="lead mb-3">Casa club</h6>

                {/* Club house fees section */}
                <Row className="mb-2">
                  {/* Club house fee */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Cuota</h6>

                    <p>${fees.club_house_morning}</p>
                  </Col>

                  {/* Club house guaranty */}
                  <Col sm="12" md="6" lg="4">
                    <h6>Fianza</h6>

                    <p>${fees.casa_club_deposit}</p>
                  </Col>
                </Row>

                {/* Last update */}
                <h6>Última actualización</h6>

                <p>{moment(fees.updated_at).format("DD-MM-YYYY HH:mm:ss")}</p>
              </>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Edit condo */}
            <Link to={PlumbagoURL.EDIT_CONDO}>
              <Button className="mr-2" variant="primary">
                Editar condominio
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
