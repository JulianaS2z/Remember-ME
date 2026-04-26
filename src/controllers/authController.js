// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient(); 

import prisma from '../config/prisma.js';

const clientes = await prisma.cliente.findMany();