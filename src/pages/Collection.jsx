import React from 'react'
import Breadcrumbs from '@/components/breadcrumb';
import ProductItem from "@/components/commerce-ui/product-cards-01";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterSideBar from "../components/commerce-ui/filter-sidebar";

const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Sports" },
];

const Collection = () => {
    return (
        <Sheet>
            <div className='flex flex-col'>
                <Breadcrumbs items={[
                    { name: 'Collections', href: '/collections' }
                ]} />

                {/* Filtering Section */}
                <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
                    <SheetTrigger asChlid>
                        <Button variant="outline">Filter</Button>
                    </SheetTrigger>
                    <FilterSideBar categories={categories} />
                </div>


                {/* Collection page content goes here */}
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto w-full">
                    {
                        Array.from({ length: 12 }).map((_, index) => (
                            <ProductItem
                                key={index}
                                title={`Product ${index + 1}`}
                                description={`Description for product ${index + 1}`}
                                price={Math.floor(Math.random() * 100) + 1}
                            />
                        ))
                    }
                </div>
            </div>
        </Sheet>
    )
}

export default Collection