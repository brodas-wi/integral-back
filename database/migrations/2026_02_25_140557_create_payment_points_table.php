<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_points', function (Blueprint $table) {
            $table->id();
            $table->string('correspondent');
            $table->string('department');
            $table->string('municipality');
            $table->string('affiliate');
            $table->string('branch');
            $table->text('address');
            $table->string('zone')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();

            $table->index('correspondent');
            $table->index('department');
            $table->index('municipality');
            $table->index('affiliate');
            $table->index('is_active');
            $table->unique(['correspondent', 'affiliate', 'branch']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_points');
    }
};
