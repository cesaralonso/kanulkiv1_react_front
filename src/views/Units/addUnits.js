import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeUnits } from '../../redux/actions/units';
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:''
        };  
    }


saveData = async () => {
    const res = await this.props.storeUnits(this.state.name);
    if(res) {
        this.props.history.push('/units');
    }
    
}

handleText(e) {
    this.setState({[e.target.name]:e.target.value});
}


    render() {
        return(
        <div className="animated fadeIn">
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Agregar unidad</strong>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                        <Label htmlFor="brand">Nombre</Label>
                        <Input  onChange={(e)=>this.handleText(e)} type="text" id="name" name="name" placeholder="Ingrese unidad de medida" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.saveData()} color="primary">Guardar</Button>
                        <Link to="/units">
                            <Button color="warning">Cancelar</Button>
                        </Link>
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
        storeUnits: (name) => dispatch(storeUnits(name)),
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Forms);
