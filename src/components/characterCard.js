import {Button, Col, Divider, Form, Row, Space} from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, {useEffect, useState} from "react";
import {AiFillQuestionCircle, AiOutlineReload} from "react-icons/ai";
import "./index.css";
import {addBreakLine} from "../utils/utility";
import {API_URL} from "../config/constants";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

export function CharacterCard(props) {
	const character = props.character;
	const navigate = useNavigate();
	const process = ["미진행", "진행중", "완료"];
	const [selected, setSelected] = useState([]);

	const handleChange = (tag, checked) => {
		setSelected([tag]);
		axios.post(`${API_URL}/member/character/progress`, {
			gpid: character.gpid,
			cid: character.cid,
			progress: tag
		}).then(

		).catch(
			(error) => {
				console.log(error)
			});
	};

	useEffect(() => {
		if(character.progress === null || character.progress === "미진행"){
			setSelected(["미진행"]);
		}else if(character.progress === "진행중"){
			setSelected(["진행중"]);
		}else if(character.progress === "완료") {
			setSelected(["완료"]);
		}
	}, [character])

	return (
		<div className="space-align-container" style={{width:"100%"}}>
			<div className="space-align-block" style={{width:"100%"}}>
				<Space align="center" style={{width:"100%"}}>
					<img
						style={{width:"auto", maxHeight:"200px", marginRight:"12px"}}
						// src={API_IMG_URL + character.pic_dir}
					/>
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
							<Button type="button" onClick={(e) => {navigate("/characters/update", {state :{character: character}})}} icon={<AiOutlineReload />} size={"small"}>
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