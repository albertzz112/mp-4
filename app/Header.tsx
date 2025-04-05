import Link from "next/link";

export default function Header() {
    return (
        <header className="site-header">
            <h2 className="site-title">Harvard Art Museum Searcher</h2>
            <nav className="site-nav">
                <Link href="/" className="nav-link">
                    Home
                </Link>
            </nav>
        </header>
    );
}
