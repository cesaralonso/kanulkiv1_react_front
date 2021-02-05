/**
 * Sevilla URL routes.
 */
export const SevillaURL = {
  /**
   * Sevilla index route.
   */
  INDEX: '/sevilla',

  /**
   * Edit Sevilla condo route.
   */
  EDIT_CONDO: '/sevilla/edit',

  /**
   * Sevilla houses route.
   */
  HOUSES: '/sevilla/houses',

  /**
   * Sevilla club house route.
   */
  CLUB_HOUSE: '/sevilla/club_house',

  /**
   * Sevilla reservation info route.
   */
  RESERVATION: (id) => `/sevilla/club_house/${id}`,

  /**
   * Sevilla residents route.
   */
  RESIDENTS: '/sevilla/residents',

  /**
   * Sevilla resident info route.
   */
  RESIDENT_INFO: (id) => `/sevilla/residents/${id}`,

  /**
   * Sevilla resident payments history route.
   */
  RESIDENT_PAYMENTS: (id) => `/sevilla/residents/${id}/history`,

  /**
   * Sevilla edit payment route.
   */
  EDIT_PAYMENT: (id, payment) => `/sevilla/residents/${id}/history/${payment}`,

  /**
   * Sevilla edit resident route.
   */
  EDIT_RESIDENT: (id) => `/sevilla/residents/${id}/edit`,

  /**
   * Sevilla edit resident password route.
   */
  editPassword: (id) => `/sevilla/residents/${id}/password`,

  /**
   * Sevilla add resident charge route.
   */
  ADD_CHARGE: (id) => `/sevilla/residents/${id}/add_charge`,

  /**
   * Sevilla add user route.
   */
  ADD_USER: '/sevilla/users/add',
};

/**
 * Plumbago URL routes.
 */
export const PlumbagoURL = {
  /**
   * Plumbago index route.
   */
  INDEX: '/plumbago',

  /**
   * Edit Plumbago condo route.
   */
  EDIT_CONDO: '/plumbago/edit',

  /**
   * Plumbago houses route.
   */
  HOUSES: '/plumbago/houses',

  /**
   * Plumbago club house route.
   */
  CLUB_HOUSE: '/plumbago/club_house',

  /**
   * Plumbago reservation info route.
   */
  RESERVATION: (id) => `/plumbago/club_house/${id}`,

  /**
   * Plumbago residents route.
   */
  RESIDENTS: '/plumbago/residents',

  /**
   * Plumbago resident info route.
   */
  RESIDENT_INFO: (id) => `/plumbago/residents/${id}`,

  /**
   * Plumbago resident payments history route.
   */
  RESIDENT_PAYMENTS: (id) => `/plumbago/residents/${id}/history`,

  /**
   * Plumbago edit payment route.
   */
  EDIT_PAYMENT: (id, payment) => `/plumbago/residents/${id}/history/${payment}`,

  /**
   * Plumbago edit resident route.
   */
  EDIT_RESIDENT: (id) => `/plumbago/residents/${id}/edit`,

  /**
   * Plumbago edit resident password route.
   */
  editPassword: (id) => `/plumbago/residents/${id}/password`,

  /**
   * Plumbago add resident charge route.
   */
  ADD_CHARGE: (id) => `/plumbago/residents/${id}/add_charge`,

  /**
   * Plumbago add user route.
   */
  ADD_USER: '/plumbago/users/add',
};

/**
 * Sevilla route.
 */
export const SEVILLA_ROUTE = '/sevilla';

export const SEVILLA_HOUSES_ROUTE = `${SEVILLA_ROUTE}/houses`;

export const SEVILLA_CLUBHOUSE_ROUTE = `${SEVILLA_ROUTE}/club_house`;

export const SEVILLA_RESIDENTS_ROUTE = `${SEVILLA_ROUTE}/residents`;

export const SEVILLA_RESIDENT_INFO_ROUTE = (id) =>
  `${SEVILLA_RESIDENTS_ROUTE}/${id}`;

export const SEVILLA_ADD_USERS_ROUTE = `${SEVILLA_ROUTE}/users/add`;

/**
 * Plumbago route.
 */
export const PLUMBAGO_ROUTE = '/plumbago';

export const PLUMBAGO_HOUSES_ROUTE = `${PLUMBAGO_ROUTE}/houses`;

export const PLUMBAGO_CLUBHOUSE_ROUTE = `${PLUMBAGO_ROUTE}/club_house`;

export const PLUMBAGO_RESIDENTS_ROUTE = `${PLUMBAGO_ROUTE}/residents`;

export const PLUMBAGO_RESIDENT_INFO_ROUTE = (id) =>
  `${PLUMBAGO_RESIDENTS_ROUTE}/${id}`;

export const PLUMBAGO_ADD_USERS_ROUTE = `${PLUMBAGO_ROUTE}/users/add`;
