import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Card, Nav } from "react-bootstrap";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import DataTable from "../../components/DataTable";
import { HousesAPI } from "../../constants/api";
import {
  CONDO,
  HousesHeaders,
  TableClasses,
  TableLabels,
} from "../../constants/constants";
import { PlumbagoURL } from "../../constants/routes";

export default class PlumbagoHousesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: true,

      // Houses list
      houses: [],
    };

    this.getHouses = this.getHouses.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  componentDidMount() {
    this.getHouses();
  }

  async getHouses() {
    try {
      const response = await fetch(HousesAPI.byCondoId(CONDO.PLUMBAGO.ID));

      const result = await response.json();

      this.setState({ houses: result, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });

      console.log(error);
    }
  }

  onRowClick(house) {
    this.props.history.push(PlumbagoURL.RESIDENT_INFO(house.user_id));
  }

  render() {
    // Get state
    const { houses } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <Card.Header>
            {/* Title */}
            <h6 className="mb-4">
              <i className="fa fa-home"></i> {CONDO.PLUMBAGO.NAME} - Casas
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

          <Card.Body>
            {houses.length > 0 ? (
              <DataTable
                classes={TableClasses}
                labels={{ ...TableLabels, filterPlaceholder: "Buscar casa..." }}
                onRowClick={this.onRowClick}
                rowsPerPage={10}
                rowsPerPageOption={[10, 15, 20]}
                tableBody={houses}
                tableHeaders={HousesHeaders}
              />
            ) : (
              <p className="lead">No hay casas registradas</p>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
