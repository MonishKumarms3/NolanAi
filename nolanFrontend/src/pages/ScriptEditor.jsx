/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./ScriptEditor.css";
import ChatWidget from "../components/ChatWidget";

function ScriptEditor() {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [type, setType] = useState("1");
	const [description, setDescription] = useState("");
	const editorRef = useRef(null);
	const navigate = useNavigate();
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
	const toast = useRef(null);

	useEffect(() => {
		const fetchScript = async () => {
			if (id) {
				try {
					const response = await axios.get(`/scripts/${id}/`);
					const { title, type, description, content } = response.data;
					setTitle(title);
					setType(type);
					setDescription(description);
					editorRef.current.innerText = content;
				} catch (error) {
					console.error("Error fetching script:", error);
				}
			}
		};

		fetchScript();
	}, [id]);

	const handleContentChange = () => {
		const selection = window.getSelection();
		if (selection.toString()) {
			const range = selection.getRangeAt(0);
			const rect = range.getBoundingClientRect();
			setPopupPosition({ x: rect.left, y: rect.top - 40 });
			setPopupVisible(true);
		} else {
			setPopupVisible(false);
		}
	};

	const handleUndo = () => {
		document.execCommand("undo");
	};

	const handleRedo = () => {
		document.execCommand("redo");
	};

	const handleCopy = () => {
		document.execCommand("copy");
	};

	const handleSave = async () => {
		try {
			const response = await axios.put(`/scripts/${id}/`, {
				title,
				type,
				description,
				content: editorRef.current.innerText,
			});
			console.log("Script saved:", response.data);
			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: "Script saved successfully!",
				life: 3000,
			});
		} catch (error) {
			console.error("Error saving script:", error);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: "Failed to save script.",
				life: 3000,
			});
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`/scripts/${id}/`);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error deleting script:", error);
		}
	};

	const applyStyle = (command) => {
		document.execCommand(command);
	};

	const handleAIAction = async (action) => {
		const selectedText = window.getSelection().toString();
		if (!selectedText) return;

		try {
			let response;
			switch (action) {
				case "generateImage":
					response = await axios.post("/ai/generate-image/", {
						text: selectedText,
					});
					console.log("Generated Image URL:", response.data.url);
					break;
				case "fixGrammar":
					response = await axios.post("/ai/fix-grammar/", {
						text: selectedText,
					});
					console.log("Corrected Text:", response.data.correctedText);
					break;
				case "adjustTone":
					response = await axios.post("/ai/adjust-tone/", {
						text: selectedText,
						tone: "dark",
					});
					console.log("Adjusted Text:", response.data.adjustedText);
					break;
				default:
					break;
			}
		} catch (error) {
			console.error("AI action error:", error);
		}
	};

	return (
		<div className='editor-container'>
			<Toast ref={toast} />
			<div className='toolbar mt-20'>
				<i
					className='ki-duotone ki-arrow-circle-left text-black text-3xl'
					data-tooltip='#undo'
					data-tooltip-placement='bottom'
					onClick={handleUndo}></i>
				<div className='tooltip' id='undo'>
					Undo
				</div>

				<i
					className='ki-duotone ki-arrow-circle-right text-black text-3xl'
					data-tooltip='#redo'
					data-tooltip-placement='bottom'
					onClick={handleRedo}></i>
				<div className='tooltip' id='redo'>
					Redo
				</div>

				<i
					className='ki-duotone ki-file-up text-black text-3xl'
					data-tooltip='#upload'
					data-tooltip-placement='bottom'
					onClick={handleSave}></i>
				<div className='tooltip' id='upload'>
					Save
				</div>

				<i
					className='ki-duotone ki-copy text-black text-3xl'
					data-tooltip='#copy'
					data-tooltip-placement='bottom'
					onClick={handleCopy}></i>
				<div className='tooltip' id='copy'>
					Copy
				</div>

				<i
					className='ki-duotone ki-Delete-list text-black text-3xl'
					data-tooltip='#search'
					data-tooltip-placement='bottom'></i>
				<div className='tooltip' id='search'>
					Search
				</div>
				<i
					className='ki-filled ki-delete-files text-red-500 text-3xl'
					data-tooltip='#delete'
					data-tooltip-placement='bottom'
					onClick={handleDelete}></i>
				<div className='tooltip' id='delete'>
					Delete
				</div>
			</div>

			<input
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='input mt-40 max-w-[50%]'
			/>

			<select
				value={type}
				onChange={(e) => setType(e.target.value)}
				className='select mt-2 max-w-[50%]'>
				<option value='1'>Feature Film</option>
				<option value='2'>TV Show</option>
				<option value='3'>Social Media</option>
			</select>

			<input
				type='text'
				placeholder='Description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className='input mt-2 max-w-[50%]'
			/>

			<div
				className='editor'
				contentEditable
				ref={editorRef}
				onMouseUp={handleContentChange}
				placeholder='Start writing your script here...'></div>

			{popupVisible && (
				<div
					className='popup'
					style={{ top: popupPosition.y, left: popupPosition.x }}>
					<button onClick={() => applyStyle("bold")}>
						<i className='ki-outline ki-text-bold text-black text-3xl'></i>
					</button>

					<button onClick={() => applyStyle("italic")}>
						<i className='ki-outline ki-text-italic text-black text-3xl'></i>
					</button>

					<button onClick={() => applyStyle("underline")}>
						<i className='ki-outline ki-text-underline text-black text-3xl'></i>
					</button>

					<button onClick={() => applyStyle("strikeThrough")}>
						<i className='ki-outline ki-text-strikethrough text-black text-3xl'></i>
					</button>

					<button onClick={() => handleAIAction("generateImage")}>
						<i className='ki-outline ki-frame text-black text-3xl'></i>
					</button>
					<button onClick={() => handleAIAction("fixGrammar")}>
						<i className='ki-outline ki-pencil text-black text-3xl'></i>
					</button>
					<button onClick={() => handleAIAction("adjustTone")}>
						<select className='select' name='select'>
							<option value='dark'>Dark</option>
							<option value='sad'>Sad</option>
							<option value='comic'>Comic</option>
							<option value='horror'>Horror</option>
						</select>
					</button>
				</div>
			)}
			<ChatWidget />
		</div>
	);
}

export default ScriptEditor;
