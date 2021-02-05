import React, { Component } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logo.png'
import * as Constants from '../../constants/constants';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
          /*
          <nav className="navbar navbar-dark fixed-top" style={{ 'backgroundColor': '#05073B', 'height': '75px' }}>
            <button className="navbar-toggler" type="button" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">Hidden brand</a>
              <img src={logo} style={{ width: 95, height: 'auto', alt: 'REDI Logo'}} align='left' />
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contacto</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Acerca de REDI</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Clientes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Residuos</a>
                </li>
              </ul>
            </div>
          </nav>
          */
    return (
      <React.Fragment>
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light fixed-top" style={{ 'backgroundColor': '#05073B', 'height': '75px' }}>
            <Link to={Constants.DASH}>
                <img src={logo} style={{ width: 95, height: 'auto', alt: Constants.TITLEAPP}} align='left' />
            </Link>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style={{ 'align': 'right' }}>
              <li class="nav-item active">
                <a class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <Link  to="">
                  <p style={{ 'color': '#FFF', 'font-size': '16px', 'marginRight': '20px', 'fontWeight': 'bold' }}>Acerca de Constants.TITLEAPP</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={Constants.REGISTER}>
                  <p style={{ 'color': '#FFF', 'font-size': '16px', 'marginRight': '20px', 'fontWeight': 'bold' }}>Regístrate</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to={Constants.LOGIN}>
                  <p style={{ 'color': '#FFF', 'font-size': '16px', 'marginRight': '20px', 'fontWeight': 'bold' }}>Iniciar Sesión</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
