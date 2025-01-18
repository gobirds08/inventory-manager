import ProductView from "../components/product_view/ProductView";
import { defaultProduct } from "../models/Product";


function Products(){
    return (
        <div className="container">
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
        </div>
    )
}

export default Products;