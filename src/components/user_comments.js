import {Button, Divider, message, Space} from "antd";
import {API_IMG_URL, API_URL, DEBUG_MODE} from "../config/constants";
import CheckableTag from "antd/es/tag/CheckableTag";
import {AiFillDelete, AiFillQuestionCircle, AiOutlineReload} from "react-icons/ai";
import {addBreakLine} from "../utils/utility";
import React from "react";
import "./index.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function UserComments(props) {
	const comment = props.comment;
	const uid = props.uid;

	const deleteComments = () => {
		axios.delete(`${API_URL}/api/games/comments/delete`, {params: {cid : comment.id}})
			.then((res) => {
				message.info(res.data.message);
				props.onCustomEvent();
			}).catch((err) => {
				message.error(err);
		})
	}

	return (
		<div className="space-align-container" style={{width:"100%"}}>
			<div className="space-align-block" style={{width:"100%"}}>
				<Space align="center" style={{width:"100%"}}>
					<div style={{marginRight:"12px"}}>
						<span>{comment.nickname}</span>
					</div>
					<Divider type="vertical" />
					<div style={{marginRight:"12px"}}>
						<span>{comment.comment}</span>
					</div>
					{uid==comment.uid?
					<div style={{marginRight:"12px"}}>
						<Divider type="vertical" style={{marginRight:"12px"}} />
						<Button type="primary" onClick={deleteComments} icon={<AiFillDelete />} size={"small"}>
							삭제
						</Button>
					</div>
					:""}
				</Space>
			</div>
			<Divider />
		</div>
	);
}