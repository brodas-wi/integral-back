<?php

namespace App\Console\Commands;

use App\Models\News;
use Illuminate\Console\Command;
use Carbon\Carbon;

class PublishScheduledNews extends Command
{
    protected $signature = 'news:publish-scheduled';

    protected $description = 'Publica automáticamente las noticias programadas cuya fecha ya se cumplió';

    public function handle(): int
    {
        $news = News::dueForPublishing()->get();

        if ($news->isEmpty()) {
            $this->info('No hay noticias pendientes de publicación.');
            return self::SUCCESS;
        }

        foreach ($news as $item) {
            $item->update([
                'status' => News::STATUS_PUBLISHED,
                'published_at' => Carbon::now(),
            ]);
        }

        $this->info("Se publicaron {$news->count()} noticia(s) programada(s).");

        return self::SUCCESS;
    }
}
