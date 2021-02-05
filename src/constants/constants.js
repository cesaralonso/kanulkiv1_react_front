/*
 * Constants Files for Project Kanulki Frontend
 */

export const URLBASE = "https://kanulki.webtestdev.site/";
// export const URLBASE = 'http://localhost:3001/';
export const APIURLBASE = "https://api.kanulki.webtestdev.site/";
export const APIV1URLBASE = "https://api.kanulki.webtestdev.site/api/v1/";
// export const APIV1URLBASE = 'http://127.0.0.1:8000/api/v1/';
export const FORGEPUBLICPATH = "/home/forge/api.kanulki.com/public/";
export const ERRORATLOGIN = "Usuario o Contraseña incorrecto.";
export const ONLYADMINUSERSLOGIN =
  "Solo los usuarios administrador tienen acceso al panel web.";
export const REGISTER = "register";
export const LOGIN = "/login";
export const ADDBTN = "/add";
export const SLASH = "/";
export const DASHBOARDBTN = "/dashboard";
export const USERSURL = "/users";

export const USERS = "users";
export const DASH = "/";
export const TXTBEFOREREGISTRATION =
  "Para el correcto registro será necesario llenes todos los campos solicitados";
export const TITLEAPP = "Kanulki";
export const SUCCESSFULSAVING = "Guardado con exito";
export const ERRORSAVING = "Error al guardar";
export const ADDRESIDENTUSER = "Agregar nuevo usuario residente (App)";
export const SEVILLA = "sevilla";
export const SEVILLAURL = "/sevilla";
export const PLUMBAGO = "plumbago";
export const PLUMBAGOURL = "/plumbago";

/**
 * Condos.
 */
export const CONDO = {
  SEVILLA: {
    ID: 1,
    NAME: "Condominio Sevilla",
  },

  PLUMBAGO: {
    ID: 2,
    NAME: "Condominio Plumbago",
  },
};

export const TableClasses = {
  table: "table-striped table-hover table-outline mt-3 mb-0",
  thead: "bg-dark font-weight-bold",
  paginationOptsFormControl: "mx-1",
  paginationButton: "btn-dark",
  filterClearButton: "btn-dark",
  tbodyRow: "touchable-row",
};

/**
 * Table labels
 */
export const TableLabels = {
  show: "Mostrar",
  entries: "resultados",
  first: "<<",
  last: ">>",
  next: ">",
  prev: "<",
  filterPlaceholder: "Buscar...",
  noResults: "Sin resultados",
};

/**
 * Residents table headers.
 */
export const ResidentsHeaders = [
  {
    prop: "house_name",
    title: "Casa",
    sortable: true,
    filterable: true,
  },
  { prop: "name", title: "Nombre", sortable: true, filterable: true },
  { prop: "last_name", title: "Apellidos", sortable: true, filterable: true },
  {
    prop: "email",
    title: "Correo electrónico",
    sortable: true,
    filterable: true,
  },
  {
    prop: "balance",
    title: "Saldo de cuenta",
    sortable: true,
    cell: (resident) => `$${resident.balance}`,
  },
];

/**
 * Houses table headers.
 */
export const HousesHeaders = [
  { prop: "house_name", title: "Nombre", sortable: true, filterable: true },
  { prop: "house_description", title: "Descripción", sortable: true },
  { prop: "name", title: "Nombre del residente", sortable: true },
  { prop: "last_name", title: "Apellidos del residente", sortable: true },
];
