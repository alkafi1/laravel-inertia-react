import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface EditCategoryFormProps {
    cat: { id: string; name: string; description: string };
}

export default function EditCategoryForm({ cat }: EditCategoryFormProps) {
    const { data, setData, patch, errors, processing } = useForm({
        name: cat.name,
        description: cat.description || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route("category.update", cat.id), {
            onSuccess: () => toast.success("Category updated successfully!"),
            onError: () => toast.error("Failed to update category!"),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
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
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Enter Category description"
                />
                {errors.description && (
                    <div className="text-red-500 text-sm">{errors.description}</div>
                )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" type="button">
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    Update
                </Button>
            </div>
        </form>
    );
}
