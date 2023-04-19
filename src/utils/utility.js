import React from "react";

export const addBreakLine = (text) => {
	if(text){
		return (<p>
			{text.split("\n").map((txt) => (
				<>
					{txt}
					<br />
				</>
			))}
		</p>);
	}
}

export const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
};