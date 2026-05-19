<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image_path');
            $table->string('image_alt')->nullable();
            $table->string('category')->nullable();
            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('btn_primary_text')->nullable();
            $table->string('btn_primary_url')->nullable();
            $table->enum('btn_primary_style', [
                'fill-blue',
                'outline-blue',
                'fill-orange',
                'outline-orange',
                'fill-white',
                'outline-white'
            ])->default('fill-orange');
            $table->boolean('btn_primary_external')->default(false);
            $table->string('btn_secondary_text')->nullable();
            $table->string('btn_secondary_url')->nullable();
            $table->enum('btn_secondary_style', [
                'fill-blue',
                'outline-blue',
                'fill-orange',
                'outline-orange',
                'fill-white',
                'outline-white'
            ])->default('outline-white');
            $table->boolean('btn_secondary_external')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
