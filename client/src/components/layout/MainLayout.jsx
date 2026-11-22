import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content container">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;