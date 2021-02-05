/**
 * Base URL.
 */
export const BASE_URL = 'https://kanulki.webtestdev.site';

/**
 * Base API URL.
 */
export const BASE_API_URL = 'https://api.kanulki.webtestdev.site';

/**
 * API URL.
 */
export const API_URL = `${BASE_API_URL}/api/v1`;

/**
 * Create tenant charges URL.
 */
export const CREATE_TENANT_CHARGE = `${API_URL}/tenant_charges`;

/**
 * GET Tenant charges by tenant ID.
 */
export const TENANT_CHARGES_BY_TENANT_ID = `${CREATE_TENANT_CHARGE}/tenant/`;

/**
 * Houses URL.
 */
export const HOUSES_URL = `${API_URL}/houses`;

/**
 * House URL.
 */
export const HOUSE_URL = `${HOUSES_URL}/`;

/**
 * GET Houses by Condo ID URL.
 */
export const HOUSE_BY_CONDO_ID_URL = `${HOUSES_URL}/condo/`;

/**
 * GET Available Houses by Condo ID URL.
 */
export const AVAILABLE_HOUSES_BY_CONDO_ID_URL = `${HOUSES_URL}/available/condo/`;

/**
 * House Payments URL.
 */
export const HOUSE_PAYMENTS_URL = `${API_URL}/house_payments`;

/**
 * House Payments by ID URL.
 */
export const HOUSE_PAYMENTS_BY_ID_URL = `${HOUSE_PAYMENTS_URL}/`;

/**
 * GET House Payments by Tenant ID URL.
 */
export const HOUSE_PAYMENTS_BY_TENANT_ID_URL = `${HOUSE_PAYMENTS_URL}/tenant/`;

/**
 * GET House Payments by House ID URL.
 */
export const HOUSE_PAYMENTS_BY_HOUSE_ID_URL = `${HOUSE_PAYMENTS_URL}/houses/`;

/**
 * GET Charge types URL.
 */
export const CHARGE_TYPES_URL = `${API_URL}/payment_types`;

/**
 * GET Charge types by ID URL.
 */
export const PAYMENT_TYPES_BY_ID_URL = `${CHARGE_TYPES_URL}/`;

/**
 * GET Payment methods URL.
 */
export const PAYMENT_METHODS_URL = `${API_URL}/payment_methods`;

/**
 * Auth API.
 */
export const AuthAPI = {
  /**
   * Login URL.
   */
  login: `${API_URL}/login`,

  /**
   * Forgot password URL.
   */
  forgotPassword: `${API_URL}/password/email`,
};

/**
 * Users API.
 */
export const UsersAPI = {
  /**
   * Base URL.
   */
  index: `${API_URL}/users`,

  /**
   * GET Users by ID URL.
   */
  userById: (id) => `${API_URL}/users/${id}`,

  /**
   * GET Users by Condo ID URL.
   */
  usersByCondoId: (condo_id) => `${API_URL}/users/condo/${condo_id}`,

  /**
   * GET User detail by ID URL.
   */
  userDetailById: (id) => `${API_URL}/users/detail/${id}`,

  /**
   * GET Count total end users URL.
   */
  countTotalEndUsers: `${API_URL}/users/count/total`,

  /**
   * GET Count total end users URL.
   */
  countTotalEndUsersByCondoId: (condo_id) =>
    `${API_URL}/users/count/condo/${condo_id}`,
};

/**
 * Condos API.
 */
export const CondosAPI = {
  /**
   * GET Condos URL..
   */
  index: `${API_URL}/condos`,

  /**
   * GET Condo by ID URL.
   */
  condoById: (id) => `${API_URL}/condos/${id}`,

  /**
   * GET Count total condos URL.
   */
  countTotalCondos: `${API_URL}/condos/count/total`,
};

/**
 * Tenants API.
 */
export const TenantsAPI = {
  index: `${API_URL}/tenants`,

  byTenantId: (id) => `${API_URL}/tenants/tenant/${id}`,

  tenantById: (id) => `${API_URL}/tenants/${id}`,

  update: `${API_URL}/tenants/update_tenant`,

  updateBalance: `${API_URL}/tenants/update_balance`,

  balanceById: (id) => `${API_URL}/tenants/balance/${id}`,

  balanceDetailById: (id) => `${API_URL}/tenants/balance/detail/${id}`,

  debtors: `${API_URL}/tenants/debtors`,

  debtorsByCondoId: (condo_id) =>
    `${API_URL}/tenants/debtors/condo/${condo_id}`,

  countTotalDebtors: `${API_URL}/tenants/debtors/count/total`,

  getTotalDebtorsByCondoId: (id) =>
    `${API_URL}/tenants/debtors/count/condo/${id}`,

  countTotalUpToDate: `${API_URL}/tenants/up_to_date/total`,

  getTotalUpToDateByCondoId: (id) =>
    `${API_URL}/tenants/up_to_date/condo/${id}`,

  /**
   * Pending charges PDF URL.
   */
  pendingPDF: (id) => `${API_URL}/tenant_pending/pdf/${id}`,

  /**
   * Change user password
   */
  changePassword: () => `${API_URL}/users/change_password`,
};

export const CondoFeesAPI = {
  index: `${API_URL}/condo_fees`,

  feeById: (id) => `${API_URL}/condo_fees/${id}`,
};

export const HousesAPI = {
  index: `${API_URL}/houses`,

  houseById: (id) => `${API_URL}/houses/${id}`,

  byCondoId: (condo_id) => `${API_URL}/houses/condo/${condo_id}`,

  availableHousesByCondoId: (condo_id) =>
    `${API_URL}/houses/available/condo/${condo_id}`,
};

export const ClubHouseReservationsAPI = {
  /**
   * Reservations base URL.
   */
  index: `${API_URL}/reservations`,

  /**
   * Get reservation by ID URL.
   */
  getReservationById: (id) => `${API_URL}/reservations/${id}`,

  byCondoId: (condo_id) => `${API_URL}/reservations/condo/${condo_id}`,

  byTenantId: (tenant_id) => `${API_URL}/reservations/tenant/${tenant_id}`,

  payment: `${API_URL}/reservations/pay/web`,
};

export const TenantChargesAPI = {
  index: `${API_URL}/tenant_charges`,

  byId: (id) => `${API_URL}/tenant_charges/${id}`,

  byTenantId: (tenant_id) => `${API_URL}/tenant_charges/tenant/${tenant_id}`,

  paymentUpdate: (id) => `${API_URL}/tenant_charges/payment_update/${id}`,
};

export const TenantPaymentsAPI = {
  index: `${API_URL}/tenant_payments`,

  byId: (id) => `${API_URL}/tenant_payments/${id}`,

  byTenantId: (tenant_id) => `${API_URL}/tenant_payments/tenant/${tenant_id}`,

  download: (id) => `${API_URL}/tenant_payments/pdf/${id}`,

  pdf: (name) => `${BASE_API_URL}/contpaq_invoices/facturas/${name}.pdf`,

  xml: (name) => `${BASE_API_URL}/contpaq_invoices/facturas/${name}.xml`,
};
