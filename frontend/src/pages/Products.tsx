import FilterView from "../components/filter_view/FilterView";
import ProductView from "../components/product_view/ProductView";
import { defaultProduct } from "../models/Product";
import { useState } from "react";


function Products(){
    const [search, setSearch] = useState("Search");

    return (
        <>
        <FilterView search={search}/>
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