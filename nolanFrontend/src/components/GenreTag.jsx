/** @format */
import React, { useRef, useEffect, createContext, useContext } from "react";
import "@yaireo/tagify/dist/tagify.css";
import Tagify from "@yaireo/tagify";
import { AiEditorContext } from "../pages/AiEditor";

function GenreTag() {
	const inputRef = useRef(null);
	const {
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
	} = useContext(AiEditorContext);

	useEffect(() => {
		const tagify = new Tagify(inputRef.current, {
			whitelist: [
				"Action",
				"Adventure",
				"Comedy",
				"Crime",
				"Drama",
				"Fantasy",
				"Horror",
				"Mystery",
				"Romance",
				"Thriller",
				"Sci-Fi",
				"Western",
			],
			maxTags: 5,
			dropdown: {
				maxItems: 12,
				classname: "tags-look",
				enabled: 0,
				closeOnSelect: false,
			},
		});

		tagify.on("change", (e) => {
			const tags = tagify.value.map((tag) => tag.value);
			console.log("All selected tags:", tags);
			setGenre(tags);
		});

		return () => {
			tagify.destroy();
		};
	}, []);

	return (
		<div class='w-full'>
			<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5'>
				<label class='form-label max-w-32'>Select Genres</label>
				<input className='input select  min-w-[500px]' ref={inputRef} />
			</div>
			<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-1'>
				<label class='form-label max-w-32'>Select Format</label>
				<select
					class='select min-w-[500px]'
					name='select'
					onChange={(e) => setFormat(e.target.value)}>
					<option value='Animation'>Animation</option>
					<option value='Crime'>Crime</option>
					<option value='Reality'>Reality</option>
					<option value='Sitcom'>Sitcom</option>
					<option value='TV Series'>TV Series</option>
					<option value='Mini Series'>Mini Series</option>
				</select>
			</div>
			<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-1'>
				<label class='form-label max-w-32'>Select Language</label>
				<select
					class='select min-w-[500px]'
					name='select'
					onChange={(e) => setLanguage(e.target.value)}>
					<option value='English'>English</option>
					<option value='Spanish'>Spanish</option>
					<option value='French'>French</option>
				</select>
			</div>
			<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-1'>
				<label class='form-label max-w-32'>Overview</label>
				<textarea
					class='textarea min-w-[500px]'
					name='memo'
					placeholder='Text'
					rows='2'
					value={overview}
					onChange={(e) => setOverview(e.target.value)}></textarea>
			</div>
			<div class='flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-1'>
				<label class='form-label max-w-32'>Characters Setup</label>
				<textarea
					class='textarea min-w-[500px]'
					name='memo'
					placeholder='Text'
					rows='2'
					value={charactersSetup}
					onChange={(e) => setCharactersSetup(e.target.value)}></textarea>
			</div>
		</div>
	);
}

export default GenreTag;
