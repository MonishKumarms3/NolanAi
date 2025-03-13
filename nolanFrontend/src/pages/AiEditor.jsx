/** @format */
import GenreTag from "../components/GenreTag";
import { useState } from "react";
import { createContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AiEditorContext = createContext();
function AiEditor() {
	const [title, setTitle] = useState("");
	const [type, setType] = useState("1");
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState([]);
	const [format, setFormat] = useState("");
	const [language, setLanguage] = useState("English");
	const [overview, setOverview] = useState("");
	const [charactersSetup, setCharactersSetup] = useState("");
	const [teaserDesc, setTeaserDesc] = useState("");
	const [actOneDesc, setActOneDesc] = useState("");
	const [climaxDesc, setClimaxDesc] = useState("");
	let content;
	const navigate = useNavigate();

	const contextValue = {
		genre,
		setGenre,
		format,
		setFormat,
		language,
		setLanguage,
		overview,
		setOverview,
		charactersSetup,
		setCharactersSetup,
	};

	const handleAIAction = async () => {
		let response = await axios.post("/ai/create-scripts/", {
			title,
			type,
			genre,
			format,
			language,
			overview,
			charactersSetup,
			teaserDesc,
			actOneDesc,
			climaxDesc,
		});
		content = response.data.response;
		console.log("AI Action:", response.data);
	};

	const saveScript = async () => {
		try {
			const response = await axios.post("/scripts/", {
				title,
				type,
				description,
				content,
			});
			console.log("Script created:", response.data);

			setTitle("");
			setType("1");
			setDescription("");
			content = "";
			navigate("/dashboard");
		} catch (error) {
			console.error("Error creating script:", error);
		}
	};

	const handleSubmit = async () => {
		try {
			await handleAIAction();
			console.log("after ai");
			console.log(content);

			if (content) {
				await saveScript();
			}
		} catch (error) {
			console.error("Error in handleSubmit:", error);
		}
	};

	return (
		<div class='w-[50%] mt-20 mx-auto'>
			<div data-stepper='true'>
				<div class='card'>
					<div class='card-header flex justify-between items-center gap-4 py-8'>
						<div
							class='active flex gap-2.5 items-center'
							data-stepper-item='#stepper_1'>
							<div class='rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse'>
								<span
									class='stepper-item-completed:hidden'
									data-stepper-number='true'>
									1
								</span>
								<i class='ki-outline ki-check text-xl hidden stepper-item-completed:inline'></i>
							</div>
							<div class='flex flex-col gap-0.5'>
								<h4 class='text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600'>
									Step 1
								</h4>
								<span class='text-2sm text-gray-700 stepper-item-completed:text-gray-400'>
									General
								</span>
							</div>
						</div>
						<div
							class='flex gap-2.5 items-center'
							data-stepper-item='#stepper_2'>
							<div class='rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse'>
								<span
									class='stepper-item-completed:hidden'
									data-stepper-number='true'>
									2
								</span>
								<i class='ki-outline ki-check text-xl hidden stepper-item-completed:inline'></i>
							</div>
							<div class='flex flex-col gap-0.5'>
								<h4 class='text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600'>
									Step 2
								</h4>
								<span class='text-2sm text-gray-700 stepper-item-completed:text-gray-400'>
									Script info
								</span>
							</div>
						</div>
						<div
							class='flex gap-2.5 items-center'
							data-stepper-item='#stepper_3'>
							<div class='rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse'>
								<span
									class='stepper-item-completed:hidden'
									data-stepper-number='true'>
									3
								</span>
								<i class='ki-outline ki-check text-xl hidden stepper-item-completed:inline'></i>
							</div>
							<div class='flex flex-col gap-0.5'>
								<h4 class='text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600'>
									Step 3
								</h4>
								<span class='text-2sm text-gray-700 stepper-item-completed:text-gray-400'>
									Teaser
								</span>
							</div>
						</div>
						<div
							class='flex gap-2.5 items-center'
							data-stepper-item='#stepper_4'>
							<div class='rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse'>
								<span
									class='stepper-item-completed:hidden'
									data-stepper-number='true'>
									4
								</span>
								<i class='ki-outline ki-check text-xl hidden stepper-item-completed:inline'></i>
							</div>
							<div class='flex flex-col gap-0.5'>
								<h4 class='text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600'>
									Step 4
								</h4>
								<span class='text-2sm text-gray-700 stepper-item-completed:text-gray-400'>
									Act One
								</span>
							</div>
						</div>
						<div
							class='flex gap-2.5 items-center'
							data-stepper-item='#stepper_5'>
							<div class='rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse'>
								<span
									class='stepper-item-completed:hidden'
									data-stepper-number='true'>
									5
								</span>
								<i class='ki-outline ki-check text-xl hidden stepper-item-completed:inline'></i>
							</div>
							<div class='flex flex-col gap-0.5'>
								<h4 class='text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600'>
									Step 5
								</h4>
								<span class='text-2sm text-gray-700 stepper-item-completed:text-gray-400'>
									Climax
								</span>
							</div>
						</div>
					</div>
					<div class='card-body py-16'>
						<div class='' id='stepper_1'>
							<div class='flex items-center justify-center text-3xl font-semibold text-gray-900'>
								<div className='modal-body'>
									<p>
										Let’s start your project by giving it a memorable title. You
										can also add a cover for it later on.
									</p>
									<form>
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
									</form>
								</div>
							</div>
						</div>
						<div class='hidden' id='stepper_2'>
							<div class='flex items-center justify-center text-3xl font-semibold text-gray-900'>
								<div className='modal-body'>
									<AiEditorContext.Provider value={contextValue}>
										<GenreTag
											genre={genre}
											setGenre={setGenre}
											format={format}
											setFormat={setFormat}
											language={language}
											setLanguage={setLanguage}
										/>
									</AiEditorContext.Provider>
								</div>
							</div>
						</div>
						<div class='hidden' id='stepper_3'>
							<div class='flex items-center justify-center text-3xl font-semibold text-gray-900'>
								<div className='modal-body'>
									<div class='w-full'>
										<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5'>
											<label class='form-label max-w-32'>
												Describe your Teaser as detailed as you can.
											</label>
											<div class='flex flex-col w-full gap-1'>
												<textarea
													class='textarea min-w-[500px]'
													placeholder='Text'
													rows='6'
													value={teaserDesc}
													onChange={(e) => setTeaserDesc(e.target.value)}
												/>
												<span class='text-xs text-gray-500'>
													Set up your Teaser treatment. A brief, engaging scene
													or sequence at the beginning to hook the audience.
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class='hidden' id='stepper_4'>
							<div class='flex items-center justify-center text-3xl font-semibold text-gray-900'>
								<div className='modal-body'>
									<div class='w-full'>
										<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5'>
											<label class='form-label max-w-32'>
												Describe your Act One as detailed as you can.
											</label>
											<div class='flex flex-col w-full gap-1'>
												<textarea
													class='textarea min-w-[500px]'
													placeholder='Text'
													rows='6'
													value={actOneDesc}
													onChange={(e) => setActOneDesc(e.target.value)}
												/>
												<span class='text-xs text-gray-500'>
													Setup and inciting incident.
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class='hidden' id='stepper_5'>
							<div class='flex items-center justify-center text-3xl font-semibold text-gray-900'>
								<div className='modal-body'>
									<div class='w-full'>
										<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5'>
											<label class='form-label max-w-32'>
												Describe your Climax as detailed as you can.
											</label>
											<div class='flex flex-col w-full gap-1'>
												<textarea
													class='textarea min-w-[500px]'
													placeholder='Text'
													rows='6'
													value={climaxDesc}
													onChange={(e) => setClimaxDesc(e.target.value)}
												/>
												<span class='text-xs text-gray-500'>
													Setup Climax incident.
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='card-footer py-8 flex justify-between'>
						<div>
							<button
								class='btn btn-light stepper-first:hidden'
								data-stepper-back='true'>
								Back
							</button>
						</div>
						<div>
							<button
								class='btn btn-light stepper-last:hidden'
								data-stepper-next='true'>
								Next
							</button>
							<button
								class='btn btn-primary hidden stepper-last:inline-flex'
								onClick={handleSubmit}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AiEditor;
