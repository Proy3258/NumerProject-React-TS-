import React, {ChangeEvent, FormEvent } from 'react'
import { NavBar } from '../components/NavBar'
import { DataTable, PropNumerical } from '../interfaces/service';
import './css/formrootofequation.css'
import Equations from './Equations';

import {TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Autocomplete} from '@mui/material';
import Tex2SVG from "react-hook-mathjax";
import axios from 'axios';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default class Onepoint extends Equations{
    
    constructor(props:PropNumerical){
        super(props);
        this.state = {
          StateEquation: props.StateEquation,
          Data: [],
          ApexChart: {Series: [], Categories: []},
          Answer:[]
        };
        this.setState({StateEquation:props.StateEquation});
        this.xChange = this.xChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    calc(x:number,error:number,epsilon:number,equation:string):object{
      let xi:number = this.function(x,equation),
      listx: Array<number> = [],
      listxi: Array<number> = [],
      listerror: Array<number> = [];

      //First time
      error = this.error(xi,x);

      //Begin iteration
      while (error > epsilon && error != Infinity && listerror.length < 100) {
          xi = this.function(x,equation);
          error = this.error(xi,x);

          //Get Data
          this.listResult(listx,x);
          this.listResult(listxi,xi);
          this.listResult(listerror,error);

          x = xi;
      }
    
      // Result
      return (
          {
            listx:listx,
            listxi:listxi,
            listerror:listerror,
            Epsilon:epsilon,
            Equation:equation
          }
  );
    }
    xChange(event:ChangeEvent<HTMLInputElement>){
        this.state.StateEquation.Method.RootEquations.Onepoint.x = JSON.parse(event.target.value);
        this.setState({StateEquation: this.props.StateEquation});
        console.log(this.setState({StateEquation: this.props.StateEquation}));
    }
    equationChange(event:any,value:string){
      this.props.StateEquation.Equation = value;
      this.setState({ StateEquation:this.props.StateEquation });
    }
    epsilonChange(event:ChangeEvent<HTMLInputElement>){
      this.setState({StateEquation:JSON.parse(event.target.value)});
    }
    handleSubmit(event:FormEvent<HTMLFormElement>){
      // console.log("hello");
        event.preventDefault();
        let Result:any = this.calc(
            this.state.StateEquation.Method.RootEquations.Onepoint.x,
            this.state.StateEquation.Error,
            this.state.StateEquation.Epsilon,
            this.state.StateEquation.Equation
        );

        let row:Array<DataTable> = [];
        for(let i:number = 0; i<Result.listerror.length; ++i){
            row.push({
              xL: Result.listx[i],
              xR: Result.listxi[i],
              Error: Result.listerror[i]
            });
        }

        let reChart = [];
          for(let i:number = 0 ; i<Result.listerror.length ; ++i){
            reChart.push({
              xL: Result.listx[i],
              xR: Result.listxi[i],
              Error: Result.listerror[i]
            });
          }

        let Answer:Array<number> = Result.listxi[Result.listerror.length-1];
        //set state to chart and table
        this.setState({
            Data:row,
            Answer:Answer,
            ApexChart: {
                Series: reChart,
                Categories: [
                    {name: "x", data: Result.listx},
                    {name: "xi", data: Result.listxi},
                    {name: "Error", data: Result.listerror}
                ]
            }
        });

    }
    async componentDidMount() {
      const api = this.props.StateEquation.Url;
      await axios.get(api, { headers: {"Authorization" : `Bearer ${this.props.StateEquation.Token}`} })
          .then(res => {
              console.log("data:",res.data.Chapter);
              console.log(this.props.StateEquation.Url);
              console.log(this.props.StateEquation.Token);
              console.log(res.data.Chapter[2].Onepoint);
              this.state.StateEquation.Problem = res.data.Chapter[2].OnePoint;
              this.setState({StateEquation:this.props.StateEquation})
          });
    }
    render(){
      const options:any = this.props.StateEquation.Problem;
        console.log("options:" , options);
        return(
            <div>
            <NavBar />
            <div className="headequation">
              <h1>ONE-POINT</h1>
            </div>
            <div className="headequation">
              <form onSubmit={this.handleSubmit}>
                <div className="myform">
                    <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            getOptionLabel={(option)=>option.Equation}
                            value={{
                                Equation:this.state.StateEquation.Equation,
                            }}
                            onInputChange={this.equationChange}
                            renderInput={(params) => <TextField {...params} label="Equation" />}
                            
                        />
                  {/* <TextField id="demo-helper-text-misaligned" label="Equation" type={"text"} onChange={this.equationChange}/> */}
  
                  <TextField id="demo-helper-text-misaligned" label="X" type={"number"}defaultValue={this.state.StateEquation.Method.RootEquations.Onepoint.x} inputProps={{step: Math.pow(10,-6)}} onChange={this.xChange}/>
                  <TextField id="demo-helper-text-misaligned" label="Epsilon" type={"number"} defaultValue={this.state.StateEquation.Error} inputProps={{step: Math.pow(10,-6)}} onChange={this.epsilonChange}/>
                </div>
                <div>
                  <Button variant="outlined" color="secondary" type={"submit"}>Submit</Button>
                </div>    
              </form>
            </div>
            <br></br>
            <div className="setequation">
                  Equation : <Tex2SVG display="inline" latex={this.state.StateEquation.Equation} />
            </div>
            <div className="setequation">
                  Answer : {this.state.Answer}
            </div>
            <br></br>
            <div className="Chart-Field">
              {/* <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart> */}
              <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={this.state.ApexChart.Series}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="xL" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="xR" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="xM" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="Error" stroke="#82ca9d" />
                        </LineChart>
                </ResponsiveContainer>
            </div>
            <br></br>
            <div>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Iteration</TableCell>
                    <TableCell align="right">x</TableCell>
                    <TableCell align="right">xi</TableCell>
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