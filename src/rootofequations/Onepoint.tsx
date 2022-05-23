import React, {ChangeEvent, FormEvent, FunctionComponent} from 'react'
import { NavBar } from '../components/NavBar'
import { DataTable, PropsCustom, PropsEquations } from '../interfaces/service';
import Equations from './Equations';

import {TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper} from '@mui/material';
import Tex2SVG from "react-hook-mathjax";
import { DesmosChart } from '../components/DesmosChart';
import { ApexChart } from '../components/ApexChart';

export default class Onepoint extends Equations{
    
    constructor(props:PropsCustom){
        super(props);
        this.state = {
            Epsilon: props.Epsilon,
            Equation: props.Equation,
            Error: props.Error,
            Method: props.Method,
            Data: [],
            ApexChart: {Series: [], Categories: []},
            Answer: []
        };
        this.xChange = this.xChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    xChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquations.Onepoint.x = JSON.parse(event.target.value);
        this.setState({Method: this.props.Method});
    }
    equationChange(event:ChangeEvent<HTMLInputElement>){
      this.setState({Equation:event.target.value});
    }
    epsilonChange(event:ChangeEvent<HTMLInputElement>){
      this.setState({Epsilon:JSON.parse(event.target.value)});
    }
    handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();

    }
    render(){
        return(
            <div>
            <NavBar />
            <div className="headbisection">
              <h1>ONE-POINT ITERATION</h1>
            </div>
            <div className="headbisection">
              <form onSubmit={this.handleSubmit}>
                <div className="myform">
                  <TextField id="demo-helper-text-misaligned" label="Equation" type={"text"} onChange={this.equationChange}/>
                  <TextField id="demo-helper-text-misaligned" label="X" type={"number"} defaultValue={this.state.Method.RootEquations.Onepoint.x} inputProps={{step: Math.pow(10,-6)}} onChange={this.xChange}/>
                  <TextField id="demo-helper-text-misaligned" label="Epsilon" type={"number"} defaultValue={this.state.Error} inputProps={{step: Math.pow(10,-6)}} onChange={this.epsilonChange}/>
                </div>
                <div>
                  <Button variant="outlined" color="secondary" type={"submit"}>Submit</Button>
                </div>    
              </form>
            </div>
            <br></br>
            <div className="setequation">
                  Equation : <Tex2SVG display="inline" latex={this.state.Equation} />
            </div>
            <br></br>
            <div>
              <DesmosChart Equation={this.state.Equation} Answer={this.state.Answer}
              xLPoint={this.state.Method.RootEquations.Bisection.xL} xRPoint={this.state.Method.RootEquations.Bisection.xR}></DesmosChart>
            </div>
            <br></br>
            <div>
              <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
            </div>
            <br></br>
            
        </div>
        )
    }
}