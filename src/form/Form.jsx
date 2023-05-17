import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Form = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showHome, setShowHome] = useState(false);
  const [data, setData] = useState("")

  const submitHandler = async (e) => {
    if (!name || !email || !password) {
      return toast.error("Fill the all fields", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      const { data } = await toast.promise(
        axios.post(`/api/user/signup`, { name, email, password }),
        {
          pending: "please wait",
          success: "completed",
          error: "error from server ",
        }
      );

      if (data) {
        setShowHome(true);
        setData(data)
      } else {
        res.status(400).send("user trying with same email id");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("signUp Problem");
    }
  };

  if(showHome){
    return (
      <div className="d-flex justify-content-center align-items-center text-white bg-primary vh-100 flex-column">
        <h1>name - {data.name}</h1>
        <h2>email - {data.email}</h2>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <section
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#17182f" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-12 col-lg-12 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black ">
                      <form>
                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            name
                          </label>
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={submitHandler}
                          >
                             fill the form
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
