import { BookOpen, Heart } from "lucide-react";


const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <span className="font-semibold text-lg">Library System</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            A minimal and efficient library management system for organizing books, tracking inventory, and managing
                            borrowing operations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/books" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Browse Books
                                </a>
                            </li>
                            <li>
                                <a href="/create-book" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Add New Book
                                </a>
                            </li>
                            <li>
                                <a href="/borrow-summary" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Borrow Summary
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* System Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">System Features</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Book catalog management</li>
                            <li>• Borrowing system</li>
                            <li>• Inventory tracking</li>
                            <li>• Usage analytics</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Library Management System. Built with React and TypeScript.
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500 fill-current" />
                            <span>for efficient library management</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;