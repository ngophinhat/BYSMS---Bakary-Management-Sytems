import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            fullName: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    me(userId: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    } | null>;
}
