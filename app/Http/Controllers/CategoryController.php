<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryStoreRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categoryService) {}
    /**
     * Index page
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $categories = $this->categoryService->getCategories(); // get categories from service

        // send data to react
        return Inertia::render('Category/Index', [
            'categories' => $categories, // send data to react
        ]);
    }

    /**
     * Create a new category
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Category/Create', []);
    }

    /**
     * Store a new category
     *
     * @param \App\Http\Requests\Category\CategoryStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CategoryStoreRequest $request)
    {
        $category = $this->categoryService->store($request->validated()); // store category
        // redirect to index
        return redirect()
            ->route('category.index')
            ->with('success', 'Category created successfully!');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()
            ->route('category.index')
            ->with('success', 'Category deleted successfully!');
    }

    public function update(Category $category, CategoryStoreRequest $request)
    {
        $category->update($request->validated());
        return redirect()
            ->route('category.index')
            ->with('success', 'Category updated successfully!');
    }
}
