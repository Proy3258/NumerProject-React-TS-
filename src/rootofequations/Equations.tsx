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
            if(xNew!=0){
                return JSON.parse(Math.abs((xNew-xOld)/xNew).toFixed(6));
            }
            else{
                console.log("xNew can not equal 0")
                return -1;
            }
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