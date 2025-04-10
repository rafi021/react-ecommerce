import React from 'react'
import Breadcrumbs from '@/components/breadcrumb';
import ProductItem from "@/components/commerce-ui/product-cards-01";
const Collection = () => {
    return (
        <div className='flex flex-col'>
            <Breadcrumbs items={[
                { name: 'Collections', href: '/collections' }
            ]} />

            {/* Collection page content goes here */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto w-full">
                {
                    Array.from({ length: 12 }).map((_, index) => (
                        <ProductItem 
                            key={index}
                            title={`Product ${index+1}`}
                            description={`Description for product ${index+1}`}
                            price={Math.floor(Math.random()*100) + 1}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Collection