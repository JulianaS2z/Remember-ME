import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient(); 

const clientes = await prisma.cliente.findMany();
