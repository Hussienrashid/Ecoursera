import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseView.css";

export default function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const mockCourse1 = {
      id,
      title: "React for Beginners",
      instructor: "Hussein Rashid",
      description:
        "Learn the basics of React, components, hooks, and build your first SPA.",
      image: "https://source.unsplash.com/900x500/?react,programming",
    };
    const mockLessons1 = [
      { id: 1, title: "Introduction to React" },
      { id: 2, title: "JSX and Components" },
      { id: 3, title: "State and Props" },
      { id: 4, title: "Hooks Basics" },
    ];
    const mockCourse2 = {
      id,
      title: "Laravel for Beginners",
      instructor: "Hussein Rashid",
      description:
        "Learn the basics of React, components, hooks, and build your first SPA.",
      image: "https://source.unsplash.com/900x500/?react,programming",
    };
    const mockLessons2 = [
      { id: 1, title: "Introduction to React" },
      { id: 2, title: "JSX and Components" },
      { id: 3, title: "State and Props" },
      { id: 4, title: "Hooks Basics" },
    ];
    setCourse(mockCourse1);
    setLessons(mockLessons1);
    setCourse(mockCourse2);
    setLessons(mockLessons2);
    setSelectedLesson(mockLessons1[0]);
  }, [id]);
  

  if (!course) return <div className="course-view-container">Loading...</div>;
  return (
    <div className="course-view-container">
      <div className="course-header">
        <img src={course.image} alt="" />
        <div>
          <h1>{course.title}</h1>
          <p className="course-instructor">By {course.instructor}</p>
          <p className="course-description">{course.description}</p>
          <button className="enroll-btn">Enroll Now</button>
        </div>
      </div>
      <h2 className="lessons-title">Lessons</h2>
      <div className="course-layout">
        <div className="lessons-list">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={
                selectedLesson?.id === lesson.id
                  ? "lesson-item active"
                  : "lesson-item"
              }
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
            </div>
          ))}
        </div>
        <div className="lesson-player">
          {selectedLesson ? (
            <>
              <h3>Now Playing:</h3>
              <p>{selectedLesson.title}</p>
              <div className="lesson-video-placeholder">
                <span>Video player placeholder</span>
              </div>
            </>
          ) : (
            <p>Select a lesson to start.</p>
          )}
        </div>
      </div>
    </div>
  );
}
