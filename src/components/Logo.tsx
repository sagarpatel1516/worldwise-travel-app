import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

function Logo(): React.JSX.Element {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
