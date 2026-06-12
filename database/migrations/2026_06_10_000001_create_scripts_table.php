<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scripts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();

            // Scope: global (all pages) or per_page (specific pages)
            $table->enum('scope', ['global', 'per_page'])->default('global');

            // JSON array of page slugs when scope = per_page
            $table->json('page_slugs')->nullable();

            // Script content — JS is required, CSS is optional
            $table->longText('js_content')->nullable();
            $table->longText('css_content')->nullable();

            // Approval workflow
            // draft: just created/edited, not submitted
            // pending_review: submitted for review
            // approved: reviewed and approved, can be activated
            // rejected: reviewed and rejected
            $table->enum('status', ['draft', 'pending_review', 'approved', 'rejected'])->default('draft');

            // Active only when status = approved
            $table->boolean('is_active')->default(false);

            // Rejection reason
            $table->text('rejection_reason')->nullable();

            // Review tracking
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();

            // Approval tracking
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();

            // Audit fields
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->constrained('users')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scripts');
    }
};
