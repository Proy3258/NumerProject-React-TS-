import { FC, useEffect} from 'react';
import { DesmosProps} from '../interfaces/service';

const Desmos = require("desmos");
let elt = document.getElementById("calculator"),
    calculator = Desmos.GraphingCalculator(elt),
    equation;
export const DesmosChart:FC<DesmosProps> = (props) => {
    useEffect(()=>{
        elt = document.getElementById('calculator');
        calculator = Desmos.GraphingCalculator(
            elt,
            {
                expressions:false
            }
        );
        calculator.setExpression({id:'equationgraph',latex:"0"});
    },[]);
    try{
        equation = props.Equation?.replace(/\(/g,'{').replace(/\)/g,'}');
        calculator.setExpression({id:'equationgraph',latex: 'f(x)='+equation});
    }
    catch(e){
        console.log(e);
    }
    return(
        <div id="calculator" style={{width:"100%",height:"25rem"}}>
        </div>
    );
}