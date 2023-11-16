import { injectable, inject } from 'inversify';
import { EmployeeDto } from '@domain/dtos/EmployeeDto';
import { Employee } from '@domain/models/Employee';
import { JsonController, Param, Body, Get, Post, Req, Res, Put, Delete, HttpCode, NotFoundError, InternalServerError } from 'routing-controllers';
import { IEmployeeService } from '@domain/abstraction/employes/IEmployeeService';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';

@JsonController('/employees')
@injectable()
class EmployeeController {
  private readonly _employeeService: IEmployeeService

  constructor(@inject('IEmployeeService') employeeService: IEmployeeService) {
    this._employeeService = employeeService;
  }

  @Get('/')
  @HttpCode(200)
  async getAllEmployees(): Promise<Employee[]> {
    return await this._employeeService.getAllEmployee();
  }

  @Get('/:id')
  @HttpCode(200)
  async getEmployeeById(@Req() request: Request, @Res() response: Response,@Param('id') id: string): Promise<Employee | any> {
    try {
      const employee = await this._employeeService.getEmployeeById(id);
      if (!employee) {
        return response.status(404).json({message:'Employee not found'});
      }
      return employee;
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
      return response.status(404).json({message:'Employee not found',error:error.message});
      }
    }
  }

  @Post('/')
  @HttpCode(201)
  async createEmployee(@Req() request: Request, @Res() response: Response, @Body() employeeDto: EmployeeDto): Promise<Employee | any> {
    const employee = plainToClass(EmployeeDto, employeeDto);
    const errors = await validate(employee);

    if (errors.length > 0) {
      console.log('error de validation')
      return response.status(400).json(errors.map(error => error.constraints));
    }
    try {
      const employeeCreated = await this._employeeService.createEmployee(employeeDto);

      return response.status(201).json(employeeCreated); // Supposons que "employee" est  créé
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return response.status(500).json({ message: 'Erreur serveur lors de la création de l\'employé', error: error.message });
      }
    }
  }


  @Put('/:id')
  @HttpCode(201)
  async updateEmployee(@Req() request: Request, @Res() response: Response, @Param('id') id: string, @Body() employeeDto: EmployeeDto): Promise<Employee | any> {
    const employeeToUpdate = plainToClass(EmployeeDto, employeeDto);
    const errors = await validate(employeeToUpdate);
    if (errors.length > 0) {
      console.log('error de validation')
      return response.status(400).json(errors.map(error => error.constraints));
    }
    try {
      const updatedEmployee = await this._employeeService.updateEmployee(id, employeeToUpdate);
      if (!updatedEmployee) {
        throw new NotFoundError('Employee not found');
      }
      return updatedEmployee;
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Internal server error');
    }
  }


  @Delete('/:id') // Specify the ID parameter in the route definition
  @HttpCode(200)
  async deleteEmployee(@Param('id') id: string): Promise<Employee | null> {
    try {
      const deletedEmployee = await this._employeeService.deleteEmployee(id);
      if (!deletedEmployee) {
        throw new NotFoundError('Employee not found');
      }
      return deletedEmployee;
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Failed to delete Employee');
    }
  }
}

export default EmployeeController;
