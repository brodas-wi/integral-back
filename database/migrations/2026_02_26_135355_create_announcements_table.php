<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('cta_text', 100)->nullable();
            $table->string('cta_url', 500)->nullable();
            $table->boolean('cta_new_tab')->default(true);
            $table->enum('display_type', ['global', 'homepage', 'specific_pages'])->default('global');
            $table->enum('display_mode', ['full', 'image_only'])->default('full');
            $table->json('page_slugs')->nullable();
            $table->integer('priority')->default(0);
            $table->enum('schedule_type', ['manual', 'scheduled'])->default('manual');
            $table->boolean('is_active')->default(false);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['is_active', 'starts_at', 'ends_at']);
            $table->index('display_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
