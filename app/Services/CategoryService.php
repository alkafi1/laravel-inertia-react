<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function __construct()
    {
        //
    }

    public function store($validateData)
    {
        Category::create($validateData);
    }

    public function getCategories()
    {
        $categories = Category::latest()->paginate(5);
        return $categories;
    }
}
