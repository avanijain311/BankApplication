import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
// import AuthContext from "./AuthContext";

const Login = () => {
  const navigateObject = new useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMyLogin = async (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      alert("Username or Password is empty");
      return;
    }

    // console.log(email,password);

    const response = await axios
      .post(
        `http://localhost:8080/api/v1/auth/authenticate`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        alert(err.message);
      });

    if (!response.data) {
      alert("Login Failed");
    }

    const response2 = await axios
      .get(`http://localhost:8080/api/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(response2);

    const username = response2.data.fname + " " + response2.data.lname;

    if (response2.data.role === "ADMIN") {
      navigateObject(
        `/admindashboard/${username}/${response2.data.role}/${response.data.token}`
      );
      console.log(response2.data.fname + " " + response2.data.lname);
      return;
    }

    navigateObject(
      `/userdashboard/${username}/${response2.data.role}/${response.data.token}/${response2.data.userId}`
    );
  };

  return (
    <>

    <section> 

    {/* <div className="container-fluid">
		<div className="row main-content  text-center">
			<div className="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2>Banking-App</h2>
					</div>
					<div className="row">
						<form control="" className="form-group">
							<div className="row">
								<input type="email"  id="username" className="form__input" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)}/>
							</div>
							<div className="row">
								
								<input type="password" name="password" id="password" className="form__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
							</div>
							
							<div className="row">
								<button type="submit" onClick={handleMyLogin} className="btn">Login in</button>
							</div>
						</form>
					</div>
					
				</div>
			</div>
		</div>
	</div> */}

<div class="global-container">
	<div class="card login-form">
	<div class="card-body">
		<h3 class="card-title text-center">Bank App</h3>
		<div class="card-text">
			<form>
				
				<div class="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" class="form-control form-control-sm" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
				
					<input type="password" class="form-control form-control-sm" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<button type="submit" onClick={handleMyLogin} class="btn btn-primary btn-block">Sign in</button>
				
				
			</form>
		</div>
	</div>
</div>
</div>




</section>
    </>
  );
};

export default Login;





