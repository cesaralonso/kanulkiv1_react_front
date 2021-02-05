import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
} from "reactstrap";
import { BeatLoader } from "react-spinners";

import { UsersAPI } from "../../constants/api";
import { SLASH, USERS, ADDBTN } from "../../constants/constants";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: true,
      // Users
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const response = await fetch(UsersAPI.index);

      const result = await response.json();

      this.setState({ users: result, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <h6 className="mb-4">Usuarios</h6>

                {/* Nav tabs */}
                <Nav tabs>
                  {/* Users tab */}
                  <NavItem>
                    <NavLink tag={RRNavLink} to={SLASH + USERS}>
                      <i className="fa fa-users pr-1"></i> Usuarios
                    </NavLink>
                  </NavItem>

                  {/* Add user tab */}
                  <NavItem>
                    <NavLink tag={RRNavLink} to={SLASH + USERS + ADDBTN}>
                      <i className="fa fa-plus pr-1"></i> Crear usuario
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>

              <CardBody>
                {this.state.isLoading ? (
                  <div className="d-flex justify-content-center">
                    <BeatLoader color="#006cb4" size={18} />
                  </div>
                ) : (
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Rol de usuario</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.users.map((user, index) => (
                        <tr key={`user-${index}`}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.email}</td>
                          <td>{user.role_description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
