<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class MediaController extends Controller
{
    // Show media list
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

    // Show create form
    public function create()
    {
        return view('media.create');
    }

    // Store uploaded files
    public function store(Request $request)
    {
        $request->validate([
            'files' => 'required|array|min:1|max:10',
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

    // Process file upload
    private function processUpload($file, $alt = null)
    {
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType();
        $size = $file->getSize();
        $type = $this->determineFileType($mimeType);
        $extension = $file->getClientOriginalExtension();
        $storedFilename = Str::uuid() . '.' . $extension;

        $width = null;
        $height = null;
        $finalSize = $size;

        if ($type === 'image' && $mimeType !== 'image/svg+xml') {
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

                switch ($mimeType) {
                    case 'image/jpeg':
                    case 'image/jpg':
                        $encoded = $image->toJpeg(quality: 85);
                        break;
                    case 'image/png':
                        $encoded = $image->toPng();
                        break;
                    case 'image/webp':
                        $encoded = $image->toWebp(quality: 85);
                        break;
                    default:
                        $encoded = $image->toJpeg(quality: 85);
                }

                file_put_contents($fullPath, $encoded);

                if (file_exists($fullPath)) {
                    $finalSize = filesize($fullPath);
                }
            } catch (\Exception $e) {
                \Log::error('Image optimization failed: ' . $e->getMessage());
                $path = $file->storeAs('media/images', $storedFilename, 'public');
                $finalSize = $size;

                try {
                    list($width, $height) = getimagesize($file->getRealPath());
                } catch (\Exception $dimError) {
                    // Dimensions unavailable
                }
            }
        } else {
            if ($type === 'image') {
                $path = $file->storeAs('media/images', $storedFilename, 'public');
                try {
                    list($width, $height) = getimagesize($file->getRealPath());
                } catch (\Exception $e) {
                    // SVG dimensions might not be available
                }
            } else {
                $directory = $type === 'pdf' ? 'media/pdfs' : 'media/documents';
                $path = $file->storeAs($directory, $storedFilename, 'public');
            }
        }

        return Media::create([
            'filename' => $originalName,
            'alt' => $alt,
            'stored_filename' => $storedFilename,
            'mime_type' => $mimeType,
            'type' => $type,
            'size' => $finalSize,
            'path' => $path,
            'disk' => 'public',
            'width' => $width,
            'height' => $height,
            'uploaded_by' => auth()->id(),
        ]);
    }

    // Determine file type from mime type
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

    // Show media details
    public function show(Media $media)
    {
        return view('media.show', compact('media'));
    }

    // Edit media metadata
    public function edit(Media $media)
    {
        return view('media.edit', compact('media'));
    }

    // Update media metadata
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

    // Delete media file and database record
    public function destroy(Media $media)
    {
        if (!auth()->user()->can('media.delete') && !auth()->user()->can('media.manage')) {
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sin permisos para eliminar'
                ], 403);
            }
            return redirect()->route('media.index')->with('error', 'Sin permisos');
        }

        try {
            $filename = $media->filename;
            $media->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "'{$filename}' eliminado exitosamente"
                ]);
            }

            return redirect()->route('media.index')->with('success', "'{$filename}' eliminado");
        } catch (\Exception $e) {
            \Log::error('Media deletion failed: ' . $e->getMessage());

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar'
                ], 500);
            }

            return redirect()->route('media.index')->with('error', 'Error al eliminar');
        }
    }

    // Download media file
    public function download(Media $media)
    {
        return Storage::disk($media->disk)->download($media->path, $media->filename);
    }

    // API endpoint for media library
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
