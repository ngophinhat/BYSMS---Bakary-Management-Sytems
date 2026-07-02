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
exports.CreateCakeProductDto = exports.CreateCakePriceDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class CreateCakePriceDto {
    shape;
    size;
    price;
}
exports.CreateCakePriceDto = CreateCakePriceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeShape),
    __metadata("design:type", String)
], CreateCakePriceDto.prototype, "shape", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeSize),
    __metadata("design:type", String)
], CreateCakePriceDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCakePriceDto.prototype, "price", void 0);
class CreateCakeProductDto {
    category;
    name;
    shape;
    size;
    ageGroup;
    setNumber;
    setQuantity;
    isPriceManual;
    description;
    isActive;
    prices;
}
exports.CreateCakeProductDto = CreateCakeProductDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.CakeCategory),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeShape),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "shape", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CakeSize),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AgeGroup),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "ageGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCakeProductDto.prototype, "setNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCakeProductDto.prototype, "setQuantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCakeProductDto.prototype, "isPriceManual", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCakeProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCakeProductDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateCakePriceDto),
    __metadata("design:type", Array)
], CreateCakeProductDto.prototype, "prices", void 0);
//# sourceMappingURL=create-cake-product.dto.js.map