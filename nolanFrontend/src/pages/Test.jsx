/** @format */

import React, { useRef, useEffect } from "react";
import "@yaireo/tagify/dist/tagify.css";
import Tagify from "@yaireo/tagify";

function Test() {
	const inputRef = useRef(null);
	const input2 = useRef(null);

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

		const tagify2 = new Tagify(input2.current, {
			whitelist: ["Ada", "Adenine", "Agda", "Agilent VEE"],
			maxTags: 10,
			dropdown: {
				maxItems: 20, // <- mixumum allowed rendered suggestions
				classname: "", // <- custom classname for this dropdown, so it could be targeted
				enabled: 0, // <- show suggestions on focus
				closeOnSelect: false, // <- do not hide the suggestions dropdown once an item has been selected
			},
		});

		tagify.on("change", (e) => {
			const tags = tagify.value.map((tag) => tag.value);
			console.log("All selected tags:", tags);
		});

		tagify2.on("change", (e) => {
			const tags = tagify2.value.map((tag) => tag.value);
			console.log("All selected tags:", tags);
		});

		return () => {
			tagify.destroy();
		};
	}, []);

	return (
		<div className='mt-20'>
			<input className='min-w-[500px]' ref={inputRef} />
			<input class='input select w-[500px]' ref={input2} />
		</div>
	);
}

export default Test;
