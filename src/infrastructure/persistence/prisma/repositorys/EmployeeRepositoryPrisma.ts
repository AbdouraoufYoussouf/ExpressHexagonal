import { IEmployeeRepository } from "@domain/abstraction/employes/IEmployeeRepository";
import { EmployeeDto } from "@domain/dtos/EmployeeDto";
import { Employee } from "@domain/models/Employee";
import prisma from "@infrastructure/config/prisma";
import { injectable } from 'inversify';

@injectable()
export class EmployeeRepositoryPrisma implements IEmployeeRepository {

  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    try {
      const employeeByEmail = await prisma.employee.findUnique({
        where: { email: email }
      });
      return employeeByEmail;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'employé par email :', error);
      throw new Error('Erreur lors de la récupération de l\'employé par email');
    }
  }

  async getAllEmployee(): Promise<Employee[]> {
    try {
      const employees = await prisma.employee.findMany({
        include: {
          department: true
        }
      });
      return employees;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les employés :', error);
      throw new Error('Erreur lors de la récupération de tous les employés');
    }
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id }
      });
      return employee;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'employé par ID :', error);
      throw new Error('Erreur lors de la récupération de l\'employé par ID');
    }
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    try {
      const employeeCreated = await prisma.employee.create({
        data: employee
      });
      return employeeCreated;
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé :', error);
      throw new Error('Erreur lors de la création de l\'employé');
    }
  }

  async updateEmployee(id: string, employee: EmployeeDto): Promise<Employee | null> {
    try {
      const employeeUpdated = await prisma.employee.update({
        where: {
          id
        },
        data: {
          ...employee
        }
      });
      return employeeUpdated;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'employé :', error);
      throw new Error('Erreur lors de la mise à jour de l\'employé');
    }
  }

  async deleteEmployee(id: string): Promise<Employee | null> {
    try {
      const employeeDeleted = await prisma.employee.delete({
        where: {
          id
        }
      });
      return employeeDeleted;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé :', error);
      throw new Error('Erreur lors de la suppression de l\'employé');
    }
  }
}
