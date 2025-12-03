import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import EditCategoryForm from "./EditCategoryForm";
import DeleteAlert from "./DeleteAlert";
import CreateSubCategoryForm from "./CreateSubCategoryForm";

interface Category {
    id: string;
    name: string;
    description: string;
}

interface SubCategory {
    id: string;
    category_id: string;
    name: string;
    description: string;
}

interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function Index({ categories, subCategories }: {
    auth: any;
    categories: Array<{ id: number; name: string }>;
    subCategories: Pagination<SubCategory>;
}
) {
    const breadcrumbs = [
        { title: "Sub Category", href: "/subcategory" }
    ];

    const paginate = (url: string | null) => {
        if (!url) return;
        router.get(url, {}, { preserveScroll: true, preserveState: false });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            {/* Create Button */}
            <CreateSubCategoryForm categories={categories} />

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
                        {subCategories?.data?.length ? (
                            subCategories.data.map((cat, index) => (
                                <TableRow key={cat.id}>
                                    <TableCell>
                                        #{(subCategories.current_page - 1) * subCategories.per_page + index + 1}
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
                        Page {subCategories?.current_page} of{" "}
                        {subCategories?.last_page}
                    </p>

                    <div className="space-x-2">
                        {subCategories?.links?.map((link, i) => (
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
