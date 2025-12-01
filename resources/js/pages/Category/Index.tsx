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
import { useState } from "react";
import Create from "./Create";
import CreateCategoryForm from "./CreateCategoryForm";
import DeleteAlert from "./DeleteAlert";

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            {/* Create Button */}
            <CreateCategoryForm />

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
                                        <EditCategoryForm cat={cat} />

                                        {/* Delete Button with AlertDialog */}
                                        <DeleteAlert
                                            id={cat.id}
                                            name={cat.name}
                                            routeName="category.destroy"
                                        />
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
