<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('block_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('slug', 140)->unique();
            $table->string('category', 60)->default('Personalizados');
            $table->text('description')->nullable();
            $table->string('mode', 10)->default('static');
            $table->longText('html');
            $table->longText('css')->nullable();
            $table->longText('js')->nullable();
            $table->json('schema')->nullable();
            $table->text('icon_svg')->nullable();
            $table->unsignedInteger('version')->default(1);
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('block_templates');
    }
};