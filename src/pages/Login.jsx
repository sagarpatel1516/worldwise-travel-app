import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/fakeAuthContext.jsx";
import Button from "../components/Button.jsx";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    if (email && password) login({ email, password });
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
