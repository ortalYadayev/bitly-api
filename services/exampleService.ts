import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class exampleService {
    static async getAll() {
        return prisma.exampleTable.findMany();
    }

    static async find () {
        const examples = await prisma.exampleTable.findMany();

        return examples;
    }
}

export default exampleService;