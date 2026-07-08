import { CustomersService } from './customers.service';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    create(body: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string;
        address: string | null;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, body: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        phone: string;
        address: string | null;
    }>;
}
