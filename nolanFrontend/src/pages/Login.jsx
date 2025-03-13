/** @format */

import "./Login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			try {
				dispatch(loginStart());

				const userInfo = await axios.get(
					"https://www.googleapis.com/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${response.access_token}`,
						},
					}
				);

				const backendResponse = await axios.post(
					"http://localhost:8000/api/auth/google/",
					{
						access_token: response.access_token,
						user_data: userInfo.data,
					}
				);

				localStorage.setItem("token", backendResponse.data.access_token);
				localStorage.setItem(
					"refresh_token",
					backendResponse.data.refresh_token
				);
				dispatch(loginSuccess(backendResponse.data.user));
				navigate("/dashboard");
			} catch (err) {
				dispatch(loginFailure(err.message));
				console.error("Login failed:", err);
			}
		},
		onError: (error) => {
			dispatch(loginFailure("Google login failed"));
			console.error("Google Login Error:", error);
		},
	});
	return (
		<div className='login-container'>
			<div className='login-content'>
				<div className='left-section'>
					<h1>LOG IN</h1>
					<div className='tagline'>
						<p>
							Unlock <span className='highlight'>the</span> full{" "}
							<span className='highlight'>NOLAN</span>
						</p>
						<p>Experience</p>
					</div>
				</div>

				<div className='right-section'>
					<h2>LOG IN</h2>

					<div className='login-buttons'>
						<button
							className='login-btn google-btn'
							onClick={() => handleGoogleLogin()}
							disabled={loading}>
							<i class='ki-filled ki-google'></i>
							{loading ? "Loading..." : "Continue with Google"}
						</button>
					</div>

					{error && <p className='error-message'>{error}</p>}

					<p className='terms'>
						By signing up, you agree to the
						<a href='#'> Terms of Service</a> and
						<a href='#'> Privacy Policy</a>.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
