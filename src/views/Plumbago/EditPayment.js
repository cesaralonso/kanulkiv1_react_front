import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { BeatLoader } from "react-spinners";
import moment from "moment";

import {
  PAYMENT_METHODS_URL,
  TenantsAPI,
  TenantPaymentsAPI,
  TenantChargesAPI,
} from "../../constants/api";
import { PlumbagoURL } from "../../constants/routes";

const animatedComponents = makeAnimated();

export default class PlumbagoEditPayment extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      // Is loading Resident info?
      isLoadingTenant: true,
      // Is loading payment?
      isLoadingPayment: true,
      // Is loading Payment methods?
      isLoadingPaymentMethods: true,

      // Tenant info
      tenant: { name: "", house_name: "" },
      // Tenant payment
      tenant_payment: {},

      // Payment methods list
      payment_methods: [],
      // Selected payment method
      type: "0",
      // Transaction description
      description: "",

      // Tenant charges list
      tenant_charges: [],
      // Original charges list
      original_charges: [],
      // Selected tenant charges list
      charges: [],

      // Transaction amount
      amount: "0.00",

      // Day
      day: "",
      // Month
      month: 0,
      // Year
      year: "",

      // Is adding files?
      isAddingFiles: false,
      // Invoice PDF
      invoice_pdf: null,
      // Invoice XML
      invoice_xml: null,
    };

    // Bind methods
    this.getTenant = this.getTenant.bind(this);
    this.getPayment = this.getPayment.bind(this);
    this.getTenantCharges = this.getTenantCharges.bind(this);
    this.getPaymentMethods = this.getPaymentMethods.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeCharges = this.onChangeCharges.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.savePayment = this.savePayment.bind(this);
  }

  componentDidMount() {
    this.getTenant();
    this.getPayment();
    this.getPaymentMethods();
  }

  /**
   * Get Tenant.
   */
  async getTenant() {
    try {
      // Get Tenant ID
      const { tenant_id } = this.props.match.params;

      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.tenantById(tenant_id));

      // Get request result
      const result = await response.json();

      // Update state
      this.setState({ tenant: result[0], isLoadingTenant: false });
    } catch (error) {
      this.setState({ isLoadingTenant: false });
    }
  }

  /**
   * Get Tenant payment.
   */
  async getPayment() {
    try {
      // Get Tenant ID
      const { payment_id } = this.props.match.params;

      // Get Tenant payment by ID request
      const response = await fetch(TenantPaymentsAPI.byId(payment_id));

      // Get request result
      const result = await response.json();

      // Get Tenant payment
      const { tenant_payment } = result;

      // Format tenant charges
      const tenant_charges = tenant_payment.charges.map((item) => ({
        label: `${item.description} - $${item.amount}`,
        value: item.id,
      }));

      // Format payment date
      const date = moment(tenant_payment.created_at);
      const day = date.date();
      const month = date.month() + 1;
      const year = date.year();

      // Update state
      this.setState({
        tenant_payment,
        description: tenant_payment.payment_description,
        amount: tenant_payment.amount,
        type: tenant_payment.payment_method,
        charges: tenant_charges,
        day,
        month,
        year,
        isLoadingPayment: false,
      });
    } catch (error) {
      this.setState({ isLoadingPayment: false });
    }
  }

  async getTenantCharges() {
    try {
      // Get Tenant
      const { payment_id } = this.props.match.params;

      // Get Tenant by ID request
      const response = await fetch(TenantChargesAPI.paymentUpdate(payment_id));

      // Get request result
      const result = await response.json();

      const tenant_charges = result.tenant_charges.map((item) => ({
        label: `${item.description} - $${item.amount}`,
        value: item.id,
      }));

      return tenant_charges;
    } catch (error) {
      this.setState({ isLoadingCharges: false });
    }
  }

  async getPaymentMethods() {
    try {
      // Get Tenant by ID request
      const response = await fetch(PAYMENT_METHODS_URL);

      // Get request result
      const result = await response.json();

      this.setState({
        payment_methods: result,
        isLoadingPaymentMethods: false,
      });
    } catch (error) {
      this.setState({ isLoadingTypes: false });
    }
  }

  onChange({ target: { files, name, value } }) {
    if (name === "invoice_pdf" || name === "invoice_xml") {
      this.setState({ [name]: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  }

  onChangeCharges(charges) {
    this.setState({ charges });
  }

  onChangeCheck(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  async onClickSave(e) {
    e.preventDefault();

    this.savePayment();
  }

  async savePayment() {
    const {
      amount,
      charges,
      day,
      description,
      invoice_pdf,
      invoice_xml,
      isAddingFiles,
      month,
      tenant_payment,
      tenant,
      type,
      year,
    } = this.state;

    if (type === "0") {
      alert("Selecciona un método de pago");
    } else if (description === "") {
      alert("Ingresa la factura / folio del pago");
    } else if (amount === "") {
      alert("Ingresa la cantidad a pagar");
    } else if (parseFloat(amount) <= 0) {
      alert("Ingresa una cantidad mayor a cero");
    } else if (charges.length === 0) {
      alert("Selecciona al menos un cargo");
    } else if (day === "") {
      alert("Ingresa el día");
    } else if (month === "0") {
      alert("Selecciona un mes");
    } else if (year === "") {
      alert("Ingresa el año");
    } else {
      try {
        const tenant_charges_ids = charges.map((item) => ({ id: item.value }));

        const body = new FormData();
        body.append("tenant_id", String(tenant.id));
        body.append("payment_description", description);
        body.append("amount", amount);
        body.append("day", day);
        body.append("month", month);
        body.append("year", year);
        body.append("payment_method", type);

        if (isAddingFiles) {
          if (invoice_pdf) {
            body.append("invoice_pdf", invoice_pdf, invoice_pdf.name);
          }

          if (invoice_xml) {
            body.append("invoice_xml", invoice_xml, invoice_xml.name);
          }
        }

        body.append("tenant_charges_ids", JSON.stringify(tenant_charges_ids));
        body.append("_method", "PUT");

        const response = await fetch(
          TenantPaymentsAPI.byId(tenant_payment.id),
          { method: "POST", body }
        );

        const result = await response.json();

        if (result) {
          alert("Los cambios se han guardado con éxito");

          const route = PlumbagoURL.RESIDENT_PAYMENTS(tenant.user_id);

          this.props.history.push(route);
        }
      } catch (error) {
        alert("Hubo un problema para guardar los cambios. Intente más tarde.");
      }
    }
  }

  render() {
    // Get state
    const {
      amount,
      charges,
      day,
      description,
      isAddingFiles,
      isLoadingPayment,
      isLoadingPaymentMethods,
      isLoadingTenant,
      month,
      tenant_payment,
      payment_methods,
      tenant,
      type,
      year,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header as="h6">
            <i className="fa fa-pencil"></i> Editar pago -{" "}
            <b>{tenant_payment.payment_description || ""}</b>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            {isLoadingTenant || isLoadingPayment || isLoadingPaymentMethods ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <Form>
                <Row>
                  {/* Payment method input */}
                  <Col sm="12" md="6" lg="4">
                    <Form.Group controlId="type">
                      <Form.Label>Método de pago</Form.Label>

                      <Form.Control
                        as="select"
                        autoComplete="off"
                        name="type"
                        onChange={this.onChange}
                        required
                        type="select"
                        value={type}
                      >
                        {payment_methods.map((t, index) => (
                          <option key={`type-${index}`} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Description input */}
                  <Col sm="12" md="6" xl="4">
                    <Form.Group controlId="description">
                      <Form.Label>Factura / Folio</Form.Label>

                      <Form.Control
                        autoComplete="off"
                        name="description"
                        onChange={this.onChange}
                        required
                        type="text"
                        value={description}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Is adding files? check */}
                <Form.Group controlId="isAddingFiles">
                  <Form.Check
                    label="¿Agregar factura?"
                    name="isAddingFiles"
                    onChange={this.onChangeCheck}
                    type="checkbox"
                    value={isAddingFiles}
                  />
                </Form.Group>

                {isAddingFiles && (
                  <Row>
                    {/* Invoice PDF file input */}
                    <Col sm="12" md="6" xl="4">
                      <Form.Group controlId="invoice_pdf">
                        <Form.Label>Factura en PDF</Form.Label>

                        <Form.Control
                          autoComplete="off"
                          onChange={this.onChange}
                          multiple={false}
                          name="invoice_pdf"
                          type="file"
                        />
                      </Form.Group>
                    </Col>

                    {/* Invoice XML file input */}
                    <Col sm="12" md="6" xl="4">
                      <Form.Group controlId="invoice_xml">
                        <Form.Label>Factura en XML</Form.Label>

                        <Form.Control
                          autoComplete="off"
                          onChange={this.onChange}
                          multiple={false}
                          name="invoice_xml"
                          type="file"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                <Row>
                  {/* Charges input */}
                  <Col sm="12" md="12" lg="6">
                    <Form.Group controlId="charges">
                      <Form.Label>Cargos a pagar</Form.Label>

                      <AsyncSelect
                        cacheOptions
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        defaultOptions
                        isClearable={false}
                        isMulti
                        loadOptions={this.getTenantCharges}
                        name="charges"
                        noOptionsMessage={() => "No hay cargos pendientes"}
                        onChange={this.onChangeCharges}
                        placeholder="Selecciona los cargos"
                        value={charges}
                      />
                    </Form.Group>
                  </Col>

                  {/* Amount input */}
                  <Col sm="12" md="4" xl="3">
                    <Form.Group controlId="amount">
                      <Form.Label>Cantidad</Form.Label>

                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <i className="fa fa-usd"></i>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          autoComplete="off"
                          name="amount"
                          onChange={this.onChange}
                          type="number"
                          value={amount}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Date section */}
                <Row>
                  {/* Day input */}
                  <Col sm="12" md="3" lg="2">
                    <Form.Group controlId="day">
                      <Form.Label>Día</Form.Label>

                      <Form.Control
                        autoComplete="off"
                        name="day"
                        onChange={this.onChange}
                        type="number"
                        value={day}
                      />
                    </Form.Group>
                  </Col>

                  {/* Month input */}
                  <Col sm="12" md="3" lg="2">
                    <Form.Group controlId="month">
                      <Form.Label>Mes</Form.Label>

                      <Form.Control
                        as="select"
                        autoComplete="off"
                        name="month"
                        onChange={this.onChange}
                        required
                        type="select"
                        value={month}
                      >
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Year input */}
                  <Col sm="12" md="3" lg="2">
                    <Form.Group controlId="year">
                      <Form.Label>Año</Form.Label>

                      <Form.Control
                        autoComplete="off"
                        name="year"
                        onChange={this.onChange}
                        type="number"
                        value={year}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Save button */}
            <Button
              className="mr-2"
              onClick={this.onClickSave}
              variant="primary"
            >
              Guardar cambios
            </Button>

            {/* Cancel button */}
            <Link to={PlumbagoURL.RESIDENT_PAYMENTS(tenant.user_id)}>
              <Button variant="danger">Cancelar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
