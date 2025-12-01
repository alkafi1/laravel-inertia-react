import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

interface DeleteAlertProps {
    id: number | string;
    name: string;
    routeName: string; // example: "category.destroy"
}

export default function DeleteAlert({ id, name, routeName }: DeleteAlertProps) {
    const handleDelete = () => {
        router.delete(route(routeName, id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${name} deleted successfully!`);
            },
            onError: () => {
                toast.error(`Failed to delete ${name}`);
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. <strong>{name}</strong> will be deleted permanently.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
