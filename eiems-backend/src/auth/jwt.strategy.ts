import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

const AUTH_USER_CACHE_PREFIX = 'auth:user:';
const AUTH_USER_CACHE_TTL = 60; // giây — đủ ngắn để khoá/đổi quyền user có hiệu lực nhanh

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'fallback_secret',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // MỌI request có Authorization header đều chạy qua đây, kể cả khi
    // data đã cache -> nếu không cache luôn bước này, mỗi request vẫn
    // tốn 1 round-trip tới Neon chỉ để xác thực user, làm mọi trang chậm
    // như nhau dù đã cache data.
    const cacheKey = `${AUTH_USER_CACHE_PREFIX}${payload.sub}`;
    const cached = await this.redis.get<{
      id: string;
      isActive: boolean;
      [key: string]: unknown;
    }>(cacheKey);

    if (cached) {
      if (!cached.isActive) {
        throw new UnauthorizedException('Tài khoản không hợp lệ');
      }
      return cached;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Tài khoản không hợp lệ');
    }

    await this.redis.set(cacheKey, user, AUTH_USER_CACHE_TTL);
    return user;
  }
}
