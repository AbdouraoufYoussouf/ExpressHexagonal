import { JsonController, Param, Body, Get, Post, Put, HttpCode, NotFoundError, InternalServerError, Delete } from 'routing-controllers';
import { injectable, inject } from 'inversify';
import { IDepartmentService } from '@domain/abstraction/departments/IDepartmentService';
import { Department } from '@domain/models/Department';
import { DepartmentDto } from '@domain/dtos/DepartmentDto';

@JsonController('/departments')
@injectable()
class DepartmentController {
    private readonly _departmentService : IDepartmentService

    constructor(@inject('IDepartmentService') departmentService:IDepartmentService){
        this._departmentService = departmentService;
    }

    @Get('/')
    @HttpCode(200)
    async getAllDepartments():Promise<Department[]>{
        try {
            return await this._departmentService.getAllDepartments();
        } catch (error) {
             console.log(error)
            throw new InternalServerError('Failed to fetch departments');
        }
    }

    @Get('/:id')
    @HttpCode(200)
    async getDepartmentById(@Param('id') id:string):Promise<Department | null>{
        try {
            const department = await this._departmentService.getDepartmentById(id);
            if (!department) {
                throw new NotFoundError('Department not found');
            }
            return department;
        } catch (error) {
             console.log(error)
            throw new InternalServerError('Failed to fetch department by ID');
        }
    }

    @Post()
    @HttpCode(201)
    async createDepartement(@Body() department:DepartmentDto):Promise<Department>{
        try {
            return await this._departmentService.createDepartment(department);
        } catch (error) {
             console.log(error)
            throw new InternalServerError('Failed to create department');
        }
    }

    @Put('/:id')
    @HttpCode(200)
    async updateDepartment(@Param('id') id:string, departmentDto:DepartmentDto):Promise<Department | null>{
        try {
            const updatedDepartment = await this._departmentService.updateDepartment(id, departmentDto);
            if (!updatedDepartment) {
                throw new NotFoundError('Department not found');
            }
            return updatedDepartment;
        } catch (error) {
             console.log(error)
            throw new InternalServerError('Failed to update department');
        }
    }

    @Delete('/:id') // Specify the ID parameter in the route definition
    @HttpCode(200)
    async deleteDepartment(@Param('id') id:string):Promise<Department | null>{
        try {
            const deletedDepartment = await this._departmentService.deleteDepartment(id);
            if (!deletedDepartment) {
                throw new NotFoundError('Department not found');
            }
            return deletedDepartment;
        } catch (error) {
             console.log(error)
            throw new InternalServerError('Failed to delete department');
        }
    }
}

export default DepartmentController;
