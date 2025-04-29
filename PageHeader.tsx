import { Link, useLocation } from "wouter";
import { FaCheckSquare } from "react-icons/fa";

export default function PageHeader() {
  const [location] = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaCheckSquare className="text-teal-500 text-xl" />
            <span className="text-xl font-semibold text-slate-700">
              <span className="text-teal-500">Due</span> Clear
            </span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/">
                <span className={`text-sm font-medium ${location === '/' ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-800 transition-colors cursor-pointer`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/invoicing-guide">
                <span className={`text-sm font-medium ${location === '/invoicing-guide' ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-800 transition-colors cursor-pointer`}>
                  Invoicing Guide
                </span>
              </Link>
            </li>
            <li>
              <Link href="/help-center">
                <span className={`text-sm font-medium ${location === '/help-center' ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-800 transition-colors cursor-pointer`}>
                  Help
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
