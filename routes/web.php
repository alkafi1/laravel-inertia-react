<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Web\SubCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //category routes
    Route::get('category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('category', [CategoryController::class, 'store'])->name('category.store');
    Route::delete('category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');
    Route::patch('category/{category}/update', [CategoryController::class, 'update'])->name('category.update');

    // sub category routes
    Route::get('sub-category', [SubCategoryController::class, 'index'])->name('subcategory.index');
    Route::get('sub-category/create', [SubCategoryController::class, 'create'])->name('subcategory.create');
    Route::post('sub-category', [SubCategoryController::class, 'store'])->name('subcategory.store');
    Route::delete('sub-category/{category}', [SubCategoryController::class, 'destroy'])->name('csubategory.destroy');
    Route::patch('sub-category/{category}/update', [SubCategoryController::class, 'update'])->name('subcategory.update');

    // Product Routes
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
});

require __DIR__ . '/settings.php';
