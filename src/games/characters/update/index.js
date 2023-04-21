import React, {useEffect, useState} from "react";
import {Button, DatePicker, Divider, Form, Input, message, Space, Upload} from "antd";
import {API_URL} from "../../../config/constants";
import {getBase64} from "../../../utils/utility";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";

export function CharacterUpdatePage() {
	const location = useLocation();
	const navigate = useNavigate();
	const character = location.state.character;
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const [insertFin, setInsertFin] = useState(false);
	const [orgName, setOrgName] = useState(character.org_name);

	useEffect(() => {
		console.log(character)
		setImageUrl(character.pic_dir);
	}, [])

	const onFinish = (values) => {
		axios.post(`${API_URL}/characters/update`, {
			cid: character.cid,
			imageUrl : imageUrl,
			kor_name : values.kor_name ? values.kor_name : character.kor_name,
			org_name : values.org_name ? values.org_name : character.org_name,
			strategy : values.strategy ? values.strategy : character.strategy
		}).then((res) => {
			message.info(res.data.message);
			navigate('/games/titles/' + character.games_id);
		}).catch((err) => {
			message.error(err.response.data.message);
		})
	}

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			return;
		}
		if (info.file.status === "done") {
			const res = info.file.response;
			setImageUrl(res.imageUrl);
			getBase64(info.file.originFileObj, (url) => {
				setThumbnail(url);
			});
		}
	};

	return (
		<Form
			form={form}
			name="character-update-form"
			initialValues={{ remember: false }}
			onFinish={onFinish}
			autoComplete="off"
			style={{margin:"12px"}}
		>
			<Form.Item name="upload-images" label="캐릭터 이미지">
				<Upload
					name="image"
					listType="picture"
					showUploadList={false}
					action={`${API_URL}/images`}
					onChange={handleChange}
				>
					<img
						// src={API_IMG__URL + character.pic_dir}
						alt="캐릭터 썸네일"
						style={{ maxWidth: "100%", minWidth: "100px", height: "auto", paddingRight:"12px" }}
					/>
				</Upload>
			</Form.Item>

			<Divider />

			<Form.Item label="이름 (원어)" name="org_name">
				<Input defaultValue={character.org_name} showCount maxLength={50} />
			</Form.Item>

			<Divider />

			<Form.Item label="이름 (한글)" name="kor_name">
				<Input defaultValue={character.kor_name} showCount maxLength={50} />
			</Form.Item>

			<Divider />

			<Form.Item label="공략" name="strategy">
				<TextArea
					showCount
					maxLength={1000}
					style={{ height: 220, resize: "none" }}
					defaultValue={character.strategy}
				/>
			</Form.Item>

			<Divider />

			<Form.Item>
				<Button className="buttons" type="primary" htmlType="submit">
					수정
				</Button>
			</Form.Item>
		</Form>
	);
}