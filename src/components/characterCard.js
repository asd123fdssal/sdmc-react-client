import {Button, Col, Divider, Form, Row, Space} from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, {useState} from "react";
import {AiFillQuestionCircle, AiOutlineReload} from "react-icons/ai";
import "./index.css";
import {addBreakLine} from "../utils/utility";
import {API_IMG_URL} from "../config/constants";

export function CharacterCard(props) {
	const character = props.character;
	const process = ["미진행", "진행중", "완　료"];
	const [selected, setSelected] = useState([]);

	const handleChange = (tag, checked) => {
		setSelected([tag]);
	};

	return (
		<div className="space-align-container" style={{width:"100%"}}>
			<div className="space-align-block" style={{width:"100%"}}>
				<Space align="center" style={{width:"100%"}}>
					<img style={{width:"auto", maxHeight:"200px", marginRight:"12px"}} src={API_IMG_URL + character.pic_dir}/>
					<div style={{marginRight:"12px"}}>
						<span>{character.kor_name}</span>
						<br/>
						<br/>
						<span>{character.org_name}</span>
					</div>
					<div style={{marginRight:"12px"}}>
						<Space size={[10, 8]} wrap>
							{process.map((tag) => (
								<CheckableTag
									key={tag}
									checked={selected.includes(tag)}
									onChange={(checked) => handleChange(tag, checked)}
								>
									{tag}
								</CheckableTag>
							))}
							<Button style={{marginRight:"12px"}} onClick={(e) => {
								const stra = document.getElementById("strategy" + character.id)
								stra.style.display  = (stra.style.display === "none" ? "block" : "none");
							}} type="primary" icon={<AiFillQuestionCircle />} size={"small"}>
								공략
							</Button>
							<Button type="primary" icon={<AiOutlineReload />} size={"small"}>
								수정
							</Button>
						</Space>
					</div>
				</Space>
			</div>
			<div id={"strategy" + character.id} style={{display:"none"}}>
				<div style={{maxHeight:"220px", overflow:"auto"}}>
					{addBreakLine(character.strategy)}
				</div>
			</div>
			<Divider/>
		</div>
	);
}