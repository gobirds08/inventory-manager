import { Product } from "../../models/Product";
import Button from "../button/Button";

interface ProductProps{
    product: Product;
}

function ProductView({product}: ProductProps){
    const price_parts: string[] = product.unit_price.toString().split(".");
    return (
    <Button classes="card">
        <img src={product.image} alt="Product Image" className="product-photo"/>
        <h3>{product.name}</h3>
        <div className="product-info">
            <span className="quantity">Quantity: {product.quantity}</span>
            <div className="price">
                <span className="price-int">${price_parts[0]}</span>
                <span className="price-dec">.{price_parts.length == 1 ? "00" : price_parts[1]}</span>
            </div>
        </div>
    </Button>)
}

export default ProductView;