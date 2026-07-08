"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderController = void 0;
const common_1 = require("@nestjs/common");
const sales_order_service_1 = require("./sales-order.service");
const sales_order_dto_1 = require("./dto/sales-order.dto");
const auth_guard_1 = require("../auth/auth.guard");
const client_1 = require("@prisma/client");
let SalesOrderController = class SalesOrderController {
    salesOrderService;
    constructor(salesOrderService) {
        this.salesOrderService = salesOrderService;
    }
    create(dto, req) {
        return this.salesOrderService.create(dto, req.user.id);
    }
    findAll(orderStatus, paymentStatus, deliveryDate, req) {
        const createdById = req.user.role === 'STAFF' ? req.user.id : undefined;
        return this.salesOrderService.findAll({
            orderStatus,
            paymentStatus,
            deliveryDate,
            createdById,
        });
    }
    findOne(id) {
        return this.salesOrderService.findOne(id);
    }
    updateOrderStatus(id, dto, req) {
        return this.salesOrderService.updateOrderStatus(id, dto, req.user.id, req.user.role);
    }
    updatePaymentStatus(id, dto, req) {
        return this.salesOrderService.updatePaymentStatus(id, dto, req.user.id);
    }
    confirmPayment(id, dto, req) {
        return this.salesOrderService.confirmPayment(id, dto, req.user.id);
    }
};
exports.SalesOrderController = SalesOrderController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_guard_1.Roles)('STAFF', 'ADMIN', 'ACCOUNTANT'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sales_order_dto_1.CreateSalesOrderDto, Object]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Query)('orderStatus')),
    __param(1, (0, common_1.Query)('paymentStatus')),
    __param(2, (0, common_1.Query)('deliveryDate')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, auth_guard_1.Roles)('ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sales_order_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Patch)(':id/payment'),
    (0, auth_guard_1.Roles)('STAFF', 'ADMIN', 'ACCOUNTANT'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sales_order_dto_1.UpdatePaymentStatusDto, Object]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "updatePaymentStatus", null);
__decorate([
    (0, common_1.Patch)(':id/confirm-payment'),
    (0, auth_guard_1.Roles)('STAFF', 'ADMIN', 'ACCOUNTANT'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sales_order_dto_1.ConfirmPaymentDto, Object]),
    __metadata("design:returntype", void 0)
], SalesOrderController.prototype, "confirmPayment", null);
exports.SalesOrderController = SalesOrderController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('sales-orders'),
    __metadata("design:paramtypes", [sales_order_service_1.SalesOrderService])
], SalesOrderController);
//# sourceMappingURL=sales-order.controller.js.map