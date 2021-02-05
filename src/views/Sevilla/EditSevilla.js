import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Form,
} from "reactstrap";
import { BeatLoader } from "react-spinners";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import { CondosAPI, TenantsAPI } from "../../constants/api";
import { APIURLBASE, CONDO, ERRORSAVING } from "../../constants/constants";
import { SevillaURL } from "../../constants/routes";

export default class EditSevilla extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading info?
      isLoading: true,

      // Condo info
      condo: {
        id: 0,
        image: "",
        name: "",
        description: "",
        phone: "",
      },

      // Image
      image: "",

      // Name
      name: "",

      // Description
      description: "",

      // Phone
      phone: "",

      // Is saving changes?
      isSaving: false,
    };

    this.getInfo = this.getInfo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isSaving = this.isSaving.bind(this);
    this.onPressSave = this.onPressSave.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  /**
   * Get Condo info.
   */
  async getInfo() {
    try {
      const response = await fetch(CondosAPI.condoById(CONDO.SEVILLA.ID));

      const result = await response.json();

      this.setState({
        condo: result,
        image: result.image,
        name: result.name,
        description: result.description,
        phone: result.phone,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  }

  /**
   * Is saving info?
   *
   * @param {*} isSaving
   * @param {*} callback
   */
  isSaving(isSaving = true, callback = () => {}) {
    this.setState({ isSaving }, callback);
  }

  /**
   * OnChange Text input event.
   *
   * @param {*} e - Event.
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * OnPress
   */
  onPressSave() {
    this.isSaving(true, this.saveChanges);
  }

  /**
   * Save changes.
   */
  async saveChanges() {
    const body = new FormData();
    body.append("name", this.state.name);
    body.append("image", this.state.image);
    body.append("description", this.state.description);

    try {
      const response = await fetch(TenantsAPI.update, {
        method: "PUT",
        body,
      });

      const result = await response.json();

      if (result) {
        this.isSaving(false, () => {
          alert("Los cambios del condominio se han guardado con éxito");

          this.props.history.push(SevillaURL.INDEX);
        });
      }
    } catch (error) {
      this.isSaving(false, () => {
        alert(ERRORSAVING);
        console.log(error);
      });
    }
  }

  fileChangedHandler = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  render() {
    const {
      condo,
      description,
      isLoading,
      image,
      isSaving,
      name,
      phone,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Card>
              {/* Title */}
              <CardHeader>
                <i className="fa fa-align-justify"></i> Editar información de{" "}
                <b>{condo.name}</b>
              </CardHeader>

              <CardBody>
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <BeatLoader color="#006cb4" size={32} />
                  </div>
                ) : (
                  <Form>
                    <FormGroup>
                      <Label htmlFor="image">
                        <b>Portada</b>
                      </Label>

                      <div>
                        <img
                          alt="Sin portada"
                          id="actual_photo"
                          name="actual_photo"
                          src={`${APIURLBASE}${image}`}
                          width="175px"
                        />
                      </div>

                      <br />

                      <Input
                        id="image"
                        onChange={this.fileChangedHandler}
                        name="image"
                        type="file"
                      />
                    </FormGroup>

                    <Row>
                      <Col sm="12" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="name">
                            <b>Nombre del condominio</b>
                          </Label>

                          <Input
                            id="name"
                            contentEditable={false}
                            onChange={this.onChange}
                            name="name"
                            type="text"
                            value={name}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="12" md="6" lg="4">
                        <FormGroup>
                          <Label htmlFor="phone">
                            <b>Teléfono</b>
                          </Label>

                          <Input
                            id="phone"
                            contentEditable={false}
                            onChange={this.onChange}
                            name="phone"
                            value={phone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label htmlFor="description">
                        <b>Descripción del lugar</b>
                      </Label>

                      <Input
                        id="description"
                        onChange={this.onChange}
                        name="description"
                        rows={4}
                        type="textarea"
                        value={description}
                      />
                    </FormGroup>
                  </Form>
                )}
              </CardBody>

              <CardFooter>
                <Button
                  className="mr-2"
                  color="primary"
                  disabled={isSaving}
                  onClick={this.onPressSave}
                >
                  Guardar cambios
                </Button>

                <Link to={SevillaURL.INDEX}>
                  <Button color="danger">Cancelar</Button>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
