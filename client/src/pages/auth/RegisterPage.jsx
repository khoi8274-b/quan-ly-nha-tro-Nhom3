import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", role: "tenant" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.fullName || !form.email || !form.phone || form.password.length < 6) {
      setError("Vui lòng điền đủ thông tin (mật khẩu tối thiểu 6 ký tự)");
      return;
    }
    try {
      const userData = await register(form);
      navigate(userData.role === "landlord" ? "/landlord/dashboard" : "/tenant/my-room");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <section className="auth-card">
      <h2>Đăng ký tài khoản</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="role">Vai trò</label>
          <select id="role" name="role" value={form.role} onChange={handleChange}>
            <option value="tenant">Người thuê trọ</option>
            <option value="landlord">Chủ nhà trọ</option>
          </select>
        </div>
        <button type="submit" className="btn-primary full-width">Tạo tài khoản</button>
      </form>
      <p className="auth-footer">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </section>
  );
};

export default RegisterPage;