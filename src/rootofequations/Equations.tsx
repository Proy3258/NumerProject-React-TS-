import { Component } from 'react'
import { derivative, parse } from 'mathjs'

import { PropNumerical, PropsStateMethods } from '../interfaces/service'


export default class Equations extends Component<PropNumerical,PropsStateMethods> {
    constructor(props:PropNumerical){
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
            if(xNew!=0){
                return JSON.parse(Math.abs((xNew-xOld)/xNew).toFixed(6));
            }
            else{
                alert("xNew can not equal 0 (INFINITY)")
                return -1;
            }
        }

    Derivative(x:string,equation:string) : string{
        try {
            let Equation:string = derivative(equation,x).toString();
            return Equation;
        }
        catch (error){
            console.log("Equation Error: "+ error);
        }
        return equation ;
    }
       

    // ข้อมูลคำตอบแสดงเป็น array ทศนิยม 6 ตำแหน่ง
    listResult(list:Array<number>,data:number):void{
        if(data!=Infinity && data!=NaN){
            list.push(JSON.parse(data.toFixed(6)));
        }
        else{
            list.push(0);
        }
    }
}