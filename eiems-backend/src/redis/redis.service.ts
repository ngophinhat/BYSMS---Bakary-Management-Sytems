import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>(
      'REDIS_URL',
      'redis://localhost:6379',
    );

    this.client = new Redis(url, {
      // Không throw crash app nếu Redis chưa chạy — chỉ log lỗi và tiếp tục
      // (cache là optional, mất Redis thì app vẫn phải chạy được, chỉ chậm hơn)
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
    // ioredis tự connect khi khởi tạo (lazyConnect: false), không cần gọi thêm
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  /** Lấy dữ liệu đã cache, tự parse JSON. Trả về null nếu không có hoặc lỗi. */
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.client.get(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      this.logger.warn(`Redis GET failed for key "${key}": ${err}`);
      return null;
    }
  }

  /** Lưu dữ liệu vào cache, tự stringify. ttlSeconds mặc định 60s. */
  async set(key: string, value: unknown, ttlSeconds = 60): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      this.logger.warn(`Redis SET failed for key "${key}": ${err}`);
    }
  }

  /** Xoá 1 key cụ thể. */
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      this.logger.warn(`Redis DEL failed for key "${key}": ${err}`);
    }
  }

  /**
   * Xoá tất cả key khớp pattern (vd "sales-orders:list:*").
   * Dùng SCAN thay vì KEYS để không block Redis khi data lớn.
   */
  async delPattern(pattern: string): Promise<void> {
    try {
      let cursor = '0';
      do {
        const [nextCursor, keys] = await this.client.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          100,
        );
        cursor = nextCursor;
        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      } while (cursor !== '0');
    } catch (err) {
      this.logger.warn(`Redis DEL PATTERN failed for "${pattern}": ${err}`);
    }
  }
}
