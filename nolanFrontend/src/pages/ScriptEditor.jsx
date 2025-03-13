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
import Editor from "./Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { marked } from "marked";

function ScriptEditor() {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [type, setType] = useState("1");
	const [description, setDescription] = useState("");
	const editorRef = useRef(null);
	const navigate = useNavigate();

	const toast = useRef(null);
	const [value, setValue] = useState("");

	const [selectedText, setSelectedText] = useState("");
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
	const quillRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);

	const toolbarOptions = [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],
		["link", "image", "video", "formula"],

		[{ header: 1 }, { header: 2 }],
		[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ direction: "rtl" }],

		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],

		["clean"],
	];

	const module = {
		toolbar: toolbarOptions,
	};

	useEffect(() => {
		const fetchScript = async () => {
			if (id) {
				try {
					const response = await axios.get(`/scripts/${id}/`);
					const { title, type, description, content } = response.data;
					setTitle(title);
					setType(type);
					setDescription(description);
					const htmlContent = marked(content);
					setValue(htmlContent);
				} catch (error) {
					console.error("Error fetching script:", error);
				}
			}
		};

		fetchScript();
	}, [id]);

	const handleSave = async () => {
		try {
			const response = await axios.put(`/scripts/${id}/`, {
				title,
				type,
				description,
				content: value,
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
						x: bounds.left + bounds.width / 2 + 350,
						y: bounds.bottom + 450,
					});
					setPopupVisible(true);
				} else {
					setPopupVisible(false);
				}
			}
		}
	};
	const handleAIAction = async (action, adjustTone = "None") => {
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
					setIsOpen(true);
					setMessages((prevMessages) => [
						...prevMessages,
						{ sender: "user", text: selectedText + " (fix grammar)" },
					]);

					response = await axios.post("/ai/fix-grammar/", {
						text: selectedText,
					});
					setMessages((prevMessages) => [
						...prevMessages,
						{ sender: "ai", text: response.data.correctedText },
					]);
					console.log("Corrected Text:", response.data.correctedText);
					break;
				case "adjustTone":
					setIsOpen(true);
					setMessages((prevMessages) => [
						...prevMessages,
						{
							sender: "user",
							text: selectedText + " (fix tone) " + adjustTone,
						},
					]);
					response = await axios.post("/ai/adjust-tone/", {
						text: selectedText,
						tone: adjustTone,
					});
					console.log("Adjusted Text:", response.data.correctedText);
					setMessages((prevMessages) => [
						...prevMessages,
						{ sender: "ai", text: response.data.correctedText },
					]);

					break;
				default:
					break;
			}
		} catch (error) {
			console.error("AI action error:", error);
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
				onClick={() => handleAIAction("generateImage")}
				className='popupButton'>
				<span>Generate Image</span>
			</button>
			<select
				class='select'
				name='select'
				value={"None"}
				onChange={(e) => {
					handleAIAction("adjustTone", e.target.value);
				}}>
				<option value='None'>Adjust Tone</option>
				<option value='Dark'>Dark</option>
				<option value='Light'>Light</option>
				<option value='Sad'>Sad</option>
				<option value='Horror'>Horror</option>
				<option value='Exciting'>Exciting</option>
				<option value='Comic'>Comic</option>
			</select>
		</div>
	);
	return (
		<div className='editor-container'>
			<Toast ref={toast} />
			<div className='toolbar mt-25'>
				<i
					className='ki-duotone ki-file-up text-green-500 text-3xl'
					data-tooltip='#upload'
					data-tooltip-placement='bottom'
					onClick={handleSave}></i>
				<div className='tooltip' id='upload'>
					Save
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

			<div className='editorContainer'>
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

			<ChatWidget
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				messages={messages}
				setMessages={setMessages}
			/>
		</div>
	);
}

export default ScriptEditor;
