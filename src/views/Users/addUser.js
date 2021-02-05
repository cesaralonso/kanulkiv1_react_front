import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { BeatLoader } from "react-spinners";
import axios from "axios";

import {
  AVAILABLE_HOUSES_BY_CONDO_ID_URL,
  CondosAPI,
  TenantsAPI,
} from "../../constants/api";
import {
  ADDRESIDENTUSER,
  ERRORSAVING,
  CONDO,
  SUCCESSFULSAVING,
  USERSURL,
} from "../../constants/constants";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: true,
      // Condos list
      condos: [],
      // Condo ID
      condo_id: "0",

      // Country ID
      country_id: "140",

      // Is loading houses?
      isLoadingHouses: false,
      // Condo houses list
      houses: [],
      // Condo house ID
      house_id: "0",

      // User name
      name: "",
      // User last name
      last_name: "",
      // User e-mail
      email: "",
      // User phone
      phone: "",
      // User address
      address: "",
      // User RFC
      rfc: "",
      // User image
      image: "",
      // Is saving?
      isSaving: false,
    };

    this.getCondos = this.getCondos.bind(this);
    this.getHouses = this.getHouses.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.toggleSaving = this.toggleSaving.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.save = this.save.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  componentDidMount() {
    this.getCondos();
  }

  async getCondos() {
    try {
      // Get Condos request.
      const response = await fetch(CondosAPI.index);

      // Get request result
      const result = await response.json();

      // Condo ID
      let condo_id = "0";

      // Get condo ID based on URL
      if (this.props.location.pathname.includes("sevilla")) {
        condo_id = CONDO.SEVILLA.ID;
      } else if (this.props.location.pathname.includes("plumbago")) {
        condo_id = CONDO.PLUMBAGO.ID;
      }

      // Update state
      this.setState({ condos: result, condo_id, isLoading: false }, () => {
        if (this.state.condo_id !== "0") {
          this.getHouses();
        }
      });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  }

  async getHouses() {
    try {
      // Get Condos request.
      const response = await fetch(
        AVAILABLE_HOUSES_BY_CONDO_ID_URL + this.state.condo_id
      );

      // Get request result
      const result = await response.json();

      this.setState({ houses: result, house_id: "0", isLoadingHouses: false });
    } catch (error) {
      console.log(error);
    }
  }

  onChange(e) {
    e.persist();

    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === "condo_id") {
        this.setState({ isLoadingHouses: true }, this.getHouses);
      }
    });
  }

  onChangeFile(event) {
    this.setState({ image: event.target.files[0] });
  }

  toggleSaving(isSaving = true, callback = () => {}) {
    this.setState({ isSaving }, callback);
  }

  onClickSave() {
    this.toggleSaving(true, this.save);
  }

  async save() {
    const data = new URLSearchParams();
    const password = "secret";

    data.append("email", this.state.email);
    data.append("password", password);
    data.append("condo_id", this.state.condo_id);
    data.append("house_id", this.state.house_id);
    data.append("name", this.state.name);
    data.append("last_name", this.state.last_name);
    data.append("address", this.state.address);
    data.append("rfc", this.state.rfc);
    data.append("phone", this.state.phone);
    data.append("image", this.state.image);
    data.append("country_id", this.state.country_id);

    try {
      const response = await axios.post(TenantsAPI.index, data);

      if (response.status === 200) {
        this.toggleSaving(false, () => {
          alert(SUCCESSFULSAVING);
          this.props.history.push(USERSURL);
        });
      }
    } catch (error) {
      this.toggleSaving(false, () => {
        alert(ERRORSAVING);
        console.log(error);
      });
    }
  }

  onClickCancel() {
    this.props.history.goBack();
  }

  render() {
    const {
      address,
      condo_id,
      condos,
      country_id,
      email,
      house_id,
      houses,
      image,
      isLoading,
      isLoadingHouses,
      isSaving,
      name,
      last_name,
      phone,
      rfc,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader tag="h6">{ADDRESIDENTUSER}</CardHeader>

          <CardBody>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <Form>
                {/* User image */}
                <FormGroup>
                  <Label htmlFor="image">
                    <b>Imagen</b>
                  </Label>

                  <Input
                    id="image"
                    multiple={false}
                    name="image"
                    onChange={this.onChangeFile}
                    type="file"
                    value={image}
                  />
                </FormGroup>

                <Row>
                  {/* Condo input */}
                  <Col sm={12} md={6} lg={4}>
                    <FormGroup>
                      <Label htmlFor="condo_id">
                        <b>Condominio</b>
                      </Label>

                      <Input
                        id="condo_id"
                        name="condo_id"
                        onChange={this.onChange}
                        type="select"
                        value={condo_id}
                      >
                        {/* Placeholder */}
                        <option value="0">
                          - - Seleccione un condominio - -
                        </option>

                        {/* Condos list */}
                        {condos.map((condo, index) => (
                          <option key={`condo-${index}`} value={condo.id}>
                            {condo.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  {/* House input */}
                  <Col sm={12} md={6} lg={4}>
                    <FormGroup>
                      <Label htmlFor="house_id">
                        <b>Casa</b>
                      </Label>

                      {isLoadingHouses ? (
                        <div className="d-flex justify-content-center">
                          <BeatLoader color="#006cb4" size={18} />
                        </div>
                      ) : houses.length > 0 ? (
                        <Input
                          id="house_id"
                          name="house_id"
                          onChange={this.onChange}
                          type="select"
                          value={house_id}
                        >
                          {/* Placeholder */}
                          <option value="0">- - Seleccione una casa - -</option>

                          {/* Condo houses list */}
                          {houses.map((house, index) => (
                            <option
                              key={`house-${index}`}
                              value={house.house_id}
                            >
                              {house.house_name}
                            </option>
                          ))}
                        </Input>
                      ) : (
                        <p className="lead">
                          {condo_id === "0"
                            ? "Seleccione un condominio"
                            : "No hay casas disponibles"}
                        </p>
                      )}
                    </FormGroup>
                  </Col>

                  {/* Country input */}
                  <Col sm={12} md={6} lg={4}>
                    <FormGroup>
                      <Label htmlFor="country_id">
                        <b>País</b>
                      </Label>

                      <Input
                        id="country_id"
                        defaultValue={country_id}
                        name="country_id"
                        type="select"
                      >
                        <option value="140">México</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {/* Name input */}
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label htmlFor="name">
                        <b>Nombre</b>
                      </Label>

                      <Input
                        id="name"
                        onChange={this.onChange}
                        name="name"
                        placeholder="Nombre"
                        type="text"
                        value={name}
                      />
                    </FormGroup>
                  </Col>

                  {/* Last name input */}
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label htmlFor="last_name">
                        <b>Apellidos</b>
                      </Label>

                      <Input
                        id="last_name"
                        name="last_name"
                        onChange={this.onChange}
                        placeholder="Apellidos"
                        value={last_name}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {/* E-mail input */}
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label htmlFor="email">
                        <b>E-mail</b>
                      </Label>

                      <Input
                        id="email"
                        name="email"
                        onChange={this.onChange}
                        placeholder="Correo electrónico"
                        type="email"
                        value={email}
                      />
                    </FormGroup>
                  </Col>

                  {/* Phone input */}
                  <Col sm="12" md="6">
                    <FormGroup>
                      <Label htmlFor="phone">
                        <b>Teléfono</b>
                      </Label>

                      <Input
                        id="phone"
                        name="phone"
                        onChange={this.onChange}
                        placeholder="Teléfono"
                        type="tel"
                        value={phone}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {/* Address input */}
                  <Col sm="12" md="6">
                    <FormGroup>
                      <Label htmlFor="address">
                        <b>Direccíon</b>
                      </Label>

                      <Input
                        id="address"
                        name="address"
                        onChange={this.onChange}
                        placeholder="Direccíon"
                        type="text"
                        value={address}
                      />
                    </FormGroup>
                  </Col>

                  {/* RFC input */}
                  <Col sm="12" md="6">
                    <FormGroup>
                      <Label htmlFor="rfc">
                        <b>RFC</b>
                      </Label>

                      <Input
                        id="rfc"
                        maxLength={13}
                        name="rfc"
                        onChange={this.onChange}
                        placeholder="RFC"
                        type="text"
                        value={rfc}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </CardBody>

          {/* Card footer */}
          <CardFooter>
            {/* Save button */}
            <Button
              color="primary mr-2"
              disabled={isSaving}
              onClick={this.onClickSave}
            >
              Guardar
            </Button>

            {/* Cancel button */}
            <Button color="danger" onClick={this.onClickCancel}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
