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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPaymentDto = exports.UpdatePaymentStatusDto = exports.UpdateOrderStatusDto = exports.CreateSalesOrderDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateSalesOrderDto {
    customerId;
    customerName;
    customerPhone;
    cakeProductId;
    cakeName;
    quantity;
    basePrice;
    surcharge;
    addonPrice;
    addonNote;
    deliveryTime;
    note;
    imageUrl;
    shape;
    size;
    ageGroup;
}
exports.CreateSalesOrderDto = CreateSalesOrderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSalesOrderDto.prototype, "customerName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSalesOrderDto.prototype, "customerPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "cakeProductId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSalesOrderDto.prototype, "cakeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateSalesOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSalesOrderDto.prototype, "basePrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSalesOrderDto.prototype, "surcharge", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSalesOrderDto.prototype, "addonPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "addonNote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "deliveryTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeShape),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "shape", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeSize),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AgeGroup),
    __metadata("design:type", String)
], CreateSalesOrderDto.prototype, "ageGroup", void 0);
class UpdateOrderStatusDto {
    orderStatus;
    cancelReason;
}
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.OrderStatus),
    __metadata("design:type", Object)
], UpdateOrderStatusDto.prototype, "orderStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "cancelReason", void 0);
class UpdatePaymentStatusDto {
    paymentStatus;
    note;
    dueDate;
    paymentMethod;
}
exports.UpdatePaymentStatusDto = UpdatePaymentStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PaymentStatus),
    __metadata("design:type", Object)
], UpdatePaymentStatusDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePaymentStatusDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePaymentStatusDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['CASH', 'BANK_TRANSFER']),
    __metadata("design:type", String)
], UpdatePaymentStatusDto.prototype, "paymentMethod", void 0);
class ConfirmPaymentDto {
    note;
}
exports.ConfirmPaymentDto = ConfirmPaymentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConfirmPaymentDto.prototype, "note", void 0);
//# sourceMappingURL=sales-order.dto.js.map