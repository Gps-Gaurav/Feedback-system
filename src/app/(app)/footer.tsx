import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 pt-3 pb-1">
      <div className="container mt-0 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Description */}
          <div>
            <h2 className="text-white text-2xl font-bold mt-0">Anonymous Feedback</h2>
            <p className="mt-1 text-gray-400">Share your feedback and improve experiences.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mt-0">Quick Links</h3>
            <ul className="mt-3 flex justify-center md:justify-start space-x-4">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
        </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mt-0">Connect With Us</h3>
            <div className="mt-3 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Mail /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 text-center text-gray-500 border-t border-gray-700 pt-2">
          <p>&copy; {new Date().getFullYear()} Anonymous Feedback. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
