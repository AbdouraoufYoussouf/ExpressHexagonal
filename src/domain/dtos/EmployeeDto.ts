
import { IsString, MinLength,MaxLength, IsEmail } from 'class-validator';

export class EmployeeDto {
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le prénom doit contenir au maximum 20 caractères' })
  firstName: string = "";

  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le nom doit contenir au maximum 20 caractères' })
  lastName: string = "";

  @IsEmail({}, { message: 'Format email invalide' })
  email: string = "";

  @IsString({ message: 'L\'ID du département doit être une chaîne de caractères' })
  departmentId: string = "";
}
