import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const Placeholder = ({ title }) => <h2>Đang phát triển: {title}</h2>;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Trang công khai - TV2 sẽ thay Placeholder bằng HomeGuestPage */}
              <Route path="/" element={<Placeholder title="Danh sách phòng trống (TV2)" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Khu vực Chủ trọ */}
              <Route element={<ProtectedRoute allowedRoles={["landlord"]} />}>
                <Route path="/landlord/dashboard" element={<Placeholder title="Dashboard Thống kê (TV6)" />} />
                <Route path="/landlord/rooms" element={<Placeholder title="Quản lý Dãy & Phòng (TV3)" />} />
                <Route path="/landlord/contracts" element={<Placeholder title="Quản lý Hợp đồng (TV4)" />} />
                <Route path="/landlord/invoices" element={<Placeholder title="Chốt điện nước & Hóa đơn (TV5)" />} />
              </Route>

              {/* Khu vực Người thuê */}
              <Route element={<ProtectedRoute allowedRoles={["tenant"]} />}>
                <Route path="/tenant/my-room" element={<Placeholder title="Phòng & Hợp đồng của tôi (TV4)" />} />
                <Route path="/tenant/invoices" element={<Placeholder title="Hóa đơn của tôi (TV5)" />} />
              </Route>

              {/* Khu vực chung Chủ trọ & Người thuê */}
              <Route element={<ProtectedRoute allowedRoles={["landlord", "tenant"]} />}>
                <Route path="/maintenances" element={<Placeholder title="Yêu cầu sửa chữa (TV6)" />} />
              </Route>

              {/* Trang 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;