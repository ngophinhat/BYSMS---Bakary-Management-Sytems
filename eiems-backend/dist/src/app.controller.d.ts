import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private prisma;
    getHello(): any;
    constructor(prisma: PrismaService);
    testDb(): {
        status: string;
    };
}
