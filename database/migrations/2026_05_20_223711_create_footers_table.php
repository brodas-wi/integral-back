<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('html_content')->nullable();
            $table->longText('css_content')->nullable();
            $table->longText('js_content')->nullable();
            $table->longText('components_json')->nullable();
            $table->longText('styles_json')->nullable();
            $table->boolean('is_active')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->foreignId('footer_id')->nullable()->constrained('footers')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\Footer::class);
        });
        Schema::dropIfExists('footers');
    }
};
