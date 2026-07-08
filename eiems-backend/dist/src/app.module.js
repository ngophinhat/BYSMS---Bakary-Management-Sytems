"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const redis_module_1 = require("./redis/redis.module");
const users_module_1 = require("./users/users.module");
const customers_module_1 = require("./customers/customers.module");
const debts_module_1 = require("./debts/debts.module");
const payments_module_1 = require("./payments/payments.module");
const reports_module_1 = require("./reports/reports.module");
const categories_module_1 = require("./categories/categories.module");
const transactions_module_1 = require("./transactions/transactions.module");
const config_1 = require("@nestjs/config");
const tax_module_1 = require("./tax/tax.module");
const auth_module_1 = require("./auth/auth.module");
const cake_product_module_1 = require("./cake-product/cake-product.module");
const sales_order_module_1 = require("./sales-order/sales-order.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            users_module_1.UsersModule,
            customers_module_1.CustomersModule,
            debts_module_1.DebtsModule,
            payments_module_1.PaymentsModule,
            reports_module_1.ReportsModule,
            categories_module_1.CategoriesModule,
            transactions_module_1.TransactionsModule,
            tax_module_1.TaxModule,
            auth_module_1.AuthModule,
            cake_product_module_1.CakeProductModule,
            sales_order_module_1.SalesOrderModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map