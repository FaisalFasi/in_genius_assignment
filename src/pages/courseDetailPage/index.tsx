import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCurrentCourse,
  setCurrentCourse,
} from "../../features/currentCourseSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    currentCourse: course,
    status,
    error,
  } = useAppSelector((state) => state.currentCourse);

  useEffect(() => {
    if (id) {
      const courseId = parseInt(id, 10); // Convert `id` to a number
      dispatch(fetchCurrentCourse(courseId));
    }
  }, [dispatch, id]);

  const handleSetCourse = () => {
    // Set the current course manually
    dispatch(
      setCurrentCourse({
        id: 2,
        title: "Manual Course",
        description: "This is a manually set course.",
        modules: [],
      })
    );
  };

  if (status === "loading")
    return <div className="text-center p-4">Loading course details...</div>;
  if (status === "failed")
    return <div className="text-center text-red-600">Error: {error}</div>;

  if (!course) return <div className="text-center p-4">No course found!</div>;

  const renderContent = (content: any) => {
    if (content.type === "video" && content.data.includes("youtube.com")) {
      // Extract the video ID from the URL
      const videoId = content.data.split("v=")[1]?.split("&")[0];
      if (videoId) {
        return (
          <div className="mt-2">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }

    if (content.type === "audio" || content.type === "podcast") {
      // Render an audio player for both "audio" and "podcast" types
      return (
        <div className="mt-2">
          <audio controls className="w-full">
            <source src={content.data} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-lg text-gray-600 mt-4">{course.description}</p>
      </div>

      <div className="mb-6">
        <button
          onClick={handleSetCourse}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Set Manual Course
        </button>
      </div>

      <div className="space-y-8">
        {course.modules?.length > 0 ? (
          course.modules.map((module, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {module.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {module.lessons?.map((lesson, lessonIdx) => (
                  <div
                    key={lessonIdx}
                    className="bg-gray-50 shadow-sm rounded-lg p-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{lesson.description}</p>
                    <div className="mt-4">
                      {lesson.content?.map((content, contentIdx) => (
                        <div key={contentIdx}>
                          {content.type === "text" && (
                            <p className="text-sm text-gray-500 mt-2">
                              {content.data}
                            </p>
                          )}
                          {renderContent(content)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No modules available for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
