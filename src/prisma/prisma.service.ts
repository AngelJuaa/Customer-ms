
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// Servicio compartido de acceso a datos: configura Prisma con SQLite y gestiona
// la conexion durante el ciclo de vida del modulo Nest.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('PrismaService');
  constructor(configService: ConfigService) {
    // El adaptador recibe la URL desde la configuracion y conecta Prisma con SQLite.
    const adapter = new PrismaBetterSqlite3({
      url: configService.getOrThrow<string>('DATABASE_URL'),
    });
    super({ adapter });
    this.logger.log('Database Connected');
  }

  // Nest llama este hook al inicializar el modulo para abrir la conexion.
  async onModuleInit() {
    await this.$connect();
  }

  // Nest llama este hook al destruir el modulo para liberar la conexion.
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
