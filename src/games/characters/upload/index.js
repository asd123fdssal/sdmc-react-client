import React, {useState} from "react";
import {Button, DatePicker, Divider, Form, Input, message, Space, Upload} from "antd";
import {API_URL} from "../../../config/constants";
import {getBase64} from "../../../utils/utility";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {Navigate, useLocation, useParams} from "react-router-dom";

export function CharacterUploadPage() {
	const title_id = (new URLSearchParams(useLocation().search)).get('title_id');
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const [insertFin, setInsertFin] = useState(false);

	const onFinish = (values) => {
		axios.post(`${API_URL}/characters/upload`, {
			title_id : title_id,
			imageUrl : imageUrl,
			kor_name : values.kor_name,
			org_name : values.org_name,
			strategy : values.strategy
		}).then((res) => {
			message.info(res.data.message);
			setInsertFin(true);
		}).catch((err) => {
			message.error(err.response.data.message);
		})
	}

	if(insertFin){
		return <Navigate to={"/games/titles/" + title_id} />
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

	const uploadButton = (
		<div>
			<img src="/images/default/camera.png" />
			<div style={{ marginTop: 8 }}>사진을 업로드해주세요.</div>
		</div>
	);

	return (
		<Form
			form={form}
			name="character-upload-form"
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
					{imageUrl ? (
						<img
							src={thumbnail}
							alt="게임 썸네일"
							style={{ maxHeight: "400px" }}
						/>
					) : (
						 uploadButton
					 )}
				</Upload>
			</Form.Item>

			<Divider />

			<Form.Item label="이름 (원어)" name="org_name">
				<Input showCount maxLength={50} />
			</Form.Item>

			<Divider />

			<Form.Item label="이름 (한글)" name="kor_name">
				<Input id="game_kor_name" showCount maxLength={50} />
			</Form.Item>

			<Divider />

			<Form.Item label="공략" name="strategy">
				<TextArea
					showCount
					maxLength={1000}
					style={{ height: 220, resize: "none" }}
				/>
			</Form.Item>

			<Divider />

			<Form.Item>
				<Button className="buttons" type="primary" htmlType="submit">
					등록
				</Button>
			</Form.Item>
		</Form>
	);
}