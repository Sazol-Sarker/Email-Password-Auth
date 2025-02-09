import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [errorMessage, SetErrorMessage] = useState("");
  const [lenPwdErrorMessage, SetLenPwdErrorMessage] = useState(false);
  const [comboPwdErrorMessage, SetComboPwdErrorMessage] = useState(false);
  const [successMsg, SetSuccessMsg] = useState(false);
  const [checkedRemember, setCheckedRemember] = useState(false);
  const [wannaSeePass, SetWannaSeePass] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    console.log(e.target.remember.checked);

    // set state of errors
    SetErrorMessage("");
    SetSuccessMsg(false);
    SetLenPwdErrorMessage(false);
    SetComboPwdErrorMessage(false);
    if (password.length < 6) SetLenPwdErrorMessage(true);
    // pwd regex check
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) SetComboPwdErrorMessage(true);

    if (!checkedRemember) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        SetSuccessMsg(true);

        // update profile data of user: name, photourl
        const profile = {
          displayName:name,
          photoURL:photoUrl
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("update profile successfull");
          })
          .catch((error) => {
            console.log("Error=> ", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
        SetErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <form onSubmit={formHandler} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            type="text"
            name="photoUrl"
            placeholder="photo Url"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <button
            onClick={() => SetWannaSeePass(!wannaSeePass)}
            className="absolute right-2 top-12"
          >
            {wannaSeePass ? (
              <FaEye className="text-2xl" />
            ) : (
              <FaEyeSlash className="text-2xl" />
            )}
          </button>
          <input
            type={wannaSeePass ? "text" : "password"}
            placeholder="password"
            name="password"
            className="input input-bordered"
            required
          />

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control ">
          <label className="cursor-pointer label justify-start ">
            <input
              onClick={() => setCheckedRemember(!checkedRemember)}
              name="remember"
              type="checkbox"
              className="checkbox checkbox-accent"
            />
            <span className="label-text p-4">Remember me</span>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>

      {
        // errorMessage&& <p className=" px-8 py-4 text-red-500">{errorMessage.split(':')[1].split('(')[0]}!</p>
        errorMessage && (
          <p className=" px-8 py-4 text-red-500">
            {errorMessage.split(":")[1]}!
          </p>
        )
      }

      {lenPwdErrorMessage && (
        <p className=" px-8 py-4 text-red-500">
          Error! Password length must be greater than equal 6
        </p>
      )}
      {comboPwdErrorMessage && (
        <p className=" px-8 py-4 text-red-500">
          Error! Password must contain a small, upper case, a digit and a
          special character
        </p>
      )}
      {successMsg && (
        <p className="text-green-500 text-xl font-bold">SignUp Successfull!</p>
      )}
      {!checkedRemember && (
        <p className="text-red-500 text-xl font-bold">
          Warning! check the remember box!!
        </p>
      )}
    </div>
  );
};

export default Signup;
