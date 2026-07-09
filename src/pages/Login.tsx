import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/fakeAuthContext";

import Button from "../components/Button";
import PageNav from "../components/PageNav";

import styles from "./Login.module.css";

function Login(): React.JSX.Element {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    if (email && password) {
      login({ email, password });
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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

export default Login;
