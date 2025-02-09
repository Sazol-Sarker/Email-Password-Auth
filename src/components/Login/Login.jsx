import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";

const Login = () => {
    const [successLogin,setSuccessLogin]=useState(false)
    const [errorMsgLogin,setErrorMsgLogin]=useState('')
    const emailRef=useRef();

    const handleLogin=(e)=>{
        e.preventDefault();
        const email=e.target.email.value;
        const pwd=e.target.password.value;
        console.log(email,pwd);

        setSuccessLogin(false);
        setErrorMsgLogin('')

        if(errorMsgLogin) return;
        // check firebase login data response
        signInWithEmailAndPassword(auth,email,pwd)
        .then(result=>{
            console.log(result.user);
            setSuccessLogin(true);
        })
        .catch(error=>{
            setSuccessLogin(false);
            setErrorMsgLogin(error.message);
            console.log(error.message);
        })

    }

    // handleForgotPassword
    const handleForgotPassword=()=>{
        const email=emailRef.current.value;
        if(email)
        {

            sendPasswordResetEmail(auth,email)
            .then(()=>{
                console.log('Password reset email sent!');
            })
            .catch(error=>{
                console.log(error.code,error.message);
            })
        }
        else{
            console.log('Enter a valid email First!');
        }
    }


  return (
    <div className="max-w-4xl mx-auto">
      {/* daisy ui login hero form */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email" ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgotPassword} className="label">
                <div className="">
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </div>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
            {
                successLogin&& <p className="text-lg text-green-600">Login Successfull! Welcome user!</p>
            }
            {
                errorMsgLogin&& <p className="text-xl font-bolf text-red-500">Invalid credentials!</p>
            }

          <div className="m-2 mx-auto">
            New User? Please <Link to="/register" className="text-blue-500 font-extrabold">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
