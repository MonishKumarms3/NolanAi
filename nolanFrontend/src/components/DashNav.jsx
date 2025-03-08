/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import script from "../assets/script.svg";
import login from "../assets/login.png";
import "./DashNav.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { logout } from "../redux/authSlice";

function DashNav() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	let profile = user ? user.profile_picture : null;

	const handleLogout = async () => {
		try {
			const refreshToken = localStorage.getItem("refresh_token");
			const accessToken = localStorage.getItem("token");
			console.log(refreshToken, accessToken);
			await axios.post("/auth/logout/", { refresh_token: refreshToken });
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<div className='dash-nav'>
			<div className='dash-nav__logo'>
				<img src={script} alt='logo' onClick={() => navigate("/dashboard")} />
			</div>
			<div className='dash-nav__menu'>
				<div className='menu menu-default flex flex-wrap justify-end gap-2.5 rounded-lg py-2'>
					<div className='menu-item'>
						<a className='menu-link' href='#'>
							<span className='menu-icon'>
								<i className='ki-filled ki-colors-square'></i>
							</span>
							<span className='menu-title'>Create AI Video</span>
						</a>
					</div>
					<div className='menu-item'>
						<a className='menu-link' href='/createScript'>
							<span className='menu-icon'>
								<i className='ki-filled ki-plus-circle'></i>
							</span>
							<span className='menu-title'>Start New Project</span>
						</a>
					</div>

					<div className='relative'>
						<img
							alt=''
							className='size-10 rounded-full cursor-pointer'
							src={profile ? profile : login}
							onClick={() => setDropdownVisible(!dropdownVisible)}
						/>
						{dropdownVisible && (
							<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
								<button
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
									onClick={handleLogout}>
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashNav;
