import { Product } from "../../models/Product";

interface ProductProps{
    product: Product;
}

function ProductView({product}: ProductProps){
    return (
    <div>
        <p>{product.name}</p>
    </div>)
}

export default ProductView;