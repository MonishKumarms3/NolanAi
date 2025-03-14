/** @format */

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "../api/axios"; // Ensure this is your axios instance

function ChatWidget({ isOpen, setIsOpen, messages, setMessages }) {
	const [input, setInput] = useState("");

	const handleSendMessage = async () => {
		if (!input.trim()) return;

		// Add user message to chat
		setMessages((prevMessages) => [
			...prevMessages,
			{ sender: "user", text: input },
		]);

		try {
			const response = await axios.post("/ai/chatgpt/", { prompt: input });
			const aiResponse = response.data.correctedText;
			console.log(aiResponse);

			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "ai", text: aiResponse },
			]);
		} catch (error) {
			console.error("Error sending message:", error);
		}

		setInput("");
	};

	const handleCopy = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			alert("Copied to clipboard!");
		});
	};

	return (
		<div className='fixed bottom-5 right-5'>
			<button
				className='bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition'
				onClick={() => setIsOpen(!isOpen)}>
				<MessageCircle size={24} />
			</button>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					className='fixed bottom-16 right-5 h-96 w-96 bg-white shadow-xl rounded-lg p-4 border'>
					<div className='flex justify-between items-center mb-2'>
						<h2 className='font-bold text-lg'>Co-Pilot</h2>
						<button className='text-black' onClick={() => setIsOpen(false)}>
							<X size={20} />
						</button>
					</div>

					<div className='h-60 overflow-y-auto p-2 border rounded mt-2'>
						{messages.map((msg, index) => (
							<div key={index} className='mb-2'>
								{msg.sender === "ai" ? (
									<div className='flex items-start bg-gray-100 p-2 rounded'>
										<textarea
											id={`clipboard_${index}_target`}
											value={msg.text}
											readOnly
											className='w-full p-2 border rounded text-black resize-none overflow-hidden bg-white'
											rows={1}
											style={{ minHeight: "40px" }}
											onFocus={(e) => {
												e.target.style.height = "auto";
												e.target.style.height = `${e.target.scrollHeight}px`;
											}}
											onChange={(e) => {
												e.target.style.height = "auto";
												e.target.style.height = `${e.target.scrollHeight}px`;
											}}
										/>
										<button
											className='ml-2 text-black'
											onClick={() => handleCopy(msg.text)}>
											<i className='ki-outline ki-copy'></i>
										</button>
									</div>
								) : (
									<div className='text-sm p-2 rounded bg-blue-100 text-blue-800'>
										{msg.text}
									</div>
								)}
							</div>
						))}
					</div>
					<input
						type='text'
						placeholder='Type a message...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
						className='w-full p-2 border rounded mt-2 text-black'
					/>
				</motion.div>
			)}
		</div>
	);
}

export default ChatWidget;
