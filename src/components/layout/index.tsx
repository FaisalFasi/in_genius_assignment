import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-500">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            <h1 className="text-2xl font-semibold">InGenius Course Catalog</h1>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow bg-white">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Course Catalog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
