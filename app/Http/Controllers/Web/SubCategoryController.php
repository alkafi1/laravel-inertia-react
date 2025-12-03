<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Subcategory\SubCategoryStoreRequest;
use App\Services\CategoryService;
use App\Services\SubCategoryService;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    public function __construct(private readonly SubCategoryService $subCategoryService, private readonly CategoryService $categoryService) {}
    /**
     * Index page
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $subCategories = $this->subCategoryService->getSubCategories(); // get categories from service
        $categories = $this->categoryService->categorySelectList(); // get categories from service

        // send data to react
        return Inertia::render('SubCategory/Index', [
            'categories' => $categories,
            'subCategories' => $subCategories,
        ]);
    }

    public function store(SubCategoryStoreRequest $request)
    {
        $category = $this->subCategoryService->store($request->validated()); // store category
        // redirect to index
        return redirect()
            ->route('subcategory.index')
            ->with('success', 'Category created successfully!');
    }
}
