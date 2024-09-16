import styles from "./Login.module.css";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginFormLeft from "../components/LoginFormLeft";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    username2: "",
    password: "",
    password2: "",
    confirmPassword: "",
    email: "",
    mobile: "",
  });

  const {
    login,
    register,
    verificationState,
    setVerificationState,
    showLogin,
    setShowLogin,
  } = useAuth();

  const { sending, sent, verified, showMessage } = verificationState;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleRegister(event) {
    event.preventDefault();
    const { username, password, email, mobile } = formData;
    register(username, password, email, mobile);
  }

  function handleLogin(event) {
    event.preventDefault();
    const { username2, password2 } = formData;
    login(username2, password2);
  }

  useEffect(() => {
    return () => {
      setVerificationState({
        sending: false,
        sent: false,
        verified: false,
        showMessage: false,
      });
    };
  }, [setVerificationState]);

  return (
    <div className={styles.log_reg_container}>
      {showLogin ? (
        <>
          {showMessage && (
            <div className={styles.verified_message}>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                  severity="success"
                  sx={{
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    boxShadow: "0 0 4px #05CAAD",
                  }}
                >
                  <AlertTitle>Success</AlertTitle>
                  Email verified successfully! Login with your new account.
                </Alert>
              </Stack>
            </div>
          )}
          <LoginFormLeft>
            <span>LOGO</span>
            <span>Welcome Back!</span>
            <p>Access Your Account to Rent and List Cars Effortlessly</p>
            <div>
              <span>Don't have an account?</span>
              <button onClick={() => setShowLogin(false)}>REGISTER</button>
            </div>
          </LoginFormLeft>

          <div className={styles.login_image}>
            <img src="../login_image.jpeg" />
          </div>

          <form
            onSubmit={handleLogin}
            className={styles.form}
            style={{ height: "460px" }}
          >
            <span>Login</span>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="username2"
                onChange={handleInputChange}
                value={formData.username2}
              />
              <input
                type="password"
                placeholder="Password"
                name="password2"
                onChange={handleInputChange}
                value={formData.password2}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <>
          <LoginFormLeft>
            <span>LOGO</span>
            <span>Create Your Account</span>
            <p>
              Join us to start renting cars or list your vehicle for others to
              rent.
            </p>
            <div>
              <span>Already have an Account?</span>
              <button onClick={() => setShowLogin(true)}>LOGIN</button>
            </div>
          </LoginFormLeft>

          <div className={styles.login_image}>
            <img src="../login_image.jpeg" />
          </div>

          <form
            onSubmit={handleRegister}
            className={styles.form}
            style={{ height: "560px" }}
          >
            <span>Register</span>

            {sending && (
              <div className={styles.loading_div}>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </div>
            )}

            {sent && !verified && (
              <div className={styles.email_sent_message}>
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert
                    severity="info"
                    sx={{
                      backgroundColor: "#111111",
                      color: "#ffffff",
                      boxShadow: "0 0 2px #05CAAD",
                    }}
                  >
                    Verification email sent. Please verify to complete
                    registration.
                  </Alert>
                </Stack>
              </div>
            )}

            {!sending && !sent && !verified && (
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                />
                <input
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  onChange={handleInputChange}
                  value={formData.mobile}
                />
              </div>
            )}

            <button type="submit">Register</button>
          </form>
        </>
      )}
    </div>
  );
}
