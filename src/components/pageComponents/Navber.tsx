
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navber = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <nav className="">
                <div className="">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-primary" />
                            <Link to="/" className="text-xl font-bold text-gray-900">
                                Library System
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link to="/books" className="navbarMenu">All Books</Link>
                                <Link to="/create-book" className="navbarMenu">Add Book</Link>
                                <Link to="/borrow-summary" className="navbarMenu">Borrow Summary</Link>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                                aria-controls="mobile-menu"
                                aria-expanded={menuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
                            <Link onClick={() => setMenuOpen(!menuOpen)} to="/allBooks" className="mobileNavbarMenu">All Books</Link>
                            <Link onClick={() => setMenuOpen(!menuOpen)} to="/add-book" className="mobileNavbarMenu">Add Book</Link>
                            <Link onClick={() => setMenuOpen(!menuOpen)} to="/borrow-summary" className="mobileNavbarMenu">Borrow Summary</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navber;