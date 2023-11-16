// src/domain/dtos/DepartmentDto.ts

import { z } from 'zod';
const DepartmentDtoSchema = z.object({
  name: z.string()
});

// Utilisez DepartmentDtoSchema pour valider les données d'un employé lors de la création ou de la mise à jour
export type DepartmentDto = z.infer<typeof DepartmentDtoSchema>;
