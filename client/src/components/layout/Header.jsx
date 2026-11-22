import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">NhàTrọPro</NavLink>
        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Phòng trống
          </NavLink>

          {user?.role === "landlord" && (
            <>
              <NavLink to="/landlord/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Thống kê
              </NavLink>
              <NavLink to="/landlord/rooms" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Dãy & Phòng
              </NavLink>
              <NavLink to="/landlord/contracts" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Hợp đồng
              </NavLink>
              <NavLink to="/landlord/invoices" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Hóa đơn
              </NavLink>
              <NavLink to="/maintenances" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Sửa chữa
              </NavLink>
            </>
          )}

          {user?.role === "tenant" && (
            <>
              <NavLink to="/tenant/my-room" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Phòng của tôi
              </NavLink>
              <NavLink to="/tenant/invoices" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Hóa đơn
              </NavLink>
              <NavLink to="/maintenances" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Sửa chữa
              </NavLink>
            </>
          )}
        </nav>

        <div className="header-actions">
          <button type="button" onClick={toggleTheme} className="btn-secondary">
            {darkMode ? "Sáng" : "Tối"}
          </button>
          {user ? (
            <>
              <span className="user-badge">{user.fullName}</span>
              <button type="button" onClick={handleLogout} className="btn-danger">Đăng xuất</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-secondary">Đăng nhập</NavLink>
              <NavLink to="/register" className="btn-primary">Đăng ký</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;