import { Link } from "react-router-dom";
import "../../App.css";
import "../home/css/Login.css";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Login() {
	const [isLogin, setIsLogin] = useState(false);
	const [logintrue, setLogintrue] = useState(false);

	const Chualogin = () => {
		const { register, handleSubmit, formState: { errors } } = useForm();
		const onSubmit = (data) => {
			var config = {
				method: "post",
				url: "http://localhost:8080/login",
				data: data
			};
			axios(config)
				.then(function (response) {
					console.log(response.data);
					if (response.data == '') {
						console.log("not ok");
						setLogintrue(true);

					} else {
						localStorage.setItem('ten@key', data.ten);
						window.location.reload(false);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		return (
			<>
				{/*<div className="form-container sign-up-container">
					 <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>

                        <label htmlFor="ten"></label>
                        <input type="text" name="ten" className="form-control" placeholder="Enter Name"{...register("ten", { required: true, maxLength: 20 })} />
                        <h style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.ten && "Tên không để trống và quá 20 kí tự!"}</h>

                        <label htmlFor="matkhau"></label>
                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" {...register("password", { required: true, maxLength: 20 })} />
                        <h style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.password && "Mật khẩu không để trống và quá 20 kí tự!"}</h>

                        <label htmlFor="ad"></label>
                        <input type="text" className="form-control" placeholder="Role" id="Role" defaultValue="user" {...register("ad", { required: true, maxLength: 20 })} />
                        <h style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.ad && "Không hợp lệ!"}</h>

                        <button>Sign Up</button>
                    </form> 
				</div>*/}
				{/* <div className="form-container sign-in-container"> */}
				{/* <form onSubmit={handleSubmit(onSubmit)}>
						<h1>Sign in</h1>
						<div className="social-container">
							<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
							<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
							<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
						</div>
						<span>or use your account</span>
						<label htmlFor="ten"></label>
						<input type="text" className="form-control" placeholder="Enter Name" {...register("ten", { required: true })} />
						<strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.ten && "Tên không để trống!"}</strong>

						<label htmlFor="matkhau"></label>
						<input type="password" className="form-control" placeholder="Enter password" {...register("matkhau", { required: true })} />
						<strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.matkhau && "Mật khẩu không để trống!"}</strong>
						{logintrue ? <LoginFalse /> : <LoginTrue />}
						<a href="#">Forgot your password?</a>
						<button type="submit">Sign In</button>
					</form> */}

				{/* </div> */}
				<div className="container">
					<div className="container-fluid h-custom">
						<div className="row d-flex justify-content-center align-items-center h-100" style={{ margin: "50px 0 0 0" }}>
							<div className="col-md-9 col-lg-6 col-xl-5">
								<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
									className="img-fluid" alt="Sample image" />
							</div>
							<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
										<p className="lead fw-normal mb-0 me-3">Sign in with</p>
										<button type="button" className="btn btn-primary btn-floating mx-1">
											<i className="fab fa-facebook-f"></i>
										</button>

										<button type="button" className="btn btn-primary btn-floating mx-1">
											<i className="fab fa-twitter"></i>
										</button>

										<button type="button" className="btn btn-primary btn-floating mx-1">
											<i className="fab fa-linkedin-in"></i>
										</button>
									</div>

									<div className="divider d-flex align-items-center my-4">
										<p className="text-center fw-bold mx-3 mb-0">Or</p>
									</div>

									<div className="form-outline mb-4">
										<input type="text" id="form3Example3" className="form-control form-control-lg"
											placeholder="Enter username" {...register("ten", { required: true })} />
										<strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.ten && "Tên không để trống!"}</strong>
									</div>

									<div className="form-outline mb-3">
										<input type="password" id="form3Example4" className="form-control form-control-lg"
											placeholder="Enter password" {...register("matkhau", { required: true })} />
										<strong style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>{errors.matkhau && "Mật khẩu không để trống!"}</strong>
									</div>
									{logintrue ? <LoginFalse /> : <LoginTrue />}

									<div className="d-flex justify-content-between align-items-center">
										<div className="form-check mb-0">
											<input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
											<label className="form-check-label" htmlFor="form2Example3">
												Remember me
											</label>
										</div>
										<a href="#!" className="text-body">Forgot password?</a>
									</div>

									<div className="text-center text-lg-start mt-4 pt-2">
										<button type="submit" className="btn btn-primary btn-lg"
											style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
										>Login</button>
										<p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
											className="link-danger">Register</a></p>
									</div>

								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
	// end Chualogin
	function Dalogin() {
		window.location.assign('http://localhost:3000/')
		return (

			<div>
				
			</div>
		)
	}
	useEffect(() => {
		var name = localStorage.getItem('ten@key');
		if (name !== undefined && name !== null) {
			setIsLogin(true);
		}
	})


	function LoginTrue() {
		return (
			<div>

			</div>
		)
	}

	function LoginFalse() {
		return (
			<div>
				<p style={{ color: 'red', fontWeight: '500', lineHeight: '10px', fontSize: '12px' }}>Sai tài khoản hoặc mật khẩu !</p>
			</div>
		)
	}

	return (
		<div>
			<div>
				<div>
					{isLogin ? <Dalogin /> : <Chualogin />}
				</div>
			</div>
		</div>
	);
}

// -----------------end login--------------------

export default Login;
