import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Row,
  Table,
} from "reactstrap";
import { BeatLoader } from "react-spinners";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import { HOUSE_PAYMENTS_BY_ID_URL, HOUSE_URL } from "../../constants/api";

export default class SevillaHouseInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingHouse: true,
      isLoadingPayment: true,
      house: {},
      payments: {},
    };

    this.getHouse = this.getHouse.bind(this);
    this.getPayments = this.getPayments.bind(this);
  }

  componentDidMount() {
    this.getHouse();
    this.getPayments();
  }

  /**
   * Get house info.
   */
  async getHouse() {
    try {
      // Get House ID
      const { house_id } = this.props.match.params;

      const response = await fetch(HOUSE_URL + house_id);

      const result = await response.json();

      console.log("Casa", result);

      this.setState({ house: result, isLoadingHouse: false });
    } catch (error) {
      this.setState({ isLoadingHouse: false });

      console.log(error);
    }
  }

  /**
   * Get payments.
   */
  async getPayments() {
    try {
      // Get House ID
      const { house_id } = this.props.match.params;

      const response = await fetch(HOUSE_PAYMENTS_BY_ID_URL + house_id);

      const result = await response.json();

      console.log("Pagos", result);

      this.setState({ payments: result, isLoadingPayment: false });
    } catch (error) {
      this.setState({ isLoadingPayment: false });

      console.log(error);
    }
  }

  /**
   * OnClick Back button event.
   */
  onClickBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const { isLoadingHouse, isLoadingPayment, house, payments } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Detalle de casa
          </CardHeader>

          <CardBody>
            {isLoadingHouse || isLoadingPayment ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <>
                {/* House info section */}
                <h5 className="text-primary mb-3">Información de la casa</h5>

                <Form>
                  <Row>
                    <Col sm={12} md={6} lg={4}>
                      <h6>Nombre</h6>

                      <p>{house.name}</p>
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                      <h6>Descripción</h6>

                      <p>{house.description}</p>
                    </Col>
                  </Row>
                </Form>

                {/* House maintenances section */}
                <h5 className="text-primary mb-3">Mantenimientos</h5>

                <Table responsive striped>
                  <thead>
                    <tr>
                      <th className="w-10" scope="row">
                        Mes
                      </th>
                      <th className="w-10">Enero</th>
                      <th className="w-10">Febrero</th>
                      <th className="w-10">Marzo</th>
                      <th className="w-10">Abril</th>
                      <th className="w-10">Mayo</th>
                      <th className="w-10">Junio</th>
                      <th className="w-10">Julio</th>
                      <th className="w-10">Agosto</th>
                      <th className="w-10">Septiembre</th>
                      <th className="w-10">Octubre</th>
                      <th className="w-10">Noviembre</th>
                      <th className="w-10">Diciembre</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th className="w-10" scope="row">
                        Mes
                      </th>
                      <td className="w-10">$ {payments.m1 || "0.00"}</td>
                      <td className="w-10">$ {payments.m2 || "0.00"}</td>
                      <td className="w-10">$ {payments.m3 || "0.00"}</td>
                      <td className="w-10">$ {payments.m4 || "0.00"}</td>
                      <td className="w-10">$ {payments.m5 || "0.00"}</td>
                      <td className="w-10">$ {payments.m6 || "0.00"}</td>
                      <td className="w-10">$ {payments.m7 || "0.00"}</td>
                      <td className="w-10">$ {payments.m8 || "0.00"}</td>
                      <td className="w-10">$ {payments.m9 || "0.00"}</td>
                      <td className="w-10">$ {payments.m10 || "0.00"}</td>
                      <td className="w-10">$ {payments.m11 || "0.00"}</td>
                      <td className="w-10">$ {payments.m12 || "0.00"}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </CardBody>

          <CardFooter>
            <Button color="danger mr-2" onClick={this.onClickBack}>
              Regresar
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
