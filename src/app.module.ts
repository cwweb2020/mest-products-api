import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // importo el config de las variables de entorno

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // aca iria de la variable de entorno
      port: +process.env.DB_PORT, // el port tiene que ser un numero
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // aca iria de la variable de entorno
      autoLoadEntities: true, // para que cargue automaticamente las entidades
      synchronize: true, // esto es para que se cree la tabla automaticamente para que sincronice en prod no se usa
    }),
    ProductsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
