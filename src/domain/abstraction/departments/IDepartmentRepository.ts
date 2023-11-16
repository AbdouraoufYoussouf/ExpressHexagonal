import { DepartmentDto } from "@domain/dtos/DepartmentDto";
import { Department } from "@domain/models/Department";

export interface IDepartmentRepository{
    getAllDepartments(): Promise<Department[]>;
    getDepartmentById(id:string):Promise<Department | null>
    createDepartment(departmentDto:DepartmentDto):Promise<Department>
    updateDepartment(id:string,departmentDto:DepartmentDto):Promise<Department | null>
    deleteDepartment(id:string):Promise<Department | null>
}