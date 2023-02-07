import { IsNotEmpty } from "class-validator";

export class BrandDto{
    @IsNotEmpty()
    brandName:string
}