import { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import log from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Email və şifrə mütləqdir.");
      return;
    }

    const {error } = await login({ email, password });

    if (error) {
      setFormError(error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className={log.container}>
      <h1>Login form</h1>
      <form className={log.auth} onSubmit={handleSubmit}>
        {formError && <p className={log.error}>{formError}</p>}

        <div className={log.form}>
          <label htmlFor="email">E-poçt</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={log.form}>
          <label htmlFor="password">Şifrə</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={log.button}>Login</button>

        <p className={log.redirect}>
          Hesabınız yoxdur? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
