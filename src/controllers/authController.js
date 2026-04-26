// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient(); 

import prisma from '../db.js';

const clientes = await prisma.cliente.findMany();