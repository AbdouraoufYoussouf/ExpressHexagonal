import { Container } from 'inversify';
import { IEmployeeRepository } from '@domain/abstraction/employes/IEmployeeRepository';
import { EmployeeRepositoryPrisma } from '@infrastructure/persistence/prisma/repositorys/EmployeeRepositoryPrisma';
import { IEmployeeService } from '@domain/abstraction/employes/IEmployeeService';
import { EmployeeService } from '@domain/services/EmployeeService';
import EmployeeController from '@application/controllers/employee/EmployeeController';
import DepartmentController from '@application/controllers/department/DepartmentController';
import { IDepartmentRepository } from '@domain/abstraction/departments/IDepartmentRepository';
import { DepartmentRepositoryPrisma } from '@infrastructure/persistence/prisma/repositorys/DepartmentRepositoryPrisma';
import { IDepartmentService } from '@domain/abstraction/departments/IDepartmentService';
import { DepartmentService } from '@domain/services/DepartmentService';

const containerInvesty = new Container();

containerInvesty.bind<EmployeeController>(EmployeeController).toSelf();
containerInvesty.bind<IEmployeeRepository>('IEmployeeRepository').to(EmployeeRepositoryPrisma);
containerInvesty.bind<IEmployeeService>('IEmployeeService').to(EmployeeService);

containerInvesty.bind<IDepartmentRepository>('IDepartmentRepository').to(DepartmentRepositoryPrisma)
containerInvesty.bind<DepartmentController>(DepartmentController).toSelf();
containerInvesty.bind<IDepartmentService>('IDepartmentService').to(DepartmentService)

export default containerInvesty;
