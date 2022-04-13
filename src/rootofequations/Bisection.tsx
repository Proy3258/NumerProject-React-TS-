import { row } from 'mathjs';
import { useState,FC,ChangeEvent } from 'react'
import { NavBar } from '../components/NavBar'
import { DataTable, PropsCustom, PropsEquations } from '../interfaces/service';
import './css/Bisection.css'
import Equations from './Equations';


export default class Bisection extends Equations {

  constructor(props:PropsCustom){
    super(props);
    this.state = {
      Epsilon: props.Epsilon,
      Equations: props.Equation,
      Error: props.Error,
      Method: props.Method
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

    while(error > epsilon && listerror.length < 100){
      xM = this.calcXm(xL,xR);
      if((this.function(xL, equation) * this.function(xR, equation)) < 0){
        error = this.error(xM,xL);
        xL = xM;
      }
      else{
        error = this.error(xR,xR);
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

  handleSubmit (event:ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    let Result:any = this.calc(
      this.state.Method.RootEquations.Bisection.xL,
      this.state.Method.RootEquations.Bisection.xR,
      this.state.Error,
      this.state.Epsilon,
      this.state.Equation
  );
  let row:Array<DataTable> = []
  for(let i:number = 0 ; i<Result.listError.length ; ++i){
      row.push({
          Bisection:{
              xL:Result.listxL[i],
              xR:Result.listxR[i],
              xM:Result.listxM[i],
              FxL:JSON.parse(this.function(Result.listxL[i],this.state.Equations).toFixed(6)),
              FxR:JSON.parse(this.function(Result.listxR[i],this.state.Equations).toFixed(6)),
              FxM:JSON.parse(this.function(Result.listxM[i],this.state.Equations).toFixed(6)),
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
            <div className="myform">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label> 
                    Equation: &nbsp; 
                    <input type="text" onChange={this.equationChange} />
                    {/* <input type="text"  /> */}
                  </label>
                </div>
                <div>
                  <label> 
                    xL: &nbsp; 
                    <input type="text" />
                  </label>
                </div>
                <div>
                  <label> 
                  xR: &nbsp; 
                  <input type="text"  />
                  </label>
                </div>
                  <input type="submit" />
              </form>
              
            </div>
          </div>
     )     
  }
 
}
