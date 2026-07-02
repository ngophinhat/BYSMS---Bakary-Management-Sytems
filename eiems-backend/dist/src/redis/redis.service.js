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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    configService;
    logger = new common_1.Logger(RedisService_1.name);
    client;
    constructor(configService) {
        this.configService = configService;
        const url = this.configService.get('REDIS_URL', 'redis://localhost:6379');
        this.client = new ioredis_1.default(url, {
            maxRetriesPerRequest: 2,
            retryStrategy: (times) => Math.min(times * 200, 2000),
            lazyConnect: false,
        });
        this.client.on('error', (err) => {
            this.logger.warn(`Redis connection error: ${err.message}`);
        });
        this.client.on('connect', () => {
            this.logger.log('Redis connected');
        });
    }
    async onModuleInit() {
    }
    async onModuleDestroy() {
        await this.client.quit();
    }
    async get(key) {
        try {
            const raw = await this.client.get(key);
            if (!raw)
                return null;
            return JSON.parse(raw);
        }
        catch (err) {
            this.logger.warn(`Redis GET failed for key "${key}": ${err}`);
            return null;
        }
    }
    async set(key, value, ttlSeconds = 60) {
        try {
            await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
        }
        catch (err) {
            this.logger.warn(`Redis SET failed for key "${key}": ${err}`);
        }
    }
    async del(key) {
        try {
            await this.client.del(key);
        }
        catch (err) {
            this.logger.warn(`Redis DEL failed for key "${key}": ${err}`);
        }
    }
    async delPattern(pattern) {
        try {
            let cursor = '0';
            do {
                const [nextCursor, keys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
                cursor = nextCursor;
                if (keys.length > 0) {
                    await this.client.del(...keys);
                }
            } while (cursor !== '0');
        }
        catch (err) {
            this.logger.warn(`Redis DEL PATTERN failed for "${pattern}": ${err}`);
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map