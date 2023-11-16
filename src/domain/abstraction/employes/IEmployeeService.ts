import { EmployeeDto } from "@domain/dtos/EmployeeDto";
import { Employee } from "@domain/models/Employee";

export interface IEmployeeService {
  getAllEmployee():Promise<Employee[]>;
  getEmployeeById(id: string): Promise<Employee | null>;
  getEmployeeByEmail(email: string): Promise<Employee | null>;
  createEmployee(employeeDto:EmployeeDto): Promise<Employee>;
  updateEmployee(id: string, employeeDto:EmployeeDto): Promise<Employee | null>;
  deleteEmployee(id: string): Promise<Employee | null>;
}
