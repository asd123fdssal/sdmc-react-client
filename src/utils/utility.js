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