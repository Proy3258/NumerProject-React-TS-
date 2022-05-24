import React, {ChangeEvent, FormEvent, FunctionComponent} from 'react'
import { NavBar } from '../components/NavBar'
import { DataTable, PropsCustom, PropsEquations } from '../interfaces/service';
import './css/formrootofequation.css'
import Equations from './Equations';


import {TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper} from '@mui/material';
import Tex2SVG from "react-hook-mathjax";
import { DesmosChart } from '../components/DesmosChart';
import { ApexChart } from '../components/ApexChart';



export default class FalsePosition extends Equations {
    
    constructor(props:PropsCustom){
        super(props);
        this.state = {
          Epsilon: props.Epsilon,
          Equation: props.Equation,
          Error: props.Error,
          Method: props.Method,
          Data: [],
          ApexChart: { Series: [], Categories: []},
          Answer:[]
        };
        this.xLChange = this.xLChange.bind(this);
        this.xRChange = this.xRChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
      }
    
      calcX1(xL:number,xR:number,equation:string):number{
        return ((xL * this.function(xR, equation)) - (xR * this.function(xL, equation))) / (this.function(xR, equation)-this.function(xL, equation));
      }
    
      calc(xL:number,xR:number,error:number,epsilon:number,equation:string):object{
        let x1:number = this.calcX1(xL,xR,equation),
          // เก็บข้อมูลในรูปแบบ Array
          listxL: Array<number> = [],
          listxR: Array<number> = [],
          listx1: Array<number> = [],
          listerror: Array<number> = [];
    
        // คำนวณค่า Error
        error = (this.function(xL, equation) * this.function(xR, equation)) ? this.error(x1, xL) : this.error(x1, xR);
    
        // loop คำนวณ falseposition
        while(error > epsilon && error != Infinity && listerror.length < 100){
          x1 = this.calcX1(xL,xR,equation);
          listxL.push(JSON.parse(xL.toFixed(6)));
          listxR.push(JSON.parse(xR.toFixed(6)));
          listx1.push(JSON.parse(x1.toFixed(6)));
          if((this.function(x1, equation) * this.function(xR, equation)) < 0){
            error = this.error(x1,xL);
            xL = x1;
          }
          else{
            error = this.error(x1,xR);
            xR = x1;
          }
          listerror.push(JSON.parse(error.toFixed(6)));
        }
        return({
          listxL:listxL,
          listxR:listxR,
          listx1:listx1,
          listerror:listerror,
          Epsilon:epsilon,
          Equation:equation
        })
    
      }
    
      //เก็บ value ลง Method falseposition
      xLChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquations.FalsePosition.xL = JSON.parse(event.target.value);
        this.setState({Method: this.props.Method});
      }
      xRChange(event:ChangeEvent<HTMLInputElement>){
          this.props.Method.RootEquations.FalsePosition.xR = JSON.parse(event.target.value);
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
          this.state.Method.RootEquations.FalsePosition.xL,
          this.state.Method.RootEquations.FalsePosition.xR,
          this.state.Error,
          this.state.Epsilon,
          this.state.Equation
      );
      //loop แสดงค่าแต่ละตัวแปร ลงใน row แล้วนำไปแสดงใน DataTable
      let row:Array<DataTable> = []
      for(let i:number = 0 ; i<Result.listerror.length ; ++i){
          row.push({
              xL:Result.listxL[i],
              xR:Result.listxR[i],
              xM:Result.listx1[i],
              FxL:JSON.parse(this.function(Result.listxL[i],this.state.Equation).toFixed(6)),
              FxR:JSON.parse(this.function(Result.listxR[i],this.state.Equation).toFixed(6)),
              FxM:JSON.parse(this.function(Result.listx1[i],this.state.Equation).toFixed(6)),
              Error:Result.listerror[i] 
          });
          let Answer:Array<number> = Result.listx1[Result.listerror.length-1];
          this.setState({
            Data:row,
            Answer:Answer,
            ApexChart: {
              Series: [
                  {name: "XL", data: Result.listxL},
                  {name: "XR", data: Result.listxR},
                  {name: "X1", data: Result.listx1},
                  {name: "Error", data: Result.listerror}
              ],
              Categories: Result.listerror.count
          }
        })
        }
      }
      render(){
         return (
              <div>
                <NavBar />
                <div className="headequation">
                  <h1>FALSE POSITION</h1>
                </div>
                <div className="headequation">
                  <form onSubmit={this.handleSubmit}>
                    <div className="myform">
                      <TextField id="demo-helper-text-misaligned" label="Equation" type={"text"} onChange={this.equationChange}/>
                      <TextField id="demo-helper-text-misaligned" label="XL" type={"number"} value={this.state.Method.RootEquations.FalsePosition.xL} inputProps={{step: Math.pow(10,-6)}} onChange={this.xLChange}/>
                      <TextField id="demo-helper-text-misaligned" label="XR" type={"number"} defaultValue={this.state.Method.RootEquations.FalsePosition.xR} inputProps={{step: Math.pow(10,-6)}} onChange={this.xRChange}/>
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
                  xLPoint={this.state.Method.RootEquations.FalsePosition.xL} xRPoint={this.state.Method.RootEquations.FalsePosition.xR}></DesmosChart>
                </div>
                <br></br>
                <div>
                <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
                </div>
                <br></br>
                <div>
                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Iteration</TableCell>
                        <TableCell align="right">xL</TableCell>
                        <TableCell align="right">xR</TableCell>
                        <TableCell align="right">x1</TableCell>
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
                      <TableCell align="right">{row.xL}</TableCell>
                      <TableCell align="right">{row.xR}</TableCell>
                      <TableCell align="right">{row.xM}</TableCell>
                      <TableCell align="right">{row.Error}</TableCell>
                  </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
                
            </div>
         )     
      }
}