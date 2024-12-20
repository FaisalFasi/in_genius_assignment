import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../features/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    data: courses,
    status,
    error,
  } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
    console.log("Fetching courses...", courses);
  }, [dispatch]);

  if (status === "loading")
    return <div className="text-center text-xl">Loading...</div>;
  if (status === "failed")
    return (
      <div className="text-center text-xl text-red-600">Error: {error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                <Link
                  to={`/course/${course.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  {course.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-4">
                {course.modules?.map((module, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {module.title}
                    </h3>
                    <ul className="list-disc pl-5">
                      {module.lessons?.map((lesson, lessonIdx) => (
                        <li key={lessonIdx} className="text-gray-600">
                          <strong>{lesson.title}</strong> - {lesson.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                to={`/course/${course.id}`}
                className="inline-block bg-blue-600 text-white rounded-md py-2 px-4 text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200 mt-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
