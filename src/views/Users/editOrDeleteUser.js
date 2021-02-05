import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as Constants from "../../constants/constants";
import { obtainLicenceTypes } from "../../redux/actions/licenceTypes";
import { obtainVehicleTypes } from "../../redux/actions/vehicleTypes";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import MomentInput from "react-moment-input";
import moment from "moment";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      business_name: null,
      birthday: null,
      email: null,
      photo: null,
      fiscal_address: null,
      service_address: null,
      RFC: null,
      phone: null,
      contact: null,
      status: null,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount = async () => {
    this.setState({ id: this.props.match.params.id });
    await this.props.obtainLicenceTypes();
    await this.props.obtainVehicleTypes();
  };

  componentDidMount() {
    this.getData();
  }

  onChange(date) {
    const bd = moment(date._d).format("YYYY-MM-DD");

    this.setState({ birthday: bd });
  }

  handleText(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileChangedHandler = (event) => {
    this.setState({ photo: event.target.files[0] });
  };

  updatePlace(lat, lng) {
    this.setState({ latitude: "" + lat, longitude: "" + lng });
  }

  async getData() {
    await fetch(Constants.APIURLBASE + `drivers/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // licenceType
        // const dateBirdtday =  <Moment date={data[0].birthday} />
        // console.log(dateBirdtday.props.date);
        // const bd = moment(data[0].birthday).format("YYYY-MM-DD");
        // console.log(bd);
        this.setState({ name: data[0].name });
        this.setState({ birthday: data[0].birthday });
        this.setState({ licence_number: data[0].licence_number });
        this.setState({ type_licence: data[0].type_licence });
        this.setState({ photo: data[0].photo });
        this.setState({ license_plate: data[0].license_plate });
        this.setState({ vahicle_type_id: data[0].vahicle_type_id });
        this.setState({ status: data[0].status });
      })
      .catch((error) => console.log(error));
  }

  saveData() {
    const formData = new FormData();
    const bd = moment(this.state.birthday).format("YYYY-MM-DD");

    formData.append("name", this.state.name);
    formData.append("birthday", bd);
    formData.append("licence_number", this.state.licence_number);
    // formData.append('photo', this.state.photo);
    formData.append("type_licence", this.state.type_licence);
    formData.append("license_plate", this.state.license_plate);
    formData.append("vahicle_type_id", this.state.vahicle_type_id);
    //formData.append('recollectorId', recollectorId);
    // sending backend
    axios
      .put(Constants.APIURLBASE + `drivers/${this.state.id}`, formData)
      .then((response) => {
        alert("Guardado con exito");
        this.props.history.push("/drivers");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fileChangedHandler = (event) => {
    this.setState({ photo: event.target.files[0] });
  };

  render() {
    const { licenceTypes, isFetching } = this.props.licenceTypes;
    const { vehicleTypes, isFetchingVehicle } = this.props.vehicleTypes;
    if (isFetching && isFetchingVehicle) {
      return (
        <Row>
          <Col sm={12} md={12} lg={12}>
            <div className="sweet-loading d-flex align-items-center">
              <BeatLoader
                css={override}
                sizeUnit={"px"}
                size={17}
                color={"#63c2de"}
                loading={this.state.loading}
              />
            </div>
          </Col>
        </Row>
      );
    }
    return (
      <div className="animated fadeIn">
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Editar Chofer</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label htmlFor="name">Nombre Chófer</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.name}
                  type="text"
                  id="name"
                  name="name"
                />
                <Label htmlFor="name">Fecha de Nacimiento</Label>
                <MomentInput
                  format="YYYY-MM-DD"
                  options={true}
                  readOnly={false}
                  inputClassName="r-input"
                  enableInputClick={true}
                  onChange={this.onChange}
                  value={moment(this.state.birthday)}
                  icon={false}
                />
                <Label htmlFor="name">No. de Licencia</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.licence_number}
                  type="text"
                  id="licence_number"
                  name="licence_number"
                />
                <Label htmlFor="name">Tipo de Licencia</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.type_licence}
                  type="select"
                  id="licenceTypeId"
                  name="licenceTypeId"
                >
                  <option value="">Selecciona una opción</option>
                  {licenceTypes.map((licenceType) =>
                    this.state.type_licence === licenceType.id ? (
                      <option
                        key={licenceType.id}
                        value={licenceType.id}
                        selected
                      >
                        {licenceType.type}
                      </option>
                    ) : (
                      <option key={licenceType.id} value={licenceType.id}>
                        {licenceType.type}
                      </option>
                    )
                  )}
                </Input>
                <Label htmlFor="name">Foto</Label>
                <div>
                  <img
                    alt="Foto"
                    src={`${Constants.APIURLBASE}${this.state.photo}`}
                    width="50"
                    id="actual_photo"
                    name="actual_photo"
                  />
                </div>
                <Label htmlFor="name">Tipo de vehículo asignado</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.vahicle_type_id}
                  type="select"
                  id="vehicleTypeId"
                  name="vehicleTypeId"
                >
                  <option value="">Selecciona una opción</option>
                  {vehicleTypes.map((vehicleType) =>
                    this.state.vahicle_type_id === vehicleType.id ? (
                      <option
                        key={vehicleType.id}
                        value={vehicleType.id}
                        selected
                      >
                        {vehicleType.name}
                      </option>
                    ) : (
                      <option key={vehicleType.id} value={vehicleType.id}>
                        {vehicleType.name}
                      </option>
                    )
                  )}
                </Input>
                <Label htmlFor="name">Placas Vehículo</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.license_plate}
                  type="text"
                  id="license_plate"
                  name="license_plate"
                />
                <Label htmlFor="status">Estatús</Label>
                <Input
                  onChange={(e) => this.handleText(e)}
                  defaultValue={this.state.status}
                  type="text"
                  id="status"
                  name="status"
                  readOnly
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button onClick={() => this.saveData()} color="primary">
                Guardar
              </Button>
              &nbsp;&nbsp;
              <Link to="/clients">
                <Button color="warning">Cancelar</Button>
              </Link>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    licenceTypes: state.licenceTypes,
    vehicleTypes: state.vehicleTypes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    obtainLicenceTypes: () => dispatch(obtainLicenceTypes()),
    obtainVehicleTypes: () => dispatch(obtainVehicleTypes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
