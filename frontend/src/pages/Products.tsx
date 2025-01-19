import FilterView from "../components/filter_view/FilterView";
import ProductView from "../components/product_view/ProductView";
import { defaultProduct, Product } from "../models/Product";
import { useRef, useState } from "react";


function Products(){
    const [filterToggle, setFilterToggle] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);

    const handleToggle = () => {
        setFilterToggle((prevState) => !prevState);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
        <FilterView search={search} handleToggle={handleToggle} handleInputChange={handleInputChange}/>
        <div className="container">
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
            <ProductView product={defaultProduct} />
        </div>
        </>
    )
}

export default Products;