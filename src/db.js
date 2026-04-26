import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default prisma;

// export const prisma = new PrismaClient();

// async function getUser() {
//     const user = await prisma.user.findMany();
//     console.log(user);
// }

// getUser ()

