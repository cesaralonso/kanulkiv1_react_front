const userId = localStorage.getItem("userId");
const roleId = localStorage.getItem("roleId");

let items = [];

if (userId === "1" && roleId === "1") {
  items = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-tachometer",
    },
    {
      name: "Usuarios",
      url: "/users",
      icon: "fa fa-user",
    },
    {
      name: "Sevilla",
      url: "/sevilla",
      icon: "fa fa-building",
    },
    {
      name: "Plumbago",
      url: "/plumbago",
      icon: "fa fa-building",
    },
    {
      name: "Cerrar sesión",
      url: "/logout",
      icon: "fa fa-sign-out",
    },
  ];
} else if (userId === "257" && roleId === "1") {
  items = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-tachometer",
    },
    {
      name: "Condominio",
      url: "/sevilla",
      icon: "fa fa-building",
    },
    {
      name: "Cerrar sesión",
      url: "/logout",
      icon: "fa fa-sign-out",
    },
  ];
} else if (userId === "258" && roleId === "1") {
  items = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-tachometer",
    },
    {
      name: "Condominio",
      url: "/plumbago",
      icon: "fa fa-building",
    },
    {
      name: "Cerrar sesión",
      url: "/logout",
      icon: "fa fa-sign-out",
    },
  ];
}

export default { items };
