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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const auth_guard_1 = require("../auth/auth.guard");
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    findAll(req, unread) {
        return this.notificationService.findByUser(req.user.id, unread === 'true');
    }
    countUnread(req) {
        return this.notificationService.countUnread(req.user.id);
    }
    markAsRead(id, req) {
        return this.notificationService.markAsRead(id, req.user.id);
    }
    markAllAsRead(req) {
        return this.notificationService.markAllAsRead(req.user.id);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('unread')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "countUnread", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('read-all'),
    (0, auth_guard_1.Roles)('OWNER', 'ADMIN', 'ACCOUNTANT', 'STAFF'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "markAllAsRead", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map