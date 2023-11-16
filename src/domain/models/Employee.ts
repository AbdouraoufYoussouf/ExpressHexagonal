import { IsString, IsEmail, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';

export class Employee {
  @IsNotEmpty({ message: 'L\'identifiant est requis' })
  id: string;


  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le prénom est requis' })
  @MinLength(3, { message: 'Le prénom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le prénom doit contenir au maximum 20 caractères' })
  firstName: string;

  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(20, { message: 'Le nom doit contenir au maximum 20 caractères' })
  lastName: string;

  @IsEmail({}, { message: 'Veuillez saisir une adresse email valide' })
  @IsNotEmpty({ message: 'L\'email est requis' })
  email: string;

  @IsNotEmpty({ message: 'L\'identifiant du département est requis' })
  departmentId: string;

  constructor(id: string, firstName: string, lastName: string, email: string, departmentId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.departmentId = departmentId;
  }
}



// @Matches(/^[a-zA-Z0-9 ]*$/, {
//   message: 'Le champ message ne doit contenir que des lettres, des chiffres ou des espaces',
// })
// message!: string;

