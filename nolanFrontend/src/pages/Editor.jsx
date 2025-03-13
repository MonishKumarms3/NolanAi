/** @format */

import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import axios from "../api/axios";
import { FaSpellCheck, FaPalette, FaImage } from "react-icons/fa";

function Editor() {
	const [value, setValue] = useState("");
	const [selectedText, setSelectedText] = useState("");
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
	const quillRef = useRef(null);

	const handleTextSelection = () => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			const selection = quill.getSelection();

			if (selection) {
				const selectedText = quill.getText(selection.index, selection.length);

				if (selectedText.trim()) {
					const bounds = quill.getBounds(selection.index, selection.length);

					setSelectedText(selectedText);
					setPopupPosition({
						x: bounds.left + bounds.width / 2,
						y: bounds.bottom + 20,
					});
					setPopupVisible(true);
				} else {
					setPopupVisible(false);
				}
			}
		}
	};

	const handleAIAction = async (action) => {
		try {
			let response;
			switch (action) {
				case "generateImage":
					response = await axios.post("/ai/generate-image/", {
						text: selectedText,
					});
					// Handle image generation
					break;
				case "fixGrammar":
					response = await axios.post("/ai/fix-grammar/", {
						text: selectedText,
					});
					replaceSelectedText(response.data.correctedText);
					break;
				case "adjustTone":
					response = await axios.post("/ai/adjust-tone/", {
						text: selectedText,
						tone: "dark",
					});
					replaceSelectedText(response.data.adjustedText);
					break;
			}
		} catch (error) {
			console.error("AI action error:", error);
		}
	};

	const replaceSelectedText = (newText) => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			const selection = quill.getSelection();

			if (selection) {
				quill.deleteText(selection.index, selection.length);
				quill.insertText(selection.index, newText);
			}
		}
	};

	const AIActionButtons = () => (
		<div className='flex space-x-2 bg-white rounded-lg p-2'>
			<button
				onClick={() => handleAIAction("fixGrammar")}
				className='popupButton'>
				<span>Fix Grammar</span>
			</button>
			<button
				onClick={() => handleAIAction("adjustTone")}
				className='popupButton'>
				<span>Adjust Tone</span>
			</button>
			<button
				onClick={() => handleAIAction("generateImage")}
				className='popupButton'>
				<span>Generate Image</span>
			</button>
		</div>
	);

	const toolbarOptions = [
		["bold", "italic", "underline", "strike"],
		[{ header: 1 }, { header: 2 }],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image"],
		[{ align: [] }],
		["clean"],
	];

	const module = {
		toolbar: toolbarOptions,
	};

	return (
		<div className='relative'>
			<ReactQuill
				ref={quillRef}
				modules={module}
				theme='snow'
				value={value}
				onChange={setValue}
				onChangeSelection={handleTextSelection}
			/>

			{popupVisible && popupPosition.x !== 0 && (
				<div
					style={{
						position: "absolute",
						left: `${popupPosition.x}px`,
						top: `${popupPosition.y}px`,
						zIndex: 1000,
					}}>
					<Tippy
						visible={true}
						content={<AIActionButtons />}
						placement='bottom'
						theme='light'
						interactive={true}>
						<div
							style={{
								width: "10px",
								height: "10px",
								position: "absolute",
							}}
						/>
					</Tippy>
				</div>
			)}
		</div>
	);
}

export default Editor;
