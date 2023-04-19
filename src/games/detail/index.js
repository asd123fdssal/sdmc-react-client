import {Button, Col, Divider, Form, Row, Space} from "antd";
import {API_IMG_URL, API_URL} from "../../config/constants";
import "./index.css";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {CharacterCard} from "../../components/characterCard";
import {AiOutlineUserAdd, AiOutlineReload} from "react-icons/ai"
import {addBreakLine} from "../../utils/utility";

export function GameDetailPage(){
	const navigate = useNavigate();
	const [form] = Form.useForm();
	let { id } = useParams();
	const [games, setGames] = useState([]);
	const [shop, setShop] = useState([]);
	const [genreTag, setGenreTag] = useState([]);
	const [nickTag, setNickTag] = useState([]);
	const [characters, setCharacters] = useState([]);



	useEffect(() => {
		axios
			.get(`${API_URL}/games/titles/${id}`)
			.then((result) => {
				setShop(result.data.shop)
				setGames(result.data.games);
				setGenreTag(result.data.genres);
				setNickTag(result.data.nickname);
				setCharacters(result.data.characters);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const onFinish = (values) => {
		// axios.post(`${API_URL}/games/upload`, {
		// 	company: values.company,
		// 	series: values.series,
		// 	imageUrl: imageUrl,
		// 	release_date: relDate,
		// 	org_name: values.org_name,
		// 	kor_name: values.kor_name,
		// 	synopsis: values.synopsis,
		// 	hookcode: values.hookcode,
		// 	etc: values.etc,
		// 	genre: selectedTag,
		// 	nickname: nickTag,
		// 	shop: values.shop
		// }).then((res) => {
		// 	message.info(res.data.message);
		// 	setInsertFin(true);
		// }).catch((err) => {
		// 	message.error(err.response.data.message);
		// })
	};

	return (
		<Form
			form={form}
			name="game-view-form"
			initialValues={{ remember: false }}
			onFinish={onFinish}
			autoComplete="off"
			style={{position:"relative", backgroundColor: "#FCFCFC", width:"100%"}}
		>
			<div style={{width:"100%"}}>
				<div className="space-align-container" style={{width:"100%"}}>
					<div className="space-align-block" style={{width:"100%"}}>
						<Space align="center" style={{padding:"12px 8px 12px 8px"}}>
							<Button style={{paddingRight:"12px"}} onClick={(e) => {navigate('/characters/upload?title_id=' + id)}} type="primary" icon={<AiOutlineUserAdd />} size={"middle"}>
								캐릭터 추가
							</Button>
							<Button onClick={(e) => {navigate('/games/upload')}} type="primary" icon={<AiOutlineReload />} size={"middle"}>
								게임 수정
							</Button>
						</Space>
					</div>
				</div>
			</div>

			<div className="space-align-container" style={{width:"100%"}}>
				<div className="space-align-block" style={{width:"100%"}}>
					<Space align="center" style={{padding:"0px 8px 0px 8px", width:"100%"}}>
						<img
							src={API_IMG_URL + games.img_dir}
							alt="게임 썸네일"
							style={{ maxWidth: "100%", minWidth: "100px", height: "auto", paddingRight:"12px" }}
						/>
						<div style={{width:"100%"}}>
							<Space direction="vertical" size="middle" style={{ display: 'flex', width:"100%" }}>
								<Space direction="horizontal" size="middle" style={{ display: 'flex', width:"100%" }}>
									<span>게임명:</span>
									<Space direction="vertical" size="middle" style={{ display: 'flex', width:"100%" }}>
										<span>{games.kor_name}</span>
									</Space>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex', width:"100%" }}>
									<span>　 　　</span>
									<Space direction="vertical" size="middle" style={{ display: 'flex', width:"100%" }}>
										<span style={{wordBreak:"break-all"}}>{games.org_name}</span>
									</Space>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>발매일:</span>
									<span>{dayjs(games.release_date).format("YYYY-MM-DD")}</span>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>제작사:</span>
									<span>{games.company}</span>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>시리즈:</span>
									<span>{games.series}</span>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>장르:</span>
									<Space size={[0, 2]} wrap>
										{genreTag.map((tag) => (
											<CheckableTag
												key={tag.value}
												checked={true}
											>
												{tag.value}
											</CheckableTag>
										))}
									</Space>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>줄임말:</span>
									<Space size={[0, 8]} wrap>
										{nickTag.map((tag) => (
											<CheckableTag
												key={tag.value}
												checked={true}
											>
												{tag.value}
											</CheckableTag>
										))}
									</Space>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>구매처:</span>
									<span>{shop.kor_name}</span>
								</Space>
								<Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
									<span>코드:</span>
									<span>{games.hookcode}</span>
								</Space>
							</Space>
						</div>
					</Space>
				</div>
			</div>

			<Divider/>
			<Row style={{padding:"0 12px 0 12px", wordWrap:"break-word"}}>
				<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
					<span style={{fontSize:"18px"}} >시놉시스</span>
					{addBreakLine(games.synopsis)}
				</Space>
			</Row>
			<Divider/>
			<Row style={{padding:"0 12px 0 12px", wordWrap:"break-word"}}>
				<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
					<span style={{fontSize:"18px"}} >비고</span>
					{addBreakLine(games.etc)}
				</Space>
			</Row>
			<Divider/>
			<Row style={{padding:"0 12px 0 12px", wordWrap:"break-word"}}>
				<Space direction="vertical" size="middle" style={{ display: 'flex', width:"100%" }}>
					<span style={{fontSize:"18px"}} >캐릭터</span>
					<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
						{characters.map(function (character) {
							return <CharacterCard character={character} />;
						})}
					</Space>
				</Space>
			</Row>
		</Form>
	);
}