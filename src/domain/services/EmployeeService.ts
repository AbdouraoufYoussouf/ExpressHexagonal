import { IEmployeeRepository } from "@domain/abstraction/employes/IEmployeeRepository";
import { IEmployeeService } from "@domain/abstraction/employes/IEmployeeService";
import { EmployeeDto } from "@domain/dtos/EmployeeDto";
import { Employee } from "@domain/models/Employee";
import logger from "@infrastructure/config/logger";
import { injectable, inject } from 'inversify';

@injectable()
export class EmployeeService implements IEmployeeService {
    private readonly employeeRepository: IEmployeeRepository

    constructor(@inject("IEmployeeRepository") employeeRepository: IEmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        try {
            return await this.employeeRepository.getEmployeeByEmail(email)
        } catch (error) {
            throw new Error("Error ferching employee by email.");
        }
    }

    async getAllEmployee(): Promise<Employee[]> {
        try {
            return await this.employeeRepository.getAllEmployee();
        } catch (error) {
            throw new Error(`Error fetching all employees`);
        }
    }

    async getEmployeeById(id: string): Promise<Employee | null> {
        try {
            return await this.employeeRepository.getEmployeeById(id);
        } catch (error) {
            throw new Error(`Error fetching employee by ID`);
        }
    }

    async createEmployee(employeeDto: EmployeeDto): Promise<Employee> {
        const existingEmployee = await this.employeeRepository.getEmployeeByEmail(employeeDto.email)
        if (existingEmployee) {
            logger.error('Employee already exist.');
            throw new Error('Employee already exist.');
        }
        try {
            return await this.employeeRepository.createEmployee(employeeDto);
        } catch (error) {
            throw new Error(`Error creating employee`);
        }
    }

    async updateEmployee(id: string, employeeDto: EmployeeDto): Promise<Employee | null> {
        try {
            return await this.employeeRepository.updateEmployee(id, employeeDto);
        } catch (error) {
            throw new Error(`Error updating employee`);
        }
    }

    async deleteEmployee(id: string): Promise<Employee | null> {
        try {
            return await this.employeeRepository.deleteEmployee(id);
        } catch (error) {
            throw new Error(`Error deleting employee`);
        }
    }
}
