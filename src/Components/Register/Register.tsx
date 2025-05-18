import { Link, useNavigate } from "react-router-dom"
import reg from "./Register.module.css"
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

function Register() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");
  const navigate=useNavigate()
  const {register}=useContext(GlobalContext)

    const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Ad daxil edilməlidir.";
    if (!surname) errors.surname = "Soyad daxil edilməlidir.";
    if (!phone || !/^\d{1,10}$/.test(phone))
      errors.phone = "Mobil nömrə düzgün deyil!";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Email (@gmail.com) formatinda olmalidir!";
    if (!password || password.length < 6)
      errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) return;

    const { data, error } = await register({ name, surname, phone, email, password });

    if (error) {
      setGeneralError(error);
    } else {
      alert("Qeydiyyat uğurla başa çatdı.");
      navigate("/login");
    }
  };

  return (
   <div className={reg.container}>
     <h1>Register form</h1>
      <div className={reg.con}>
        <form className={reg.auth} onSubmit={handleSubmit}>
        {generalError && <p className={reg.important}>{generalError}</p>}
          <div className={reg.form}>
            <label htmlFor="name">
              Ad <span className={reg.important}>*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p className={reg.important}>{formErrors.name}</p>
            )}
          </div>
          <div className={reg.form}>
            <label htmlFor="surname">
              Soyad <span className={reg.important}>*</span>
            </label>
            <input
              type="text"
              id="surname"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {formErrors.surname && (
              <p className={reg.important}>{formErrors.surname}</p>
            )}
          </div>
          <div className={reg.form}>
            <label htmlFor="phone">
              Mobil nömrə <span className={reg.important}>*</span>
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {formErrors.phone && (
              <p className={reg.important}>{formErrors.phone}</p>
            )}
          </div>

          <div className={reg.form}>
            <label htmlFor="email">
              E-poçt <span className={reg.important}>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className={reg.important}>{formErrors.email}</p>
            )}
          </div>
          <div className={reg.form}>
            <label htmlFor="password">
              Şifrə <span className={reg.important}>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className={reg.important}>{formErrors.password}</p>
            )}
          </div>

          <button type="submit" className={reg.button}>
            Register
          </button>

          <p className={reg.red}>
            Artıq hesabınız var? <Link to="/login">Giriş</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register