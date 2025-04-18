import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("../entities/product.entity").Product>;
    findAll(): Promise<import("../entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("../entities/product.entity").Product | null>;
}
