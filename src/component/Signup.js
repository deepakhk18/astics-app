import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./login.css";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    console.log("user", user);
    axios.post("http://localhost:5000/user", user).then((res) => {
      alert("signup successfull you can login using that credential");
      history.push("/");
    }).catch((e)=>console.log(e));
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Signup here 🚪</h1>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
      {error !== "" && <p className="error">{error}</p>}
    </div>
  );
}
export default Signup;
