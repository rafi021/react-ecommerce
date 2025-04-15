import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose
} from "@/components/ui/sheet";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/products"; // Adjust the import path as necessary
import { useEffect } from "react";

const schema = z.object({
    id: z.number().optional(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    images: z.array(z.string()).optional(), // optional fieldz.string().optional(),
});

export default function CreateProduct({
    selectedProduct,
    setSelectedProduct
}) {
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            id: selectedProduct?.id || null,
            title: selectedProduct?.title || "",
            price: selectedProduct?.price || 0,
            description: selectedProduct?.description || "",
            categoryId: selectedProduct?.categoryId || 1,
            images: selectedProduct?.images || [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images",
    });

    const { isSubmitting } = form.formState;

    // mutation for creating product
    const productMutation = useMutation({
        mutationFn: () => createProduct(form.getValues()),
        onSuccess: () => {
            // Handle success (e.g., show a success message, redirect, etc.)
            console.log("Product created successfully!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    })

    // mutation for updating product
    const updateProductMutation = useMutation({
        mutationFn: (data) => updateProduct(data),
        onSuccess: () => {
            // Handle success (e.g., show a success message, redirect, etc.)
            console.log("Product updated successfully!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        if (isSubmitting) return;
        if (!selectedProduct) {
            productMutation.mutate(); // Call the mutation to create the product
        } else {
            // Call the mutation to update the product
            updateProductMutation.mutate(data);
            setSelectedProduct(null);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            console.log("selectedProduct", selectedProduct);
            form.setValue("images", selectedProduct.images);
            form.setValue("title", selectedProduct.title);
            form.setValue("description", selectedProduct.description);
            form.setValue("price", selectedProduct.price);
            form.setValue("categoryId", selectedProduct.category.id);
            form.setValue("id", selectedProduct.id);
        }
    }, [selectedProduct, form]);

    return (
        <SheetContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <SheetHeader>
                        <SheetTitle>Create Product</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter Price"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Ensure value is a number
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <FormLabel>Images</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 mb-2">
                                    <FormField
                                        control={form.control}
                                        name={`images.${index}`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="Enter image URL" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append("")}
                                className="mt-2"
                            >
                                Add Image URL
                            </Button>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {selectedProduct ? "Update" : "Create"}
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}
