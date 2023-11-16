import { PrismaClient ,Prisma} from '@prisma/client';

const prisma = new PrismaClient();

const employeData: Prisma.EmployeeCreateInput[] = [
  {
    firstName: 'Alice',
    lastName: 'Eric',
    email: 'alice@prisma.io',
    department: {
      create: {
        name: 'IT Department',
      },
    },
  },
  // Ajoutez d'autres employés avec des départements ici...
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of employeData) {
    const employe = await prisma.employee.create({
      data: u,
    });
    console.log(`Created employe with id: ${employe.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
