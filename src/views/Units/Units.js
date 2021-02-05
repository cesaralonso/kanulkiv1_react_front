import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { obtainUnits } from '../../redux/actions/units';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class Units extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount = async () =>  {
        await this.props.obtainUnits();
    }

    render() {
        const { units, isFetching } = this.props.units;
        if(isFetching) {
            return(
            <Row>
                <Col sm={12} md={12} lg={12}>
                        <div className='sweet-loading d-flex align-items-center'>
                                <BeatLoader
                                css={override}
                                sizeUnit={"px"}
                                size={17}
                                color={'#63c2de'}
                                loading={this.state.loading}
                                />
                        </div> 
                </Col>
            </Row>
            )
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Unidades
                            </CardHeader>
                            <Link to="/units/add">
                                <div>
                                    <Button color="primary" className="mt-3" active tabIndex={-1} style={{marginLeft:20}}>
                                      <i className="fa fa-plus px-2"></i>Agregar&nbsp;</Button>
                                </div>
                            </Link>
                            <CardBody>
                         
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        units.map(unit => (
                                            <tr>
                                                <td><Link to={`/units/${unit.id}`}>  {unit.name} </Link></td>
                                            </tr>                                            
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>  
        )
    }
}

function mapStateToProps(state) {
    return {
      units: state.units,
    };
  }  
  function mapDispatchToProps(dispatch) {
    return {
        obtainUnits: () => dispatch(obtainUnits()),
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Units);


