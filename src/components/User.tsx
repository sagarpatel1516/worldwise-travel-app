import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/fakeAuthContext";

import styles from "./User.module.css";

function User(): React.JSX.Element | null {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  function handleClick(): void {
    logout();
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.user}>
      <span>Welcome, {user.name}</span>

      <img src={user.avatar} alt={user.name} />

      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
