import AppLayout from "@/layouts/app-layout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import EditCategoryForm from "./EditCategoryForm";

interface Category {
    id: string;
    name: string;
    description: string;
}

interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function Index({
    categories,
}: {
    auth: any;
    categories: Pagination<Category>;
}) {
    const breadcrumbs = [
        { title: "Category", href: "/category" }
    ];

    const paginate = (url: string | null) => {
        if (!url) return;
        router.get(url, {}, { preserveScroll: true, preserveState: false });
    };

    // 🧩 Inertia form state
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    // 🧠 Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('category.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            {/* Create Button */}
            <div className="flex justify-end mb-0 mt-2" >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mt-2 mr-2">
                            <Plus className="w-4 h-4 mr-2" /> Category
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                            <DialogDescription>
                                Fill the details below to create a new category.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter Category name"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm">{errors.name}</div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    className="w-full border rounded-lg p-2"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter Caegory description"
                                />
                                {errors.description && (
                                    <div className="text-red-500 text-sm">{errors.description}</div>
                                )}
                            </div>
                            <DialogFooter className="mt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Category'}
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="outline" className="mr-2">Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table Box */}
            <div className="rounded-xl shadow p-4 m-4 border border-sidebar-border/70 dark:border-sidebar-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SL</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories?.data?.length ? (
                            categories.data.map((cat, index) => (
                                <TableRow key={cat.id}>
                                    <TableCell>
                                        #{(categories.current_page - 1) * categories.per_page + index + 1}
                                    </TableCell>
                                    <TableCell>{[cat.name]}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {/* Edit Button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline">Edit</Button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                    <DialogDescription>
                                                        Update the details for {cat.name}.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <EditCategoryForm cat={cat} />
                                            </DialogContent>
                                        </Dialog>

                                        {/* Delete Button with AlertDialog */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="destructive">Delete</Button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. The {cat.name} category will be deleted permanently.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            router.delete(route("category.destroy", cat.id), {
                                                                preserveScroll: true,
                                                                onSuccess: () => {
                                                                    // Optional: show success toast
                                                                    toast.success(`${cat.name} deleted successfully!`);
                                                                },
                                                                onError: () => {
                                                                    toast.error(`Failed to delete ${cat.name}`);
                                                                }
                                                            })
                                                        }
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-4 text-danger-500 font-semibold "
                                >
                                    No categories found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <p>
                        Page {categories?.current_page} of{" "}
                        {categories?.last_page}
                    </p>

                    <div className="space-x-2">
                        {categories?.links?.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                disabled={!link.url}
                                onClick={() => paginate(link.url)}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
