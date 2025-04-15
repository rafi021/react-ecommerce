import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {SheetTrigger} from "@/components/ui/sheet"
import { deleteProduct } from "../api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

  export default function ProductDataTable({products, setSelectedProduct}) {
    const queryClient = useQueryClient();
    const handleEdit = (product) => {
      console.log(product)
      setSelectedProduct(product);
    }
    const deleteMutation = useMutation({
      mutationFn: (id) => deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
    });
    const handleDelete = (productId) => {
      deleteMutation.mutate(productId);
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {/* Add your action buttons here */}
                   <SheetTrigger asChild>
                    <Button variant="outline" onClick={() => handleEdit(product)} className="text-blue-500 cursor-pointer">Edit</Button>
                   </SheetTrigger>
                  <Button variant="outline" onClick={() => handleDelete(product.id)} className="text-red-500 cursor-pointer">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  