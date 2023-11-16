import { EmployeeDto } from "@domain/dtos/EmployeeDto";
import { Employee } from "@domain/models/Employee";


export interface IEmployeeRepository{
    getAllEmployee():Promise<Employee[]>
    getEmployeeById(id:string): Promise<Employee | null>;
    getEmployeeByEmail(email: string): Promise<Employee | null>;
    createEmployee(employee:EmployeeDto):Promise<Employee>;
    updateEmployee(id:string,employee:EmployeeDto) : Promise<Employee | null>
    deleteEmployee(id:string):Promise<Employee | null>
}