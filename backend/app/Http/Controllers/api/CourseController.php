<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Temporary in-memory data (until SQL Server)
    private function demoCourses(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'React for Beginners',
                'category' => 'Programming',
                'instructor' => 'John Smith',
                'price' => 0,
                'image' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=60',
                'description' => 'Learn React fundamentals with projects.',
            ],
            [
                'id' => 2,
                'title' => 'Laravel Full Course',
                'category' => 'Programming',
                'instructor' => 'Sarah Johnson',
                'price' => 0,
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60',
                'description' => 'Build APIs with Laravel and best practices.',
            ],
            [
                'id' => 3,
                'title' => 'UI/UX Design Basics',
                'category' => 'Design',
                'instructor' => 'Nadia Ali',
                'price' => 0,
                'image' => 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=60',
                'description' => 'Design clean interfaces and user flows.',
            ],
        ];
    }

    public function index(Request $request)
    {
        $category = $request->query('category');
        $q = $request->query('q');

        $courses = $this->demoCourses();

        if ($category) {
            $courses = array_values(array_filter($courses, fn($c) => strcasecmp($c['category'], $category) === 0));
        }

        if ($q) {
            $courses = array_values(array_filter($courses, fn($c) =>
                str_contains(strtolower($c['title']), strtolower($q)) ||
                str_contains(strtolower($c['instructor']), strtolower($q))
            ));
        }

        return response()->json([
            'data' => $courses
        ]);
    }

    public function show(int $id)
    {
        $course = collect($this->demoCourses())->firstWhere('id', $id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json(['data' => $course]);
    }

    public function store(Request $request)
    {
        // For now, just validate & return what would be created (no DB yet)
        $data = $request->validate([
            'title' => ['required','string','max:200'],
            'category' => ['required','string','max:100'],
            'instructor' => ['required','string','max:120'],
            'price' => ['nullable','numeric','min:0'],
            'image' => ['nullable','url'],
            'description' => ['nullable','string'],
        ]);

        return response()->json([
            'message' => 'Course would be created (DB not connected yet)',
            'data' => array_merge(['id' => 999], $data),
        ], 201);
    }
}
