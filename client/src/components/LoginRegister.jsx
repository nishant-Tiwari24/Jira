import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Home from './Home';

export const LoginRegister = () => {
    const [username, setUsername] = useState("");
    const [rname, setRname] = useState("");
    const [remail, setRemail] = useState("");
    const [rpass1, setRpass1] = useState("");
    const [rpass2, setRpass2] = useState("");
    const [lemail, setLemail] = useState("");
    const [lpass1, setLpass1] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const [url, setUrl] = useState(process.env.REACT_APP_BACKEND_URL);

    React.useEffect(() => {
      // Check if user is logged in
      const loggedInCookie = Cookies.get('loggedIn');
      if (loggedInCookie) {
        setIsLoggedIn(true);
      }
    }, [isLoggedIn]);

    function panelchange(){
        const student_button = document.querySelector("#student_btn");
          const faculty_button = document.querySelector("#faculty_btn");
          const login = document.querySelector(".login");
    
          faculty_button.addEventListener("click", () => {
            login.classList.add("faculty-mode");
          });
    
          student_button.addEventListener("click", () => {
            login.classList.remove("faculty-mode");
          });

    }

    function extendform(){
        // login Registration form
        const login = document.querySelector(".login");
        const signup = document.querySelector(".signup_link");
        const log = document.querySelector(".login_link");
        signup.addEventListener("click", () => {
          login.classList.add("active");
        });
        log.addEventListener("click", () => {
          login.classList.remove("active");
        });
    
        const signup2 = document.querySelector(".signup2_link");
        const log2 = document.querySelector(".login2_link");
        signup2.addEventListener("click", () => {
          login.classList.add("active");
        });
        log2.addEventListener("click", () => {
          login.classList.remove("active");
        });
      }

      function showpassword (){
        //Password eye
        const showhidden = (Pass, Eye) => {
         const input = document.getElementById(Pass),
           iconEye = document.getElementById(Eye);
   
         iconEye.addEventListener("click", () => {
           if (input.type === "password") {
             input.type = "text";
             iconEye.classList.add("ri-eye-fill");
             iconEye.classList.remove("ri-eye-off-fill");
           } else {
             input.type = "password";
             iconEye.classList.remove("ri-eye-fill");
             iconEye.classList.add("ri-eye-off-fill");
           }
         });
       };

       showhidden("login-pass", "login-eye");
    showhidden("login-pass2", "login-eye2");
    showhidden("login-pass3", "login-eye3");
    showhidden("login-pass4", "login-eye4");
  }

  const signUp = async() =>{
    try {
      if(rpass1 == rpass2){
        const res = await axios.post(`${url}/user-register`,{username:rname,email:remail, password: rpass1});
        console.log(res);
      }
      else{
        throw Error("password not match");
      }
      enqueueSnackbar('Login successfull', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Password not match.', { variant: 'error' })
      console.log(error);
    }
  }

  const login = async() =>{
    try {
      const res = await axios.post(`${url}/user-login`, {email: lemail, password:lpass1});
      console.log("user");
      console.log(res);
      const uname = await res.data.username;
      console.log(uname);
      Cookies.set('loggedIn', uname, { expires: 1 });
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoggedIn) {
    return (
      <Home />
    );
  }

  return (
    <div>
    <div className="login">
      <img src="pexels-leeloo-the-first-8962477.jpg" alt="" className="back" />
      <div className="login_form">
        <div className="page_login">
          <form action="#" className="studentform forms-login Signin">
            <h2 className="title">Student Sign In</h2>
            <div className="loginContent">
              <div className="input-field">
                <i className="ri-mail-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="email"
                    required
                    className="login__input"
                    id="login-email"
                    placeholder=" "
                    onChange={(e)=>{setLemail(e.target.value)}}
                  />
                  <label for="login-email" className="login__label">Email</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="password"
                    required
                    className="login__input"
                    id="login-pass"
                    placeholder=" "
                    onChange={(e)=>{setLpass1(e.target.value)}}
                  />
                  <label for="login-pass" className="login__label">Password</label>
                  <i className="ri-eye-off-fill login_eye" id="login-eye" onClick={showpassword}></i>
                </div>
              </div>
            </div>
            <div className="login_check">
              <div className="check_box">
                <input type="checkbox" className="check_input" />
                <label for="check_input" className="check_label">Remember Me</label>
              </div>
              <a href="#" className="forget_password">Forget Password</a>
            </div>
            <Link to={`/project`}>
            <button onClick={login} type="submit" className="loginButton">Sign in</button>
            </Link>

            <p className="register">
              Don't have a account?
              <a href="#" className="signup_link" onClick={extendform}>Sign up Now</a>
            </p>
          </form>

          {/* <!-- RegisterForm --> */}
          <form action="#" className="studentform forms-login Signup">
            <h2 className="title">Student Sign Up</h2>
            <div className="loginContent">
              <div className="input-field">
                <i className="ri-user-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="text"
                    required
                    className="login__input"
                    id="login-name"
                    placeholder=" "
                    onChange={(e)=>{setRname(e.target.value)}}
                  />
                  <label for="login-name" className="login__label">Name</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-mail-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="email"
                    required
                    className="login__input"
                    id="login-email2"
                    placeholder=" "
                    onChange={(e)=>{setRemail(e.target.value)}}
                  />
                  <label for="login-email2" className="login__label">Email</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="text"
                    required
                    className="login__input"
                    id="login-pass"
                    placeholder=" "
                    onChange={(e)=>{setRpass1(e.target.value)}}
                  />
                  <label for="login-pass" className="login__label"
                    >Create Password</label
                  >
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="password"
                    required
                    className="login__input"
                    id="login-pass2"
                    placeholder=" "
                    onChange={(e)=>{setRpass2(e.target.value)}}
                  />
                  <label for="login-pass2" className="login__label"
                    >Confirm Password</label
                  >
                  <i className="ri-eye-off-fill login_eye" id="login-eye2" onClick={showpassword}></i>
                </div>
              </div>
            </div>
            <div className="login_check">
              <div className="check_box">
                <input type="checkbox" className="check_input" />
                <label for="check_input" className="check_label"
                  >I accept all terms & conditions</label
                >
              </div>
            </div>
            <button onClick={signUp} type="submit" className="loginButton">Sign up</button>
            <p className="register">
              Already have a account?
              <a href="#" className="login_link" onClick={extendform}>Sign in Now</a>
            </p>
          </form>

          {/* <!-- facultyform --> */}
          <form action="#" className="facultyform forms-login Signin">
            <h2 className="title">Teacher Sign In</h2>
            <div className="loginContent">
              <div className="input-field">
                <i className="ri-mail-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="email"
                    required
                    className="login__input"
                    id="login-email3"
                    placeholder=" "
                  />
                  <label for="login-email3" className="login__label">Email</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="password"
                    required
                    className="login__input"
                    id="login-pass3"
                    placeholder=" "
                  />
                  <label for="login-pass3" className="login__label">Password</label>
                  <i className="ri-eye-off-fill login_eye" id="login-eye3" onClick={showpassword}></i>
                </div>
              </div>
            </div>
            <div className="login_check">
              <div className="check_box">
                <input type="checkbox" className="check_input" />
                <label for="check_input" className="check_label">Remember Me</label>
              </div>
              <a href="#" className="forget_password">Forget Password</a>
            </div>
            <button type="submit" className="loginButton">Sign in</button>
            <div className="register">
              Don't have a account?
              <a href="#" className="signup2_link" onClick={extendform}>Sign up Now</a>
            </div>
          </form>

          <form action="#" className="facultyform forms-login Signup">
            <h2 className="title">Teacher Sign Up</h2>
            <div className="loginContent">
              <div className="input-field">
                <i className="ri-user-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="text"
                    required
                    className="login__input"
                    id="login-name2"
                    placeholder=" "
                  />
                  <label for="login-name2" className="login__label">Name</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-mail-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="email"
                    required
                    className="login__input"
                    id="login-email4"
                    placeholder=" "
                  />
                  <label for="login-email4" className="login__label">Email</label>
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="text"
                    required
                    className="login__input"
                    id="login-pass"
                    placeholder=" "
                  />
                  <label for="login-pass" className="login__label"
                    >Create Password</label
                  >
                </div>
              </div>
              <div className="input-field">
                <i className="ri-lock-2-fill login__icon"></i>
                <div className="box_input">
                  <input
                    type="password"
                    required
                    className="login__input"
                    id="login-pass4"
                    placeholder=" "
                  />
                  <label for="login-pass2" className="login__label"
                    >Confirm Password</label
                  >
                  <i className="ri-eye-off-fill login_eye" id="login-eye4" onClick={showpassword}></i>
                </div>
              </div>
            </div>
            <div className="login_check">
              <div className="check_box">
                <input type="checkbox" className="check_input" />
                <label for="check_input" className="check_label"
                  >I accept all terms & conditions</label
                >
              </div>
            </div>
            <button type="submit" className="loginButton">Sign up</button>
            <p className="register">
              Already have a account?
              <a href="#" className="login2_link" onClick={extendform}>Sign in Now</a>
            </p>
          </form>
        </div>
      </div>

      <div className="panels_cont">
        <div className="panel left-panel">
          <div className="content">
            <h3>Are you a Faculty?</h3>
            <p>Click on the below button to login as a Faculty</p>
            <button className="btn transparent" id="faculty_btn" onClick={panelchange}>Click Here</button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Are you a Student?</h3>
            <p>Click on the below button to login as a Student</p>
            <button className="btn transparent" id="student_btn" onClick={panelchange}>Click Here</button>
          </div>
        </div>
      </div>
    </div>

    <script src="animation.js"></script>
  </div>
  )
}
