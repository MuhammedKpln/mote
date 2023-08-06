import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(this.notesSoftDeleteMiddleware);
    this.$use(this.notesFindMiddleware);
  }

  notesSoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.model !== 'Note') {
      return next(params);
    }

    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deleted_at: new Date(),
          },
        },
      });
    }
    return next(params);
  };

  notesFindMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.model !== 'Note') {
      return next(params);
    }
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deleted_at: null,
          },
        },
      });
    }
    if (params.action === 'findMany') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deleted_at: null,
          },
        },
      });
    }
    return next(params);
  };

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
