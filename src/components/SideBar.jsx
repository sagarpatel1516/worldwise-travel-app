import styles from "./Sidebar.module.css";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} by WorldWise
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
