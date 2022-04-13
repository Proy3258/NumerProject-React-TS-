import { Component } from 'react'
import { parse } from 'mathjs'

import { PropsCustom, PropsEquations } from '../interfaces/service'


export default class Equations extends Component<PropsCustom,PropsEquations> {
    constructor(props:PropsCustom){
        super(props);
    }
    // ฟังก์ชัน F(x)
    function (x:number,equation:string):number{
        try{
            let Equation = parse(equation);
            return Equation.evaluate({x:x});
        }
        catch(error){
            console.log("Error of equations: " + error)
        }
        return 0;
    }

    // ฟังก์ชัน คำนวณค่า Error
    error(xNew:number,xOld:number):number{
        return JSON.parse(Math.abs((xNew-xOld)/xNew).toFixed(6));
    }
}