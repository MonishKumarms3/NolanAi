/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateScript from "../components/CreateScripts";
import ScriptCards from "../components/ScriptCards";
import ChatWidget from "../components/ChatWidget";
import ReplyComp from "../components/ReplyComp";
function Dashboard() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	console.log(user);
	if (!user) {
		navigate("/login");
	}

	return (
		<div className='w-full mt-20 flex flex-col items-center justify-center px-4'>
			<div className='card w-full max-w-xl mx-auto shadow-lg rounded-lg'>
				<div className='card-body h-[200px] py-6 flex flex-col items-center justify-center text-center'>
					<div className='flex flex-col items-center'>
						<i className='ki-filled ki-files text-black text-6xl'></i>
						<h1 className='text-black font-bold text-3xl mt-4'>
							Start Your Project
						</h1>
					</div>

					<p className='text-black mt-4'>
						Every great story begins with a first scene. Set the stage for your
						pre-production project or create a video instantly.
					</p>
				</div>

				<div className='card-footer flex justify-center pb-4'>
					<CreateScript />
				</div>
			</div>

			<ScriptCards />
		</div>
	);
}

export default Dashboard;
