import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product | null>;
}
