import 'reflect-metadata';
import 'module-alias/register';
import bodyParser from 'body-parser';
import { createExpressServer, useContainer } from 'routing-controllers';
import EmployeeController from './application/controllers/employee/EmployeeController';
import { loggerMiddleware } from '@infrastructure/middlewares/LoggerMiddleware';
import containerInvesty from '@infrastructure/config/containerInvestify';
import DepartmentController from '@application/controllers/department/DepartmentController';

function bootstrap() {
  useContainer(containerInvesty); // Utilisez le conteneur avec routing-controllers

  const app = createExpressServer({
    routePrefix: "/api",
    controllers: [EmployeeController,DepartmentController],
    middlewares: [],
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204,
      paramOptions: {
        required: true,
      },
    },
    classTransformer: false,
    validation: false,
    defaultErrorHandler: false,
  });

  app.use(bodyParser.json());
  app.use(loggerMiddleware);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
