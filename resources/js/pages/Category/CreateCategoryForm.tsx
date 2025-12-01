import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function CreateCategoryForm() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("category.store"), {
            onSuccess: () => {
                reset();
                toast.success("Category created successfully!");
                setOpen(false);
            },
        });
    };

    return (
        <div className="flex justify-end mb-0 mt-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-2 mr-2" onClick={() => setOpen(true)}>
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
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Enter category name"
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
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Enter category description"
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Save Category"}
                            </Button>

                            <DialogClose asChild>
                                <Button variant="outline" className="mr-2" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
