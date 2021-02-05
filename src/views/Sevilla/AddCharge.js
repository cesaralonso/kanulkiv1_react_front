import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { BeatLoader } from "react-spinners";
import moment from "moment";

import {
  CHARGE_TYPES_URL,
  CREATE_TENANT_CHARGE,
  PAYMENT_METHODS_URL,
  TenantPaymentsAPI,
  TenantsAPI,
} from "../../constants/api";
import { SevillaURL } from "../../constants/routes";

// Create animated components for React select.
const animatedComponents = makeAnimated();

export default class SevillaAddTenantCharge extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      // Is loading Resident info?
      isLoadingTenant: true,
      // Is loading current date?
      isLoadingDate: true,
      // Is loading Charge types?
      isLoadingChargeTypes: true,
      // Is loading Payment methods?
      isLoadingPaymentMethods: true,

      // Tenant info
      tenant: { name: "", house_name: "" },

      // Tenant charges list
      tenant_charges: [],
      // Selected tenant charges list
      charges: [],

      // Transaction
      transaction: "",
      // Transaction description
      description: "",
      // Transaction amount
      amount: "0.00",

      // Day
      day: "",
      // Month
      month: "",
      // Year
      year: "",

      // Charge types list
      charge_types: [],
      // Payment methods list
      payment_methods: [],
      // Selected payment method/charge type
      type: "",

      // Is adding files?
      isAddingFiles: false,
      // Invoice PDF
      invoice_pdf: null,
      // Invoice XML
      invoice_xml: null,
      // Is saving?
      isSaving: false,
    };

    // Bind methods
    this.getTenant = this.getTenant.bind(this);
    this.getTenantCharges = this.getTenantCharges.bind(this);
    this.getChargeTypes = this.getChargeTypes.bind(this);
    this.getPaymentMethods = this.getPaymentMethods.bind(this);
    this.getDate = this.getDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeCharges = this.onChangeCharges.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.saveCharge = this.saveCharge.bind(this);
    this.savePayment = this.savePayment.bind(this);
    this.toggleSaving = this.toggleSaving.bind(this);
  }

  componentDidMount() {
    this.getTenant();
    this.getChargeTypes();
    this.getPaymentMethods();
    this.getDate();
  }

  /**
   * Get Tenant info.
   */
  async getTenant() {
    try {
      // Get Tenant ID
      const { tenant_id } = this.props.match.params;

      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.tenantById(tenant_id));

      // Validate response
      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Update state
        this.setState({ isLoadingTenant: false, tenant: result[0] });
      }
    } catch (error) {
      this.setState({ isLoadingTenant: false });
    }
  }

  /**
   * Get Tenant charges.
   */
  async getTenantCharges() {
    try {
      // Get Tenant
      const { tenant } = this.state;

      // Get Tenant by ID request
      const response = await fetch(TenantsAPI.balanceDetailById(tenant.id));

      // Get request result
      const result = await response.json();

      const tenant_charges = result.pending_charges.map((item) => ({
        label: `${item.description} - $${item.amount}`,
        value: item.id,
      }));

      return tenant_charges;
    } catch (error) {
      this.setState({ isLoadingCharges: false });
      console.log(error);
    }
  }

  async getChargeTypes() {
    try {
      // Get Tenant by ID request
      const response = await fetch(CHARGE_TYPES_URL);

      // Get request result
      const result = await response.json();

      this.setState({ charge_types: result, isLoadingChargeTypes: false });
    } catch (error) {
      this.setState({ isLoadingTypes: false });
      console.log(error);
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
      console.log(error);
    }
  }

  getDate() {
    const date = moment(new Date());
    const day = date.date();
    const month = date.month() + 1;
    const year = date.year();

    this.setState({ day, month, year, isLoadingDate: false });
  }

  onChange({ target: { checked, files, name, value } }) {
    if (name === "transaction") {
      this.setState({
        transaction: value,
        type: "",
        charges: [],
        description: "",
        amount: "0.00",
      });
    } else if (name === "invoice_pdf" || name === "invoice_xml") {
      this.setState({ [name]: files[0] });
    } else if (name === "isAddingFiles") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  }

  onChangeCharges(charges) {
    this.setState({ charges });
  }

  /**
   * OnSubmit form event.
   * @param e
   */
  async onSubmit(e) {
    e.preventDefault();

    // Get component state
    const { transaction } = this.state;

    // Validate selected transaction
    if (transaction === "1") {
      this.toggleSaving(this.saveCharge);
    } else if (transaction === "2") {
      this.toggleSaving(this.savePayment);
    } else {
      alert("Selecciona un movimiento");
    }
  }

  /**
   * Save charge.
   */
  async saveCharge() {
    // Get component state
    const { amount, day, description, month, tenant, type, year } = this.state;

    // Validate form
    if (parseFloat(amount) <= 0) {
      alert("Ingresa una cantidad mayor a cero");
    } else {
      try {
        const body = new URLSearchParams();
        body.append("tenant_id", String(tenant.id));
        body.append("house_id", tenant.house_id);
        body.append("type", type);
        body.append("description", description);
        body.append("day", day);
        body.append("month", month);
        body.append("year", year);
        body.append("amount", amount);

        const response = await fetch(CREATE_TENANT_CHARGE, {
          method: "POST",
          body,
        });

        if (response.status === 200) {
          this.toggleSaving(async () => {
            const result = await response.json();

            if (result) {
              alert("El cargo se ha guardado con éxito");

              const route = SevillaURL.RESIDENT_INFO(tenant.user_id);

              this.props.history.push(route);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * Save payment.
   */
  async savePayment() {
    // Get component state
    const {
      amount,
      charges,
      day,
      description,
      invoice_pdf,
      invoice_xml,
      isAddingFiles,
      month,
      tenant,
      type,
      year,
    } = this.state;

    // Validate form
    if (parseFloat(amount) <= 0) {
      alert("Ingrese una cantidad mayor a cero");
    } else if (charges.length === 0) {
      alert("Seleccione al menos un cargo");
    } else {
      try {
        const tenant_charges_ids = charges.map((item) => ({ id: item.value }));

        const body = new FormData();
        body.append("tenant_id", String(tenant.id));
        body.append("payment_description", description);
        body.append("amount", amount);
        body.append("tenant_charges_ids", JSON.stringify(tenant_charges_ids));
        body.append("payment_method", type);
        body.append("day", day);
        body.append("month", month);
        body.append("year", year);
        body.append("card_index", "0");

        if (isAddingFiles) {
          if (invoice_pdf) {
            body.append("invoice_pdf", invoice_pdf, invoice_pdf.name);
          }

          if (invoice_xml) {
            body.append("invoice_xml", invoice_xml, invoice_xml.name);
          }
        }

        const response = await fetch(TenantPaymentsAPI.index, {
          method: "POST",
          body,
        });

        if (response.status === 200) {
          this.toggleSaving(async () => {
            const result = await response.json();

            if (result) {
              alert("El pago se ha guardado con éxito");

              const route = SevillaURL.RESIDENT_INFO(tenant.user_id);

              this.props.history.push(route);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  toggleSaving(callback = () => {}) {
    this.setState({ isSaving: !this.state.isSaving }, callback);
  }

  render() {
    const {
      amount,
      charge_types,
      charges,
      day,
      description,
      isAddingFiles,
      isLoadingChargeTypes,
      isLoadingDate,
      isLoadingPaymentMethods,
      isLoadingTenant,
      isSaving,
      month,
      payment_methods,
      tenant,
      transaction,
      type,
      year,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          {/* Card header */}
          <Card.Header as="h6">
            <i className="fa fa-pencil"></i> Crear movimiento para{" "}
            <b>{tenant.name}</b> -{" "}
            <span className="text-primary">{tenant.house_name}</span>
          </Card.Header>

          {/* Card body */}
          <Card.Body>
            {isLoadingDate ||
            isLoadingTenant ||
            isLoadingChargeTypes ||
            isLoadingPaymentMethods ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#006cb4" size={32} />
              </div>
            ) : (
              <Form id="add" onSubmit={this.onSubmit}>
                <Row>
                  {/* Transaction type input */}
                  <Col sm="12" md="6" lg="5" xl="4">
                    <Form.Group controlId="transaction">
                      <Form.Label>Tipo de movimiento</Form.Label>

                      <Form.Control
                        as="select"
                        autoComplete="off"
                        name="transaction"
                        onChange={this.onChange}
                        required
                        value={transaction}
                      >
                        <option value="">
                          Selecciona el tipo de movimiento
                        </option>
                        <option value="1">Cargo</option>
                        <option value="2">Pago</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Charge transaction form */}
                {transaction === "1" && (
                  <Row>
                    {/* Charge type input */}
                    <Col sm="12" md="6" lg="4">
                      <Form.Group controlId="type">
                        <Form.Label>Tipo de cargo</Form.Label>

                        <Form.Control
                          as="select"
                          autoComplete="off"
                          name="type"
                          onChange={this.onChange}
                          required
                          type="select"
                          value={type}
                        >
                          <option value="">Selecciona un tipo</option>

                          {charge_types.map((t, index) => (
                            <option key={`type-${index}`} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    {/* Description input */}
                    <Col sm="12" md="6" lg="4">
                      <Form.Group controlId="description">
                        <Form.Label>Descripción</Form.Label>

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
                            min="1"
                            name="amount"
                            onChange={this.onChange}
                            required
                            type="number"
                            value={amount}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {/* Payment transaction form */}
                {transaction === "2" && (
                  <>
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
                            <option value="">Selecciona un método</option>

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
                        onChange={this.onChange}
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
                              min="1"
                              name="amount"
                              onChange={this.onChange}
                              required
                              type="number"
                              value={amount}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                {/* Date section */}
                {transaction !== "" && (
                  <Row>
                    {/* Day input */}
                    <Col sm="12" md="3" lg="2">
                      <Form.Group controlId="day">
                        <Form.Label>Día</Form.Label>

                        <Form.Control
                          autoComplete="off"
                          name="day"
                          onChange={this.onChange}
                          required
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
                          <option value="">Selecciona un mes</option>
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
                          min="1900"
                          name="year"
                          onChange={this.onChange}
                          required
                          type="number"
                          value={year}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Form>
            )}
          </Card.Body>

          {/* Card footer */}
          <Card.Footer>
            {/* Save button */}
            <Button
              className="mr-2"
              disabled={isSaving}
              form="add"
              type="submit"
              variant="primary"
            >
              {isSaving && (
                <Spinner animation="border" size="sm" variant="light" />
              )}{" "}
              Crear movimiento
            </Button>

            {/* Cancel button */}
            <Link to={SevillaURL.RESIDENT_INFO(tenant.user_id)}>
              <Button variant="danger">Cancelar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
