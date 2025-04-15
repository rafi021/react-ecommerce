import React, { useState } from 'react'
import { SiteHeader } from '@/components/site-header';
import ProductDataTable from '../../components/ProductDataTable';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts,  } from '../../api/products';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CreateProduct from '../../components/create-product';
const Products = () => {

    const [selectedProduct,setSelectedProduct] = useState(null);

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts(),
    });
    return (
        <Sheet>
        <div>
            <SiteHeader title="products" />
          <h3>Product List</h3>
          <div className="flex justify-between items-center mb-5">
            <SheetTrigger asChild>
                <Button
                variant="default">
                    <Plus className="mr-2 h-4 w-4" />
                    New Product
                </Button>
            </SheetTrigger>
          </div>
          {productsQuery.isLoading && <p>Loading...</p>}
          {productsQuery.isError && <p>Error: {productsQuery.error.message}</p>}
            {productsQuery.isSuccess && (
                <ProductDataTable products={productsQuery.data} setSelectedProduct={setSelectedProduct}/>
            )}
        </div>
        <CreateProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
        </Sheet>
    )
}

export default Products