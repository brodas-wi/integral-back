<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('form_id')->constrained('forms')->restrictOnDelete();
            $table->foreignId('form_version_id')->constrained('form_versions')->restrictOnDelete();
            $table->json('answers');
            $table->string('email', 190)->nullable()->index();
            $table->text('search_text')->nullable();
            $table->string('status', 20)->default('new');
            $table->text('notes')->nullable();
            $table->string('source_url', 2048)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->string('notify_status', 20)->default('not_applicable');
            $table->string('confirmation_status', 20)->default('not_applicable');
            $table->text('mail_error')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['form_id', 'status', 'created_at']);
            $table->index('created_at');
            $table->index(['notify_status', 'confirmation_status']);
            $table->fullText('search_text');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
