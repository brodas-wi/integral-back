<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = Media::with('uploader')->latest();

        if ($request->filled('type')) {
            if ($request->type === 'document') {
                $query->whereIn('type', ['document', 'pdf']);
            } else {
                $query->where('type', $request->type);
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('filename', 'like', "%{$search}%")
                    ->orWhere('alt', 'like', "%{$search}%");
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $media = $query->paginate($perPage);

        $stats = [
            'total' => Media::count(),
            'images' => Media::where('type', 'image')->count(),
            'documents' => Media::where('type', 'document')->count(),
            'pdfs' => Media::where('type', 'pdf')->count(),
        ];

        return view('media.index', compact('media', 'stats'));
    }

    public function trashed(Request $request)
    {
        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = Media::onlyTrashed()->with('uploader')->latest('deleted_at');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('filename', 'like', "%{$search}%")
                    ->orWhere('alt', 'like', "%{$search}%");
            });
        }

        $media = $query->paginate($perPage);

        return view('media.trashed', compact('media'));
    }

    public function create()
    {
        return view('media.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'files' => [
                'required',
                'array',
                'min:1',
                'max:10',
                function ($attribute, $value, $fail) {
                    $totalSize = array_sum(array_map(fn($file) => $file->getSize(), $value));
                    if ($totalSize > 40 * 1024 * 1024) {
                        $fail('El tamaño total de los archivos no puede superar 40MB por carga.');
                    }
                },
            ],
            'files.*' => [
                'required',
                'file',
                function ($attribute, $value, $fail) {
                    $mimeType = $value->getMimeType();
                    $size = $value->getSize();

                    if (in_array($mimeType, ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'])) {
                        if ($size > 5 * 1024 * 1024) {
                            $fail('Las imágenes no pueden superar 5MB');
                        }
                    } elseif ($mimeType === 'application/pdf') {
                        if ($size > 40 * 1024 * 1024) {
                            $fail('Los PDFs no pueden superar 40MB');
                        }
                    } elseif (in_array($mimeType, [
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-excel.sheet.macroEnabled.12'
                    ])) {
                        if ($size > 20 * 1024 * 1024) {
                            $fail('Los archivos Excel no pueden superar 20MB');
                        }
                    } else {
                        $fail('Tipo de archivo no permitido');
                    }
                },
            ],
            'alts' => 'array',
            'alts.*' => 'nullable|string|max:255',
        ], [
            'files.required' => 'Selecciona al menos un archivo',
            'files.max' => 'Máximo 10 archivos a la vez',
        ]);

        $uploadedFiles = [];
        $alts = $request->input('alts', []);

        foreach ($request->file('files') as $index => $file) {
            $alt = $alts[$index] ?? null;
            $uploadedFiles[] = $this->processUpload($file, $alt);
        }

        $message = count($uploadedFiles) === 1
            ? 'Archivo subido exitosamente'
            : count($uploadedFiles) . ' archivos subidos exitosamente';

        return redirect()->route('media.index')->with('success', $message);
    }

    private function processUpload($file, $alt = null)
    {
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();
        $size = $file->getSize();
        $type = $this->determineFileType($mimeType);

        $width = null;
        $height = null;
        $finalSize = $size;
        $finalMimeType = $mimeType;
        $displayName = $originalName;

        if ($type === 'image' && $mimeType !== 'image/svg+xml') {
            $storedFilename = Str::uuid() . '.webp';
            $finalMimeType = 'image/webp';
            $displayName = pathinfo($originalName, PATHINFO_FILENAME) . '.webp';

            try {
                $image = Image::read($file);
                $width = $image->width();
                $height = $image->height();

                if ($width > 2000) {
                    $image->scale(width: 2000);
                    $width = $image->width();
                    $height = $image->height();
                }

                $path = 'media/images/' . $storedFilename;
                $fullPath = storage_path('app/public/' . $path);
                $directory = dirname($fullPath);

                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }

                $encoded = $image->toWebp(quality: 90);
                file_put_contents($fullPath, $encoded);

                if (file_exists($fullPath)) {
                    $finalSize = filesize($fullPath);
                }
            } catch (\Exception $e) {
                \Log::error('Image optimization failed: ' . $e->getMessage());
                $storedFilename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $finalMimeType = $mimeType;
                $displayName = $originalName;
                $path = $file->storeAs('media/images', $storedFilename, 'public');
                $finalSize = $size;

                try {
                    list($width, $height) = getimagesize($file->getRealPath());
                } catch (\Exception $dimError) {
                }
            }
        } elseif ($type === 'image') {
            $extension = $file->getClientOriginalExtension();
            $storedFilename = Str::uuid() . '.' . $extension;
            $path = $file->storeAs('media/images', $storedFilename, 'public');
            try {
                list($width, $height) = getimagesize($file->getRealPath());
            } catch (\Exception $e) {
            }
        } else {
            $extension = $file->getClientOriginalExtension();
            $storedFilename = Str::uuid() . '.' . $extension;
            $directory = $type === 'pdf' ? 'media/pdfs' : 'media/documents';
            $path = $file->storeAs($directory, $storedFilename, 'public');
        }

        return Media::create([
            'filename' => $displayName,
            'alt' => $alt,
            'stored_filename' => $storedFilename,
            'mime_type' => $finalMimeType,
            'type' => $type,
            'size' => $finalSize,
            'path' => $path,
            'disk' => 'public',
            'width' => $width,
            'height' => $height,
            'uploaded_by' => auth()->id(),
        ]);
    }

    private function determineFileType(string $mimeType): string
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }

        if ($mimeType === 'application/pdf') {
            return 'pdf';
        }

        return 'document';
    }

    public function show(Media $media)
    {
        return view('media.show', compact('media'));
    }

    public function edit(Media $media)
    {
        return view('media.edit', compact('media'));
    }

    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'filename' => 'required|string|max:255',
            'alt' => $media->isImage() ? 'required|string|max:255' : 'nullable|string|max:255',
        ], [
            'filename.required' => 'El nombre es obligatorio',
            'alt.required' => 'El texto alternativo es obligatorio para imágenes',
        ]);

        $media->update($validated);

        return redirect()->route('media.show', $media)->with('success', 'Archivo actualizado exitosamente');
    }

    public function usages(Media $media)
    {
        $usages = $media->findUsages();

        return response()->json(['usages' => $usages]);
    }

    public function destroy(Media $media)
    {
        if (!auth()->user()->can('media.delete') && !auth()->user()->can('media.manage')) {
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Sin permisos para eliminar'], 403);
            }
            return redirect()->route('media.index')->with('error', 'Sin permisos');
        }

        $usages = $media->findUsages();
        if (!empty($usages)) {
            $message = 'No se puede eliminar: el archivo está en uso en ' . count($usages) . ' lugar(es).';
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => $message, 'usages' => $usages], 422);
            }
            return redirect()->route('media.index')->with('error', $message);
        }

        try {
            $filename = $media->filename;
            $media->delete();

            if (request()->expectsJson()) {
                return response()->json(['success' => true, 'message' => "'{$filename}' movido a la papelera"]);
            }

            return redirect()->route('media.index')->with('success', "'{$filename}' movido a la papelera");
        } catch (\Exception $e) {
            \Log::error('Media soft delete failed: ' . $e->getMessage());

            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Error al eliminar'], 500);
            }

            return redirect()->route('media.index')->with('error', 'Error al eliminar');
        }
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        if (empty($ids)) {
            return response()->json(['success' => false, 'message' => 'No se seleccionaron archivos'], 422);
        }

        $blocked = [];
        $deleted = 0;

        foreach (Media::whereIn('id', $ids)->get() as $media) {
            $usages = $media->findUsages();
            if (!empty($usages)) {
                $blocked[] = $media->filename;
                continue;
            }
            $media->delete();
            $deleted++;
        }

        if (!empty($blocked)) {
            $message = "{$deleted} archivo(s) movido(s) a la papelera. Bloqueados por estar en uso: " . implode(', ', $blocked);
            return response()->json(['success' => $deleted > 0, 'message' => $message, 'blocked' => $blocked]);
        }

        return response()->json(['success' => true, 'message' => "{$deleted} archivo(s) movido(s) a la papelera"]);
    }

    public function restore($id)
    {
        $media = Media::onlyTrashed()->findOrFail($id);
        $media->restore();

        if (request()->expectsJson()) {
            return response()->json(['success' => true, 'message' => "'{$media->filename}' restaurado"]);
        }

        return redirect()->route('media.trashed')->with('success', "'{$media->filename}' restaurado");
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->input('ids', []);
        if (empty($ids)) {
            return response()->json(['success' => false, 'message' => 'No se seleccionaron archivos'], 422);
        }

        $count = Media::onlyTrashed()->whereIn('id', $ids)->get()->each->restore()->count();

        return response()->json(['success' => true, 'message' => "{$count} archivo(s) restaurado(s)"]);
    }

    public function forceDelete($id)
    {
        $media = Media::onlyTrashed()->findOrFail($id);
        $filename = $media->filename;
        $media->forceDelete();

        if (request()->expectsJson()) {
            return response()->json(['success' => true, 'message' => "'{$filename}' eliminado permanentemente"]);
        }

        return redirect()->route('media.trashed')->with('success', "'{$filename}' eliminado permanentemente");
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        if (empty($ids)) {
            return response()->json(['success' => false, 'message' => 'No se seleccionaron archivos'], 422);
        }

        $count = Media::onlyTrashed()->whereIn('id', $ids)->get()->each->forceDelete()->count();

        return response()->json(['success' => true, 'message' => "{$count} archivo(s) eliminado(s) permanentemente"]);
    }

    public function download(Media $media)
    {
        return Storage::disk($media->disk)->download($media->path, $media->filename);
    }

    public function apiIndex(Request $request)
    {
        $perPage = (int) $request->input('per_page', 20);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 20;

        $query = Media::with('uploader')->latest();

        $types = $request->input('types', []);
        $type  = $request->input('type');

        if (!empty($types) && is_array($types)) {
            $query->whereIn('type', $types);
        } elseif ($type === 'document') {
            $query->whereIn('type', ['document', 'pdf']);
        } elseif ($type) {
            $query->where('type', $type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('filename', 'like', "%{$search}%")
                    ->orWhere('alt', 'like', "%{$search}%");
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $media = $query->paginate($perPage);

        $stats = [
            'total'     => Media::count(),
            'images'    => Media::where('type', 'image')->count(),
            'documents' => Media::whereIn('type', ['document', 'pdf'])->count(),
        ];

        return response()->json([
            'items' => $media->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'type'       => $item->type,
                    'url'        => $item->url,
                    'filename'   => $item->filename,
                    'alt'        => $item->alt ?? '',
                    'size'       => $item->human_size,
                    'dimensions' => $item->isImage() && $item->width && $item->height
                        ? "{$item->width} × {$item->height}"
                        : null,
                ];
            }),
            'pagination' => [
                'current' => $media->currentPage(),
                'total'   => $media->lastPage(),
                'hasMore' => $media->hasMorePages(),
            ],
            'stats' => $stats,
        ]);
    }
}
