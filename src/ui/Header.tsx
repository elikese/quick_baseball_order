import { NavLink } from "react-router-dom";

const Header = () => {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 font-medium ${isActive ? "text-gray-600 font-bold" : "text-gray-600"}`;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-300">
            <nav className="max-w-screen-md mx-auto flex justify-center gap-4 py-2">
                <NavLink to="/" className={linkStyle}>
                    입력
                </NavLink>
                <NavLink to="/preview" className={linkStyle}>
                    프리뷰
                </NavLink>
                <NavLink to="/field" className={linkStyle}>
                    필드
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
