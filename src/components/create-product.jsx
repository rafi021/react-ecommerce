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
} from "@/components/ui/sheet";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
    images: z.array(z.string()).optional(), // optional fieldz.string().optional(),
});

export default function CreateProduct() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            categoryId: 1,
            images: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images",
    });

    const onSubmit = async (data) => {
        console.log(data);

        // Reset form after submit
        form.reset();
    };

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
                        <Button type="submit">Save changes</Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}
