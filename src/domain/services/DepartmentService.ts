import { IDepartmentRepository } from "@domain/abstraction/departments/IDepartmentRepository";
import { IDepartmentService } from "@domain/abstraction/departments/IDepartmentService";
import { DepartmentDto } from "@domain/dtos/DepartmentDto";
import { Department } from "@domain/models/Department";
import { injectable, inject } from 'inversify';

@injectable()
export class DepartmentService implements IDepartmentService {
    private readonly _departmentRepository: IDepartmentRepository
    constructor(@inject('IDepartmentRepository') departmentRepository: IDepartmentRepository) {
        this._departmentRepository = departmentRepository;
    }

    getAllDepartments(): Promise<Department[]> {
        return this._departmentRepository.getAllDepartments();
    }

    getDepartmentById(id: string): Promise<Department | null> {
        return this._departmentRepository.getDepartmentById(id);
    }

    createDepartment(departmentDto: DepartmentDto): Promise<Department> {
        return this._departmentRepository.createDepartment(departmentDto);
    }

    updateDepartment(id: string, departmentDto: DepartmentDto): Promise<Department | null> {
        return this._departmentRepository.updateDepartment(id,departmentDto);
    }

    deleteDepartment(id: string): Promise<Department | null> {
        return this._departmentRepository.deleteDepartment(id);
    }

}