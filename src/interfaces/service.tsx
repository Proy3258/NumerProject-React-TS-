export interface Bisection {
    xL:number;
    xR:number;
};
export interface PropsEquations{
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Method;
    Result?:Result;
    Data:Array<DataTable>;
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
    }
    
};
export interface Result {
    Epsilon:number;
    Equation:string;
    Error:Array<number>;
}
export interface DataTable {
    Bisection?:DataBisection;
};
export interface DataBisection{
    xL:number;
    xR:number;
    xM:number;
    FxL:number;
    FxR:number;
    FxM:number;
    Error:number;
};