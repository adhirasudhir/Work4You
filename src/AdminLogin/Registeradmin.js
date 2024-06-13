import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adddata } from '../reducer/ContextProvider';
import image from "../image/login.jpg";

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { setUdata } = useContext(adddata);
    const navigate = useHistory();


    const [inpval, setINP] = useState({
        email: "",
        password: "",
        cpassword: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { email, password, cpassword } = inpval;

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/admin-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    cpassword
                })
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                console.log("error");
                alert("Please fill out all fields correctly.");
                navigate("/register");
            } else {
                setUdata(data);
                console.log("registered");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section className="contactus-section" style={{ marginTop: "10rem", marginBottom: "15rem" }}>
            <div className="container">
                <div className="row card-5" style={{ margin: "0rem 2rem", padding: "2rem 2rem" }}>
                    <div className="col-md-6 col-lg-6">
                        <h1 style={{ fontWeight: "bold" }}>Sign Up</h1>
                        <br />
                        <form method='POST' onSubmit={addinpdata}>
                            <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                <i className="fa fa-envelope icon"></i>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    id='email'
                                    autoComplete='off'
                                    value={inpval.email}
                                    onChange={setdata}
                                />
                            </div>
                            <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                <i className="fa fa-key icon"></i>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    id='password'
                                    autoComplete='off'
                                    value={inpval.password}
                                    onChange={setdata}
                                />
                            </div>
                            <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                <i className="fa fa-lock icon" style={{ fontSize: "24px" }}></i>
                                <input
                                    className="input-field"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="cpassword"
                                    id='cpassword'
                                    autoComplete='off'
                                    value={inpval.cpassword}
                                    onChange={setdata}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark" id="signup" style={{ marginTop: "2rem" }}>Register</button>
                        </form>
                    </div>
                    <div className="col-md-6 col-lg-6" style={{ padding: "4rem" }}>
                        <center>
                            <img src={image} className="img-fluid" style={{ width: "400px" }} alt="login" />
                        </center>
                        <center>
                            <Link to="/loginadmin" style={{ textDecoration: "none" }}>I already have an account</Link>
                        </center>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
