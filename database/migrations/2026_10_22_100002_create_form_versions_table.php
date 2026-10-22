<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('forms')->restrictOnDelete();
            $table->unsignedInteger('version');
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('submit_label', 80);
            $table->json('fields');
            $table->json('settings');
            $table->char('content_hash', 64);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['form_id', 'version']);
        });

        Schema::table('forms', function (Blueprint $table) {
            $table->foreign('current_version_id')
                ->references('id')
                ->on('form_versions')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('forms', function (Blueprint $table) {
            $table->dropForeign(['current_version_id']);
        });

        Schema::dropIfExists('form_versions');
    }
};
