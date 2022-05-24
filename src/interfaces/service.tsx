export interface Bisection {
    xL:number;
    xR:number;
};
export interface FalsePosition{
    xL:number;
    xR:number;
};
export interface Onepoint{
    x:number;
}

export interface Newton{
    x:number;
}

export interface Secant{
    x:number;
    xi:number;
}
export interface PropsEquations{
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Method;
    Data:Array<DataTable>;
    ApexChart:ApexChartProps;
    Answer:Array<number>;
};
export interface PropsCustom{
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Method;
};
export interface Method{
    RootEquations:{
        Bisection:Bisection;
        FalsePosition:FalsePosition;
        Onepoint:Onepoint;
        Newton:Newton;
        Secant:Secant;
    }
    
};
export interface Result {
    Epsilon:number;
    Equation:string;
    Error:Array<number>;
}
export interface DataTable {
    xL?:number;
    xR?:number;
    xM?:number;
    FxL?:number;
    FxR?:number;
    FxM?:number;
    Error?:number;
};
export interface DesmosProps{
    Equation?:string;
    Answer:Array<number>;
    xLPoint:number;
    xRPoint:number;
}
export interface ApexChartProps{
    Series:Array<Series>;
    Categories:Array<number>;
}
export interface Series{
    name:string;
    data:Array<number>;
}