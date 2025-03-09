/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function ScriptCards() {
	const [scripts, setScripts] = useState([]);
	const navigate = useNavigate();
	const scrollRef = useRef(null);

	useEffect(() => {
		const fetchScripts = async () => {
			try {
				const response = await axios.get("/scripts/");
				setScripts(response.data);
			} catch (error) {
				console.error("Error fetching scripts:", error);
			}
		};

		fetchScripts();
	});

	const getTypeString = (type) => {
		switch (type) {
			case "1":
				return "Feature Film";
			case "2":
				return "TV Show";
			case "3":
				return "Social Media";
			default:
				return "Unknown";
		}
	};

	const handleCardClick = (id) => {
		navigate(`/editor/${id}`);
	};

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	return (
		<div className='relative w-full'>
			<i
				class='ki-solid ki-double-left-arrow absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10'
				onClick={scrollLeft}></i>

			<div
				ref={scrollRef}
				className='flex overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar gap-4 px-12 mt-10'>
				{scripts.map((script) => (
					<div
						key={script.id}
						className='min-w-[300px] max-w-[400px] w-auto bg-white shadow-md rounded-lg border p-4 cursor-pointer flex flex-col'
						onClick={() => handleCardClick(script.id)}>
						<h1 className='text-lg font-bold text-black break-words'>
							{script.title}
						</h1>
						<h2 className='text-md font-semibold text-gray-700'>
							{getTypeString(script.type)}
						</h2>
						<p className='text-sm text-gray-600 break-words w-full'>
							{script.description}
						</p>
					</div>
				))}
			</div>

			<i
				class='ki-solid ki-double-right-arrow absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10'
				onClick={scrollRight}></i>

			<style>
				{`
					.no-scrollbar::-webkit-scrollbar {
						display: none;
					}
					.no-scrollbar {
						-ms-overflow-style: none;
						scrollbar-width: none;
					}
				`}
			</style>
		</div>
	);
}

export default ScriptCards;
