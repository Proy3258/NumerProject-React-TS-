import { row } from 'mathjs';
import React, {ChangeEvent, FormEvent, FunctionComponent} from 'react'
import { NavBar } from '../components/NavBar'
import { DataTable, PropsCustom, PropsEquations } from '../interfaces/service';
import './css/Bisection.css'
import Equations from './Equations';

import {TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper} from '@mui/material';

export default class Bisection extends Equations {

  constructor(props:PropsCustom){
    super(props);
    this.state = {
      Epsilon: props.Epsilon,
      Equation: props.Equation,
      Error: props.Error,
      Method: props.Method,
      Data: [{}]
    };
    this.xLChange = this.xLChange.bind(this);
    this.xRChange = this.xRChange.bind(this);
    this.equationChange = this.equationChange.bind(this);
    this.epsilonChange = this.epsilonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  calcXm(xL:number,xR:number){
    return (xL+xR)/2;
  }

  calc(xL:number,xR:number,error:number,epsilon:number,equation:string):object{
    let xM:number = this.calcXm(xL,xR),
      listxL: Array<number> = [],
      listxR: Array<number> = [],
      listxM: Array<number> = [],
      listerror: Array<number> = [];

    // คำนวณค่า Error
    error = (this.function(xL, equation) * this.function(xR, equation)) ? this.error(xM, xL) : this.error(xM, xR);
    
    listxL.push(JSON.parse(xL.toFixed(6)));
    listxR.push(JSON.parse(xR.toFixed(6)));
    listxM.push(JSON.parse(xM.toFixed(6)));
    listerror.push(JSON.parse(error.toFixed(6)));

    while(error > epsilon){
      xM = this.calcXm(xL,xR);
      if((this.function(xL, equation) * this.function(xR, equation)) < 0){
        error = this.error(xM,xL);
        xL = xM;
      }
      else{
        error = this.error(xM,xR);
        xR = xM;
      }
      listxL.push(JSON.parse(xL.toFixed(6)));
      listxR.push(JSON.parse(xR.toFixed(6)));
      listxM.push(JSON.parse(xM.toFixed(6)));
      listerror.push(JSON.parse(error.toFixed(6)));

    }
    return({
      listxL:listxL,
      listxR:listxR,
      listxM:listxM,
      listerror:listerror,
      epsilon:epsilon,
      equation:equation
    })

  }

  xLChange(event:ChangeEvent<HTMLInputElement>){
    this.props.Method.RootEquations.Bisection.xL = JSON.parse(event.target.value) ;
    this.setState({Method: this.props.Method});
  }
  xRChange(event:ChangeEvent<HTMLInputElement>){
      this.props.Method.RootEquations.Bisection.xR = JSON.parse(event.target.value) ;
      this.setState({Method: this.props.Method});
  }
  equationChange(event:ChangeEvent<HTMLInputElement>){
      this.setState({Equation:event.target.value});
  }
  epsilonChange(event:ChangeEvent<HTMLInputElement>){
      this.setState({Epsilon:JSON.parse(event.target.value)});
  }

  handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let Result:any = this.calc(
      this.state.Method.RootEquations.Bisection.xL,
      this.state.Method.RootEquations.Bisection.xR,
      this.state.Error,
      this.state.Epsilon,
      this.state.Equation
  );
  let row:Array<DataTable> = []
  for(let i:number = 0 ; i<Result.listerror.length ; ++i){
      row.push({
          Bisection:{
              xL:Result.listxL[i],
              xR:Result.listxR[i],
              xM:Result.listxM[i],
              FxL:JSON.parse(this.function(Result.listxL[i],this.state.Equation).toFixed(6)),
              FxR:JSON.parse(this.function(Result.listxR[i],this.state.Equation).toFixed(6)),
              FxM:JSON.parse(this.function(Result.listxM[i],this.state.Equation).toFixed(6)),
              Error:Result.listerror[i]
          }
      });
      this.setState({
        Data:row
    })
    }
  }
  render(){
     return (
          <div>
            <NavBar />
            <div className="headbisection">
              <h1>BISECTION</h1>
            </div>
            <div className="headbisection">
              <form onSubmit={this.handleSubmit}>
                <div className="myform">
                  <TextField id="demo-helper-text-misaligned" label="Equation" type={"text"} onChange={this.equationChange}/>
                  <TextField id="demo-helper-text-misaligned" label="XL" type={"number"} inputProps={{step: Math.pow(10,-6)}} onChange={this.xLChange}/>
                  <TextField id="demo-helper-text-misaligned" label="XR" type={"number"} inputProps={{step: Math.pow(10,-6)}} onChange={this.xRChange}/>
                  <TextField id="demo-helper-text-misaligned" label="Epsilon" type={"number"} inputProps={{step: Math.pow(10,-6)}} onChange={this.epsilonChange}/>
                </div>
                <div>
                  <Button variant="outlined" color="secondary" type={"submit"}>Submit</Button>
                </div>    
              </form>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Iteration</TableCell>
                    <TableCell align="right">xL</TableCell>
                    <TableCell align="right">xR</TableCell>
                    <TableCell align="right">xM</TableCell>
                    <TableCell align="right">Error</TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                {this.state.Data.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.Bisection?.xL}</TableCell>
                  <TableCell align="right">{row.Bisection?.xR}</TableCell>
                  <TableCell align="right">{row.Bisection?.xM}</TableCell>
                  <TableCell align="right">{row.Bisection?.Error}</TableCell>
              </TableRow>
        ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
     )     
  }
 
}
