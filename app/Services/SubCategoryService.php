<?php

namespace App\Services;

use App\Models\Category;
use App\Models\SubCategory;

class SubCategoryService
{
    public function __construct()
    {
        //
    }

    public function store($validateData)
    {
        SubCategory::create($validateData);
    }

    /**
     * Get all sub categories with their respective categories
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getSubCategories()
    {
        $subCategories = SubCategory::with(['categories'])->latest()->get();
        return $subCategories;
    }
}
