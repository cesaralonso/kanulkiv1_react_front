import {lazy} from 'react';

const Login = lazy(() => import('./views/Pages/Login'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Logout = lazy(() => import('./views/logout'));

const RegisterSuccess = lazy(() =>
  import('./views/Pages/RegisterInfo/RegisterSuccess'),
);

const Users = lazy(() => import('./views/Users/Users'));
const addUser = lazy(() => import('./views/Users/addUser'));
const editOrDeleteUser = lazy(() => import('./views/Users/editOrDeleteUser'));

const Sevilla = lazy(() => import('./views/Sevilla/Sevilla'));
const SevillaTenants = lazy(() => import('./views/Sevilla/SevillaTenants'));
const SevillaClubHouse = lazy(() => import('./views/Sevilla/ClubHouse'));
const SevillaReservation = lazy(() => import('./views/Sevilla/Reservation'));
const SevillaHousesList = lazy(() => import('./views/Sevilla/HousesList'));
const SevillaHouseInfo = lazy(() => import('./views/Sevilla/HouseInfo'));
const SevillaEditTenant = lazy(() => import('./views/Sevilla/EditTenant'));
const SevillaEditPassword = lazy(() => import('./pages/SevillaEditPassword'));
const SevillaTenantInfo = lazy(() => import('./views/Sevilla/TenantInfo'));
const EditSevilla = lazy(() => import('./views/Sevilla/EditSevilla'));
const SevillaAddCharge = lazy(() => import('./views/Sevilla/AddCharge'));
const SevillaPaymentHistory = lazy(() =>
  import('./views/Sevilla/PaymentHistory'),
);
const SevillaEditPayment = lazy(() => import('./views/Sevilla/EditPayment'));

const Plumbago = lazy(() => import('./views/Plumbago/Plumbago'));
const PlumbagoTenants = lazy(() => import('./views/Plumbago/PlumbagoTenants'));
const PlumbagoClubHouse = lazy(() => import('./views/Plumbago/ClubHouse'));
const PlumbagoReservation = lazy(() => import('./views/Plumbago/Reservation'));
const PlumbagoHousesList = lazy(() => import('./views/Plumbago/HousesList'));
const PlumbagoHouseInfo = lazy(() => import('./views/Plumbago/HouseInfo'));
const PlumbagoEditTenant = lazy(() => import('./views/Plumbago/EditTenant'));
const PlumbagoEditPassword = lazy(() => import('./pages/PlumbagoEditPassword'));
const PlumbagoTenantInfo = lazy(() => import('./views/Plumbago/TenantInfo'));
const EditPlumbago = lazy(() => import('./views/Plumbago/EditPlumbago'));
const PlumbagoAddCharge = lazy(() => import('./views/Plumbago/AddCharge'));
const PlumbagoPaymentHistory = lazy(() =>
  import('./views/Plumbago/PaymentHistory'),
);
const PlumbagoEditPayment = lazy(() => import('./views/Plumbago/EditPayment'));

const routes = [
  {path: '/', exact: true, name: 'Inicio'},
  {path: '/login', name: 'Login', component: Login},
  {path: '/logout', name: 'Logout', component: Logout},
  {
    path: '/registerSuccess',
    exact: true,
    name: 'Register success',
    component: RegisterSuccess,
  },
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},

  {path: '/users', exact: true, name: 'Usuarios', component: Users},
  {
    path: '/users/add',
    exact: true,
    name: 'Agregar usuario',
    component: addUser,
  },
  {
    path: '/users/:id',
    exact: true,
    name: 'Editar or Eliminar Usuario',
    component: editOrDeleteUser,
  },

  /**
   * Sevilla.
   */
  {
    path: '/sevilla',
    exact: true,
    name: 'Sevilla',
    component: Sevilla,
  },
  {
    path: '/sevilla/users/add',
    exact: true,
    name: 'Agregar usuario',
    component: addUser,
  },
  {
    path: '/sevilla/residents',
    exact: true,
    name: 'Residentes',
    component: SevillaTenants,
  },
  {
    path: '/sevilla/club_house',
    exact: true,
    name: 'Casa club',
    component: SevillaClubHouse,
  },
  {
    path: '/sevilla/club_house/:reservation_id',
    exact: true,
    name: 'Reservación',
    component: SevillaReservation,
  },
  {
    path: '/sevilla/houses',
    exact: true,
    name: 'Casas',
    component: SevillaHousesList,
  },
  {
    path: '/sevilla/houses/:house_id',
    exact: true,
    name: 'Detalle de casa',
    component: SevillaHouseInfo,
  },
  {
    path: '/sevilla/residents/:tenant_id/edit',
    exact: true,
    name: 'Editar residente',
    component: SevillaEditTenant,
  },
  {
    path: '/sevilla/residents/:tenant_id/password',
    exact: true,
    name: 'Editar contraseña',
    component: SevillaEditPassword,
  },
  {
    path: '/sevilla/residents/:tenant_id/add_charge',
    exact: true,
    name: 'Añadir cargo / pago',
    component: SevillaAddCharge,
  },
  {
    path: '/sevilla/residents/:tenant_id/history/:payment_id',
    exact: true,
    name: 'Editar pago',
    component: SevillaEditPayment,
  },
  {
    path: '/sevilla/residents/:tenant_id/history',
    exact: true,
    name: 'Histórico',
    component: SevillaPaymentHistory,
  },
  {
    path: '/sevilla/residents/:tenant_id',
    exact: true,
    name: 'Detalle de residente',
    component: SevillaTenantInfo,
  },
  {
    path: '/sevilla/edit',
    exact: true,
    name: 'Editar información',
    component: EditSevilla,
  },

  /**
   * Plumbago.
   */
  {
    path: '/plumbago',
    exact: true,
    name: 'Plumbago',
    component: Plumbago,
  },
  {
    path: '/plumbago/users/add',
    exact: true,
    name: 'Agregar usuario',
    component: addUser,
  },
  {
    path: '/plumbago/residents',
    exact: true,
    name: 'Residentes',
    component: PlumbagoTenants,
  },
  {
    path: '/plumbago/club_house',
    exact: true,
    name: 'Casa club',
    component: PlumbagoClubHouse,
  },
  {
    path: '/plumbago/club_house/:reservation_id',
    exact: true,
    name: 'Reservación',
    component: PlumbagoReservation,
  },
  {
    path: '/plumbago/houses',
    exact: true,
    name: 'Casas',
    component: PlumbagoHousesList,
  },
  {
    path: '/plumbago/houses/:house_id',
    exact: true,
    name: 'Detalle de casa',
    component: PlumbagoHouseInfo,
  },
  {
    path: '/plumbago/residents/:tenant_id/edit',
    exact: true,
    name: 'Editar residente',
    component: PlumbagoEditTenant,
  },
  {
    path: '/plumbago/residents/:tenant_id/password',
    exact: true,
    name: 'Editar contraseña',
    component: PlumbagoEditPassword,
  },
  {
    path: '/plumbago/residents/:tenant_id/add_charge',
    exact: true,
    name: 'Añadir cargo / pago',
    component: PlumbagoAddCharge,
  },
  {
    path: '/plumbago/residents/:tenant_id/history/:payment_id',
    exact: true,
    name: 'Editar pago',
    component: PlumbagoEditPayment,
  },
  {
    path: '/plumbago/residents/:tenant_id/history',
    exact: true,
    name: 'Histórico',
    component: PlumbagoPaymentHistory,
  },
  {
    path: '/plumbago/residents/:tenant_id',
    exact: true,
    name: 'Detalle de residente',
    component: PlumbagoTenantInfo,
  },
  {
    path: '/plumbago/edit',
    exact: true,
    name: 'Editar información',
    component: EditPlumbago,
  },
];

export default routes;
