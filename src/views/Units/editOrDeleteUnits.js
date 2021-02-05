import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUnits, fetchUnits ,obtainUnits, updateUnits } from '../../redux/actions/units';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class EditOrDeleteUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null
        };
    }

    componentWillMount = async () => {
        this.setState({id:this.props.match.params.id});
        await this.props.fetchUnits(this.props.match.params.id);
    }


    handleText(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    delete = async () => {
       await this.props.deleteUnits(this.state.id);
        this.props.history.push('/units');
    }

    saveData = async () => {
        await this.props.updateUnits(this.state.name, this.state.id);
        this.props.history.push('/units');
    }


    goBack() {
        this.props.obtainUnits();
        this.props.history.push('/units');
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
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Agregar unidad de medida</strong>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                        <Label htmlFor="company">Nombre</Label>
                        <Input  onChange={(e)=>this.handleText(e)} defaultValue={units.name} type="text" id="name" name="name" placeholder="Ingrese tipo" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                        <Button onClick={() => this.delete()} color="danger">Eliminar</Button>
                        <Button onClick={() => this.goBack()} color="warning">Cancelar</Button>
                    </CardFooter>
                </Card>
            </Col>
        </div>
        );
    }


}

function mapStateToProps(state) {
    return {
      units: state.units,
    };
  }  
  function mapDispatchToProps(dispatch) {
    return {
        fetchUnits: (id) => dispatch(fetchUnits(id)),
        obtainUnits: () => dispatch(obtainUnits()),
        deleteUnits: (idType) => dispatch(deleteUnits(idType)),
        updateUnits: (type, id) => dispatch(updateUnits(type, id))
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditOrDeleteUnit);


