import { IDepartmentRepository } from "@domain/abstraction/departments/IDepartmentRepository";
import { DepartmentDto } from "@domain/dtos/DepartmentDto";
import { Department } from "@domain/models/Department";
import prisma from "@infrastructure/config/prisma";
import { injectable } from 'inversify';

@injectable()
export class DepartmentRepositoryPrisma implements IDepartmentRepository {

 async getAllDepartments(): Promise<Department[]> {
   try {
     const Departments = await prisma.department.findMany({
       include:{
         employes:true
       }
     });
     return Departments;
   } catch (error) {
     throw new Error(`Error fetching departments`);
   }
 }

 async getDepartmentById(id: string): Promise<Department | null> {
   try {
     const department = await prisma.department.findUnique({
       where:{id}
     })
     return department;
   } catch (error) {
     throw new Error(`Error fetching department by ID`);
   }
 }

 async createDepartment(Department: DepartmentDto): Promise<Department> {
   try {
     const DepartmentCreated = await prisma.department.create({
       data: Department
     })
     return DepartmentCreated;
   } catch (error) {
     throw new Error(`Error creating department`);
   }
 }

 async updateDepartment(id: string, Department: DepartmentDto): Promise<Department | null> {
   try {
     const DepartmentUpdated = await prisma.department.update({
       where: {
         id
       },
       data: {
         ...Department
       }
     })
     return DepartmentUpdated;
   } catch (error) {
     throw new Error(`Error updating department`);
   }
 }

 async deleteDepartment(id: string): Promise<Department | null> {
   try {
     const DepartmentDeleted = await prisma.department.delete({
       where: {
         id
       }
     })
     return DepartmentDeleted;
   } catch (error) {
     throw new Error(`Error deleting department`);
   }
 }
}
