import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) // insertamos nuestra entidad
    private readonly productRepository: Repository<Product>,
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  // funcion para manejar excepciones
  private handleDBErrors(error: any): never {
    //  console.log(error);

    if (error.code === '23505') {
      throw new BadRequestException('Duplicate value: ' + error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('An unexpected error occurred.');
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create({
        // id: uuid(),
        ...createProductDto,
        slug: createProductDto.title.toLowerCase().replace(/ /g, '-'),
      });
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // TODO paginar
  findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: page,
      // TODO relaciones
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {}

  async remove(id: string): Promise<string> {
    const result = await this.productRepository.delete(id); // Pasas directamente el `id`

    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return `Product with id ${id} has been deleted`;
  }
}
