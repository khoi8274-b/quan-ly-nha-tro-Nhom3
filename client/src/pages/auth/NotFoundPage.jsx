import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <section style={{ textAlign: "center", padding: "4rem 1rem" }}>
    <h1>404 - Không tìm thấy trang</h1>
    <p>Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.</p>
    <Link to="/" className="btn-primary">Quay về trang chủ</Link>
  </section>
);

export default NotFoundPage;