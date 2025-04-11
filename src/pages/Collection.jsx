import React from 'react'
import BreadcrumbWithCustomSeparator from '@/components/breadcrumb';
import ProductItem from "@/components/commerce-ui/product-cards-01";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FilterSideBar from "../components/commerce-ui/filter-sidebar";
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import { SkeletonCard } from './../components/commerce-ui/ProductSkeleton';
import { Paginations } from '../components/commerce-ui/Paginations';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Sports" },
];

const limit = 6;

const schema = z.object({
    title: z.string().optional(),
    offset: z.number(),
    categoryId: z.number().optional(),
  });

const Collection = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          title: "",
          price_min:0,
          price_max: 1000,
          offset: 0,
          categoryId: 1,
        },
      });

      const { title, price_min, price_max, offset, categoryId } = form.watch();
      console.log("hook form state", title, offset, price_min, price_max, categoryId);

      const productsQuery = useQuery({
        queryKey: ["products", title, offset, price_min, price_max, categoryId, limit],
        queryFn: () => getProducts(title, offset, categoryId, limit, price_min, price_max),
      });

      if (!productsQuery?.data?.totalItems) {
        return (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">Loading Products...</h1>
          </div>
        );
      }

    return (
        <Sheet>
            <div className='flex flex-col'>
                <BreadcrumbWithCustomSeparator items={[
                    { name: 'Collections', href: '/collections' }
                ]} />

                {/* Filtering Section */}
                <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
                <SheetTrigger asChild>
                    <Button variant="outline">Open</Button>
                </SheetTrigger>

                <FilterSideBar categories={categories} form={form} />
                </div>
            {/** End of Filtering Section */}


                {/* Collection page content goes here */}
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto w-full ">
                    {productsQuery.isLoading && (
                        <div>
                            {Array.from({ length: 6 }, (_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    )}
                    {productsQuery.isError && (
                        <div className="text-red-500">Error loading products</div>
                    )}
                    {productsQuery.isSuccess && productsQuery.data?.products?.length === 0 && (
                        <div className="text-gray-500">No products found</div>
                    )}
                    {productsQuery.data?.products?.map((product, index) => (
                        <ProductItem
                            key={index}
                            imageUrl={product.images[0]}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                    {/* Pagination */}
                    <Paginations 
                        offset={offset}
                        setValue={form.setValue}
                        limit={limit}
                        total={productsQuery?.data?.totalItems}
                    />
                </div>
            </div>
        </Sheet>
    )
}

export default Collection