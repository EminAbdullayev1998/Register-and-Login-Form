import React from "react";
import "../sass/signin.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignIn = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email adress").required("Please enter email adress"),
			password: Yup.string().required("Please enter password"),
		}),
		onSubmit: async (values) => {
			try {
				const response = await axios.get("http://localhost:3001/accounts");
			
				if (response.data) {
				  if (Array.isArray(response.data)) {
					const { email, password } = values;
					const user = response.data.find((user) => user.email === email && user.password === password);
					
					if (user) {
					  alert("Successfully logged in");
					} else {
					  alert("Email or password incorrect");
					}
				  } else {
					console.error("API response is not an array");
				  }
				} else {
				  console.error("API response is empty");
				}
			  } catch (error) {
				console.error("An error occurred", error);
			  }
			},
	});

	return (
		<>
			<section>
				<div className="main-box">
					<div className="form-box">
						<div className="title">
							<h1>Sign In</h1>
						</div>
						<div className="form">
							<form onSubmit={formik.handleSubmit}>
								<div className="email">
									<input
										type="email"
										name="email"
										placeholder="Email..."
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>
								</div>
								<div className="password">
									<input
										type="password"
										name="password"
										placeholder="Password..."
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
									/>
								</div>
								<div className="button">
									<button type="submit">Login</button>
								</div>
							</form>
							<div className="notice">
								<p>
									Already have account?{" "}
									<Link to="/">
										<span>Sign Up</span>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>

				{formik.touched.email && formik.errors.email ? (
					<div className="error-email">{formik.errors.email}</div>
				) : null}

				{formik.touched.password && formik.errors.password ? (
					<div className="error-password">{formik.errors.password}</div>
				) : null}
			</section>
		</>
	);
};

export default SignIn;
