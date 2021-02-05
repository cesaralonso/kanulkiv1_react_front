import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { BeatLoader } from "react-spinners";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import DataTable from "../../components/DataTable";
import { TenantsAPI, UsersAPI } from "../../constants/api";
import {
  CONDO,
  ResidentsHeaders,
  TableClasses,
  TableLabels,
} from "../../constants/constants";
import { SevillaURL } from "../../constants/routes";

export default class SevillaTenants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading Tenants?
      isLoading: true,

      // Tenants list
      tenants: [],

      // Tenants filter
      tenants_filter: "all",
    };

    this.getTenants = this.getTenants.bind(this);
    this.getDebtors = this.getDebtors.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  componentDidMount() {
    this.getTenants();
  }

  async getTenants() {
    try {
      const response = await fetch(UsersAPI.usersByCondoId(CONDO.SEVILLA.ID));

      const result = await response.json();

      this.setState({ tenants: result, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });

      console.log(error);
    }
  }

  async getDebtors() {
    try {
      const response = await fetch(
        TenantsAPI.debtorsByCondoId(CONDO.SEVILLA.ID)
      );

      const result = await response.json();

      this.setState({ tenants: result.debtors, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });

      console.log(error);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.tenants_filter === "all") {
        this.setState({ isLoading: true }, this.getTenants);
      } else {
        this.setState({ isLoading: true }, this.getDebtors);
      }
    });
  }

  onRowClick(resident) {
    this.props.history.push(SevillaURL.RESIDENT_INFO(resident.user_id));
  }

  render() {
    // Get state
    const { isLoading, tenants, tenants_filter } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                {/* Title */}
                <h6 className="mb-4">
                  <i className="fa fa-address-book-o mr-1"></i>{" "}
                  {CONDO.SEVILLA.NAME} - Residentes
                </h6>

                {/* Nav tabs */}
                <Nav tabs>
                  {/* Condo tab */}
                  <NavItem>
                    <NavLink exact={true} tag={RRNavLink} to={SevillaURL.INDEX}>
                      <i className="fa fa-building-o mr-1"></i> Condominio
                    </NavLink>
                  </NavItem>

                  {/* Houses tab */}
                  <NavItem>
                    <NavLink
                      exact={true}
                      tag={RRNavLink}
                      to={SevillaURL.HOUSES}
                    >
                      <i className="fa fa-home mr-1"></i> Casas
                    </NavLink>
                  </NavItem>

                  {/* Club house tab */}
                  <NavItem>
                    <NavLink
                      exact={true}
                      tag={RRNavLink}
                      to={SevillaURL.CLUB_HOUSE}
                    >
                      <i className="fa fa-glass mr-1"></i> Casa club
                    </NavLink>
                  </NavItem>

                  {/* Residents tab */}
                  <NavItem>
                    <NavLink
                      exact={true}
                      tag={RRNavLink}
                      to={SevillaURL.RESIDENTS}
                    >
                      <i className="fa fa-address-book-o mr-1"></i> Residentes
                    </NavLink>
                  </NavItem>

                  {/* Add user tab */}
                  <NavItem>
                    <NavLink
                      exact={true}
                      tag={RRNavLink}
                      to={SevillaURL.ADD_USER}
                    >
                      <i className="fa fa-plus mr-1"></i> Crear usuario
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>

              <CardBody>
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <BeatLoader color="#006cb4" size={32} />
                  </div>
                ) : tenants.length > 0 ? (
                  <>
                    {/* Table filters */}
                    <Form>
                      <Row>
                        {/* Tenants filter */}
                        <Col sm={12} md={6} lg={4}>
                          <FormGroup row>
                            <Label className="text-center" sm={3}>
                              Filtrar:{" "}
                            </Label>

                            <Col sm={9}>
                              <Input
                                name="tenants_filter"
                                onChange={this.onChange}
                                type="select"
                                value={tenants_filter}
                              >
                                <option value="all">
                                  Todos los residentes
                                </option>
                                <option value="debtors">Deudores</option>
                              </Input>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>

                    <DataTable
                      classes={TableClasses}
                      labels={{
                        ...TableLabels,
                        filterPlaceholder: "Buscar residente...",
                      }}
                      onRowClick={this.onRowClick}
                      rowsPerPage={10}
                      rowsPerPageOption={[10, 15, 20]}
                      tableBody={tenants}
                      tableHeaders={ResidentsHeaders}
                    />
                  </>
                ) : (
                  <p className="lead">No hay residentes registrados</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
