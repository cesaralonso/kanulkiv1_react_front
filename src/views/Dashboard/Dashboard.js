import React, { Component } from "react";
import { Card, Col, Row } from "reactstrap";

import { CondosAPI, TenantsAPI, UsersAPI } from "../../constants/api";
import { TITLEAPP, CONDO } from "../../constants/constants";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // User ID
      userId: localStorage.getItem("userId"),

      // User role ID
      roleId: localStorage.getItem("roleId"),

      // Total users
      total_users: 0,

      // Total condos
      total_condos: 0,

      // Total debtor residents
      total_debtors: 0,

      // Total up to date residents
      total_up_to_date: 0,
    };

    this.getMetrics = this.getMetrics.bind(this);
    this.getTotalUsers = this.getTotalUsers.bind(this);
    this.getTotalCondos = this.getTotalCondos.bind(this);
    this.getTotalDebtors = this.getTotalDebtors.bind(this);
    this.getTotalUpToDate = this.getTotalUpToDate.bind(this);
  }

  componentDidMount() {
    this.getMetrics();
  }

  async getMetrics() {
    this.getTotalUsers();
    this.getTotalCondos();
    this.getTotalDebtors();
    this.getTotalUpToDate();
  }

  /**
   * Get total users.
   */
  async getTotalUsers() {
    try {
      const response = await fetch(UsersAPI.countTotalEndUsers);

      const result = await response.json();

      this.setState({ total_users: result[0].total_users });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get total condos.
   */
  async getTotalCondos() {
    try {
      const response = await fetch(CondosAPI.countTotalCondos);

      const result = await response.json();

      this.setState({ total_condos: result });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get total debtor residents.
   */
  async getTotalDebtors() {
    try {
      if (this.state.userId === "1") {
        const response = await fetch(TenantsAPI.countTotalDebtors);

        const result = await response.json();

        this.setState({ total_debtors: result.total_debtors });
      } else if (this.state.userId === "257") {
        const response = await fetch(
          TenantsAPI.getTotalDebtorsByCondoId(CONDO.SEVILLA.ID)
        );

        const result = await response.json();

        this.setState({ total_debtors: result.total_debtors });
      } else if (this.state.userId === "258") {
        const response = await fetch(
          TenantsAPI.getTotalDebtorsByCondoId(CONDO.PLUMBAGO.ID)
        );

        const result = await response.json();

        this.setState({ total_debtors: result.total_debtors });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get total up-to-date residents.
   */
  async getTotalUpToDate() {
    try {
      if (this.state.userId === "1") {
        const response = await fetch(TenantsAPI.countTotalUpToDate);

        const result = await response.json();

        this.setState({ total_up_to_date: result[1] });
      } else if (this.state.userId === "257") {
        const response = await fetch(
          TenantsAPI.getTotalUpToDateByCondoId(CONDO.SEVILLA.ID)
        );

        const result = await response.json();

        this.setState({ total_up_to_date: result[1] });
      } else if (this.state.userId === "258") {
        const response = await fetch(
          TenantsAPI.getTotalUpToDateByCondoId(CONDO.PLUMBAGO.ID)
        );

        const result = await response.json();

        this.setState({ total_up_to_date: result[1] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.roleId === "1") {
      return (
        <div className="animated fadeIn">
          <h1>¡Bienvenido a {TITLEAPP}!</h1>

          <Row className="mt-4">
            {/* Total users */}
            {this.state.userId === "1" && (
              <Col sm md={4} lg xl className="d-flex">
                <Card body className="flex-fill" color="info" inverse>
                  <div className="h1 text-muted text-right mb-4">
                    <i className="icon-people"></i>
                  </div>

                  <div className="h4 mb-1">{this.state.total_users}</div>

                  <small className="text-muted text-uppercase font-weight-bold">
                    Usuarios totales
                  </small>
                </Card>
              </Col>
            )}

            {/* Total condos */}
            {this.state.userId === "1" && (
              <Col sm md={4} lg xl className="d-flex">
                <Card body className="flex-fill" color="danger" inverse>
                  <div className="h1 text-muted text-right mb-4">
                    <i className="icon-pie-chart"></i>
                  </div>

                  <div className="h4 mb-1">{this.state.total_condos}</div>

                  <small className="text-muted text-uppercase font-weight-bold">
                    Condominios
                  </small>
                </Card>
              </Col>
            )}

            {/* Total debtor residents */}
            <Col sm md={4} lg xl className="d-flex">
              <Card body className="flex-fill" color="success" inverse>
                <div className="h1 text-muted text-right mb-4">
                  <i className="icon-user-follow"></i>
                </div>

                <div className="h4 mb-1">{this.state.total_debtors}</div>

                <small className="text-muted text-uppercase font-weight-bold">
                  Residentes morosos
                </small>
              </Card>
            </Col>

            {/* Total up-to-date */}
            <Col sm md={4} lg xl className="d-flex">
              <Card body className="flex-fill" color="warning" inverse>
                <div className="h1 text-muted text-right mb-4">
                  <i className="icon-speech"></i>
                </div>

                <div className="h4 mb-1">{this.state.total_up_to_date}</div>

                <small className="text-muted text-uppercase font-weight-bold">
                  Residentes que han pagado
                </small>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Dashboard;
