import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    try {
      const userData = await login(email, password);
      navigate(userData.role === "landlord" ? "/landlord/dashboard" : "/tenant/my-room");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <section className="auth-card">
      <h2>Đăng nhập hệ thống</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary full-width">Đăng nhập</button>
      </form>
      <p className="auth-footer">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
    </section>
  );
};

export default LoginPage;