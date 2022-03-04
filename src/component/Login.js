import axios from "axios";
import React,{useState,useEffect} from "react"
import { Link,useHistory } from "react-router-dom";
import "./login.css"
function Login(props){
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user,setUser]=useState([]);
  const history = useHistory();

  useEffect(()=>{
     axios.get(`http://localhost:5000/user`)
    .then((res)=>{
       setUser(res.data);
    })
    .catch((e)=>console.log(e))
  },[])
  const handleSubmit=async(e)=>{
    
      e.preventDefault();
console.log(user);
   user.find((x)=>{
       if(x.name===name && x.email===email && x.password===password){
         props.setISAuthorised(true);
         history.push('/dashboard');
         return true
       }
       else{
         setError("please check username and password is worng")
       }
       
   })
  }
    return(
        <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1>Login here 🚪</h1>
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
      <Link to="/signup">or signup</Link>
    </div>
    )
}
export default Login