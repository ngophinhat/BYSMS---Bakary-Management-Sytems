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
exports.CakeProductController = void 0;
const common_1 = require("@nestjs/common");
const cake_product_service_1 = require("./cake-product.service");
const create_cake_product_dto_1 = require("./dto/create-cake-product.dto");
const auth_guard_1 = require("../auth/auth.guard");
const client_1 = require("@prisma/client");
let CakeProductController = class CakeProductController {
    cakeProductService;
    constructor(cakeProductService) {
        this.cakeProductService = cakeProductService;
    }
    create(dto) {
        return this.cakeProductService.create(dto);
    }
    findAll(category) {
        return this.cakeProductService.findAll(category);
    }
    findOne(id) {
        return this.cakeProductService.findOne(id);
    }
    update(id, dto) {
        return this.cakeProductService.update(id, dto);
    }
    toggleActive(id) {
        return this.cakeProductService.toggleActive(id);
    }
};
exports.CakeProductController = CakeProductController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_guard_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cake_product_dto_1.CreateCakeProductDto]),
    __metadata("design:returntype", void 0)
], CakeProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CakeProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CakeProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_guard_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CakeProductController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    (0, auth_guard_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CakeProductController.prototype, "toggleActive", null);
exports.CakeProductController = CakeProductController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('cake-products'),
    __metadata("design:paramtypes", [cake_product_service_1.CakeProductService])
], CakeProductController);
//# sourceMappingURL=cake-product.controller.js.map