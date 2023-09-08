import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import '../sass/style.scss'

const SignUp = () => {
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			acceptTerms: false,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("First Name is required"),
			lastName: Yup.string().required("Last Name is required"),
			email: Yup.string().email("Invalid email adress").required("Email is required"),
			password: Yup.string()
				.min(8, "Password must be at least 6 characters")
				.required("Password is required"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.required("Confirm Password is required"),
			acceptTerms: Yup.boolean().oneOf([true], "You must accept the Terms of Use"),
		}),
		onSubmit: (values, { resetForm }) => {
			axios
				.post("http://localhost:3001/accounts", values)
				.then((response) => {
					console.log("işlem başarılı oldu", response.data);
					resetForm();
				})
				.catch((error) => {
					console.error("İşlem başarısız oldu", error);
				});
		},
	});

	return (
		<>
			<section>
				<div className="main-box">
					<div className="form-box">
						<div className="title">
							<h1>Sign Up</h1>
						</div>
						<div className="form">
							<form onSubmit={formik.handleSubmit}>
								<div className="first-inputs">
									<input
										type="text"
										placeholder="First Name"
										name="firstName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.firstName}
									/>
									<input
										type="text"
										placeholder="Last Name"
										name="lastName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.lastName}
									/>
								</div>
								<div className="email">
									<input
										type="email"
										placeholder="Email"
										name="email"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>
								</div>
								<div className="password">
									<input
										type="password"
										placeholder="Password"
										name="password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
									/>
								</div>
								<div className="confirm-pass">
									<input
										type="password"
										placeholder="Confirm Password"
										name="confirmPassword"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.confirmPassword}
									/>
								</div>
								<div className="accept">
									<input
										type="checkbox"
										id="acceptTerms"
										name="acceptTerms"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.acceptTerms}
									/>
									<label htmlFor="acceptTerms">I accept Terms of Use</label>
								</div>
								<div className="button">
									<button type="submit">Sign Up</button>
								</div>
								<div className="signIn">
									<p>
										Already have account?{" "}
										<Link to="/signin">
											<span>Sign In</span>
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>

				{formik.touched.firstName && formik.errors.firstName ? (
					<div className="error-firstname">{formik.errors.firstName}</div>
				) : null}

				{formik.touched.lastName && formik.errors.lastName ? (
					<div className="error-lastname">{formik.errors.lastName}</div>
				) : null}

				{formik.touched.email && formik.errors.email ? (
					<div className="error-email">{formik.errors.email}</div>
				) : null}

				{formik.touched.password && formik.errors.password ? (
					<div className="error-password">{formik.errors.password}</div>
				) : null}

				{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
					<div className="error-confirmpassword">{formik.errors.confirmPassword}</div>
				) : null}

				{formik.touched.acceptTerms && formik.errors.acceptTerms ? (
					<div className="error-terms">{formik.errors.acceptTerms}</div>
				) : null}
			</section>
		</>
	);
};

export default SignUp;
