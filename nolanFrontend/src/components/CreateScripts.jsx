/** @format */

import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
function CreateScript() {
	const [title, setTitle] = useState("");
	const [type, setType] = useState("1");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/scripts/", {
				title,
				type,
				description,
			});
			console.log("Script created:", response.data);

			setTitle("");
			setType("1");
			setDescription("");
		} catch (error) {
			console.error("Error creating script:", error);
		}
	};

	return (
		<>
			<button class='btn btn-success' data-modal-toggle='#modal_1_1'>
				<i class='ki-outline ki-plus-squared'></i>
				Create
			</button>
			<div className='modal' data-modal='true' id='modal_1_1'>
				<div className='modal-content max-w-[600px] top-[10%]'>
					<div className='modal-header'>
						<h3 className='modal-title'>Create a new project</h3>
						<button
							className='btn btn-xs btn-icon btn-light'
							data-modal-dismiss='true'>
							<i className='ki-outline ki-cross'></i>
						</button>
					</div>
					<div className='modal-body'>
						<p>
							Let’s start your project by giving it a memorable title. You can
							also add a cover for it later on.
						</p>
						<form onSubmit={handleSubmit}>
							<input
								className='input mt-4'
								placeholder='Title'
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<select
								className='select mt-4'
								name='select'
								value={type}
								onChange={(e) => setType(e.target.value)}>
								<option value='1'>Feature Film</option>
								<option value='2'>TV Show</option>
								<option value='3'>Social Media</option>
							</select>
							<label className='input input-lg mt-4 mt-7'>
								<input
									placeholder='Description'
									type='text'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</label>
							<div className='modal-footer justify-end'>
								<div className='flex gap-4'>
									<button
										className='btn btn-light'
										data-modal-dismiss='true'
										type='button'>
										Cancel
									</button>
									<button
										className='btn btn-primary'
										type='submit'
										data-modal-dismiss='true'>
										Create
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateScript;
