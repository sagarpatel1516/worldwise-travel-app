import { Outlet } from "react-router-dom";

import Logo from "./Logo";
import AppNav from "./AppNav";

import styles from "./Sidebar.module.css";

function SideBar(): React.JSX.Element {
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
