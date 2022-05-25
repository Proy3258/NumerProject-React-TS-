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

export default class Secant extends Equations{
//   constructor(props:PropsCustom){
//     super(props);
//     this.state = {
//         Epsilon: props.Epsilon,
//         Equation: props.Equation,
//         Error: props.Error,
//         Method: props.Method,
//         Data: [],
//         ApexChart: {Series: [], Categories: []},
//         Answer: [],
//         Token:'',
//         Url:'',
//         Problem:[]
//     };
//     this.xChange = this.xChange.bind(this);
//     this.equationChange = this.equationChange.bind(this);
//     this.epsilonChange = this.epsilonChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

// }
//   calc(x:number,xi:number,error:number,epsilon:number,equation:string) : object {
//     let xiNew:number = x-((this.function(x,equation)*(x-xi))/(this.function(x,equation)-this.function(xi,equation))),
//         listx: Array<number> = [],
//         listxi: Array<number> = [],
//         listerror: Array<number> = [];

//     //First time
//     error = this.error(xiNew,x);

//    //Begin iteration
//     while (error > epsilon && error != Infinity && listerror.length < 100) {
//         xiNew = x-((this.function(x,equation)*(x-xi))/(this.function(x,equation)-this.function(xi,equation)));
//         error = this.error(xiNew,x);

//         //Get Data
//         this.listResult(listx,x);
//         this.listResult(listxi,xi);
//         this.listResult(listerror,error);

//         xi = xiNew + (xi-x);
//         x = xiNew;
//     }
//     // Result
//     return (
//         {
//           listx:listx,
//           listxi:listxi,
//           listerror:listerror,
//           Epsilon:epsilon,
//           Equation:equation
//         }
//     );
//   }
//   xChange(event:ChangeEvent<HTMLInputElement>){
//       this.props.Method.RootEquations.Secant.x = JSON.parse(event.target.value);
//       this.setState({Method: this.props.Method});
//   }
//   xiChange(event:ChangeEvent<HTMLInputElement>){
//     this.props.Method.RootEquations.Secant.xi = JSON.parse(event.target.value);
//     this.setState({Method: this.props.Method});
// }
//   equationChange(event:ChangeEvent<HTMLInputElement>){
//     this.setState({Equation:event.target.value});
//   }
//   epsilonChange(event:ChangeEvent<HTMLInputElement>){
//     this.setState({Epsilon:JSON.parse(event.target.value)});
//   }
//   handleSubmit(event:FormEvent<HTMLFormElement>){
//       event.preventDefault();
//       let Result:any = this.calc(
//         this.state.Method.RootEquations.Secant.x,
//         this.state.Method.RootEquations.Secant.xi,
//         this.state.Error,
//         this.state.Epsilon,
//         this.state.Equation
//     );

//       let row:Array<DataTable> = [];
//       for(let i:number = 0; i<Result.listerror.length; ++i){
//           row.push({
//             xL: Result.listx[i],
//             xR: Result.listxi[i],
//             Error: Result.listerror[i]
//           });
//       }

//       //set state to chart and table
//       this.setState({
//           Data:row,
//           ApexChart: {
//               Series: [
//                   {name: "X", data: Result.listx},
//                   {name: "Xi", data: Result.listxi},
//                   {name: "Error", data: Result.listerror}
//               ],
//               Categories: Result.listerror.count
//           }
//       });

//   }
//     render(){
//         return(
//             <div>
//             <NavBar />
//                 <div className="headequation">
//                   <h1>SECANT</h1>
//                 </div>
//                 <div className="headequation">
//               <form onSubmit={this.handleSubmit}>
//                 <div className="myform">
//                   <TextField id="demo-helper-text-misaligned" label="Equation" type={"text"} onChange={this.equationChange}/>
//                   <TextField id="demo-helper-text-misaligned" label="X" type={"number"} defaultValue={this.state.Method.RootEquations.Secant.x} inputProps={{step: Math.pow(10,-6)}} onChange={this.xChange}/>
//                   <TextField id="demo-helper-text-misaligned" label="X" type={"number"} defaultValue={this.state.Method.RootEquations.Secant.xi} inputProps={{step: Math.pow(10,-6)}} onChange={this.xChange}/>
//                   <TextField id="demo-helper-text-misaligned" label="Epsilon" type={"number"} defaultValue={this.state.Error} inputProps={{step: Math.pow(10,-6)}} onChange={this.epsilonChange}/>
//                 </div>
//                 <div>
//                   <Button variant="outlined" color="secondary" type={"submit"}>Submit</Button>
//                 </div>    
//               </form>
//             </div>
//             <br></br>
//             <div className="setequation">
//                   Equation : <Tex2SVG display="inline" latex={this.state.Equation} />
//             </div>
//             <br></br>
//             <div>
//               <DesmosChart Equation={this.state.Equation} Answer={this.state.Answer}
//               xLPoint={this.state.Method.RootEquations.Onepoint.x} xRPoint={0} ></DesmosChart>
//             </div>
//             <br></br>
//             <div>
//               <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
//             </div>
//             <br></br>
//             <div>
//               <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Iteration</TableCell>
//                     <TableCell align="right">x</TableCell>
//                     <TableCell align="right">xi</TableCell>
//                     <TableCell align="right">Error</TableCell>
//                   </TableRow>
//                 </TableHead>
//               <TableBody>
//                 {this.state.Data.map((row,index) => (
//                   <TableRow
//                     key={index}
//                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                   >
//                   <TableCell component="th" scope="row">
//                     {index}
//                   </TableCell>
//                   <TableCell align="right">{row.xL}</TableCell>
//                   <TableCell align="right">{row.xR}</TableCell>
//                   <TableCell align="right">{row.Error}</TableCell>
//               </TableRow>
//               ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//             </div>
//             </div>
//         )
//     }
}