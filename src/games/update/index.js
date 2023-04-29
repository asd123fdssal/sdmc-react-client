import {
	Form,
	Divider,
	Input,
	InputNumber,
	Button,
	Upload,
	message,
	DatePicker,
	AutoComplete,
	Space,
} from "antd";
import "./index.css";
import React, {useEffect, useState} from "react";
import {API_IMG_URL, API_URL, DEBUG_MODE} from "../../config/constants";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { WithContext as ReactTags } from 'react-tag-input';
import CheckableTag from "antd/es/tag/CheckableTag";
import {Navigate, useLocation} from "react-router-dom";
import dayjs from "dayjs";

export function GameUpdatePage() {
	const utc = require('dayjs/plugin/utc')
	const timezone = require('dayjs/plugin/timezone')
	dayjs.extend(utc)
	dayjs.extend(timezone)

	const location = useLocation();
	const {games, shop, genres} = location.state;
	const [form] = Form.useForm();
	const [gameInfo, setGameInfo] = useState({
		                                         id: games.id,
		                                         org_name: games.org_name,
		                                         kor_name: games.kor_name,
		                                         synopsis: games.synopsis,
		                                         hookcode: games.hookcode,
		                                         etc: games.etc,
	                                         });
	const [imageUrl, setImageUrl] = useState(null);
	const [relDate, setRelDate] = useState(null);
	const [compOption, setCompOption] = useState([]);
	const [newCompVal, setNewCompVal] = useState('');
	const [newOrgCompVal, setNewOrgCompVal ] = useState('');
	const [seriOption, setSeriOption] = useState([]);
	const [newSerVal, setNewSerVal] = useState('');
	const [newSerTag, setNewSerTag] = useState([]);
	const [newGenre, setNewGenre] = useState('');
	const [genreOption, setGenreOption] = useState([]);
	const [selectedTag, setSelectedTag] = useState(genres);
	const [shopOption, setShopOption] = useState([]);
	const [newShop, setNewShop] = useState('');
	const [nickTag, setNickTag] = useState([]);
	const [redirectId, setRedirectId] = useState('');
	const delimiters = [13];

	const formItemChange = (e) => {
		const {id, value } = e.target;
		setGameInfo({...gameInfo, [id]: value});
	}

	const handleDelete = i => {
		setNewSerTag(newSerTag.filter((tag, index) => index !== i));
	};

	const handleAddition = tag => {
		tag.className="tags-child";
		setNewSerTag([...newSerTag, tag]);
	};

	const handleDeleteNick = i => {
		setNickTag(nickTag.filter((tag, index) => index !== i));
	};

	const handleAdditionNick = tag => {
		tag.className="tags-child";
		setNickTag([...nickTag, tag]);
	};

	const handleChangeGenre = (tag, checked) => {
		const nextSelectedTags = checked
		                         ? [...selectedTag, tag]
		                         : selectedTag.filter((t) => t.value !== tag.value);
		setSelectedTag(nextSelectedTags);
	};

	const onFinish = (values) => {
		axios.post(`${API_URL}/games/update`, {
			id: games.id,
			gameInfo: gameInfo,
			company: values.company?values.company:games.company,
			series: values.series?values.series:games.series,
			imageUrl: imageUrl?imageUrl:games.img_dir,
			release_date: relDate?relDate:games.release_date,
			genre: selectedTag.length ===0? null:selectedTag,
			nickname: nickTag.length ===0? null:nickTag,
			shop: values.shop?values.shop:shop
		}).then((res) => {
			message.info(res.data.message);
			setRedirectId(games.id);
		}).catch((err) => {
			message.error(err.response.data.message);
		})
	};

	const onClickNewCompany = () => {
		axios.post(`${API_URL}/company/upload`, {
			kor_name: newCompVal,
			org_name: newOrgCompVal
		}).
		then(res => {
			message.info(res.data.message);
			updateCompanyList();
			toggleAddCompany();
		}).catch((err) => {
			message.error(err.response.data.message);
		});
	};

	const onClickNewSeries = () => {
		axios.post(`${API_URL}/series/upload`, {
			kor_name: newSerVal,
			nickname: newSerTag
		}).then(res => {
			message.info(res.data.message);
			updateSeriesList();
			toggleAddSeries();
		}).catch((err) => {
			message.error(err.response.data.message);
		});
	};

	const onClickNewGenre = () => {
		axios.post(`${API_URL}/genres/upload`, {
			kor_name: newGenre
		}).then(res => {
			message.info(res.data.message);
			updateGenreList();
			toggleAddGenre();
		}).catch((err) => {
			message.error(err.response.data.message);
		});
	}

	const onClickNewShop = () => {
		axios.post(`${API_URL}/shops/upload`, {
			kor_name: newShop
		}).then(res => {
			message.info(res.data.message);
			updateShopList();
			toggleAddShop();
		}).catch((err) => {
			message.error(err.response.data.message);
		});
	}

	const updateGenreList = () => {
		axios.get(`${API_URL}/api/genre/all`).then(res => {
			setGenreOption(res.data);
		});
	}

	const updateCompanyList = () => {
		axios.get(`${API_URL}/api/company/all`).then(res => {
			setCompOption(res.data);
		});
	};

	const updateSeriesList = () => {
		axios.get(`${API_URL}/api/series/all`).then(res => {
			setSeriOption(res.data);
		});
	}

	const updateShopList = () => {
		axios.get(`${API_URL}/api/shops/all`).then(res => {
			setShopOption(res.data);
		});
	}

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			return;
		}
		if (info.file.status === "done") {
			const res = info.file.response;
			setImageUrl(res.imageUrl);
		}
	};

	const toggleAddCompany = () => {
		const addComp = document.getElementById("add-company");
		addComp.style.display = (addComp.style.display === "none" ? "block" : "none");
	};

	const toggleAddShop = () => {
		const addShop = document.getElementById("add-shop");
		addShop.style.display = (addShop.style.display === "none" ? "block" : "none");
	};

	const toggleAddSeries = () => {
		const addSer = document.getElementById("add-series");
		addSer.style.display = (addSer.style.display === "none" ? "block" : "none");
	}

	const toggleAddGenre = () => {
		const addGen = document.getElementById("add-genre");
		addGen.style.display = (addGen.style.display === "none" ? "block" : "none");
	}

	useEffect(() => {
		updateCompanyList();
		updateSeriesList();
		updateShopList();
		updateGenreList();
		setImageUrl(games.img_dir);
		setNickTag(games.nickname.split(",").map((value) => {return {id: value, text:value}}));
	}, []);

	if(redirectId !== undefined && redirectId !== ''){
		const url = "/games/titles/" + redirectId
		return <Navigate to={url} />
	}

	return (
		<Form
			form={form}
			name="game-upload-form"
			initialValues={{ remember: false }}
			onFinish={onFinish}
			autoComplete="off"
			style={{margin:"12px"}}
		>
			<Form.Item name="upload-images" label="게임 이미지">
				<Upload
					name="image"
					listType="picture"
					showUploadList={false}
					onChange={handleChange}
				>
					<img
						src={DEBUG_MODE?"":API_IMG_URL + imageUrl}
						alt="게임 썸네일"
						style={{ maxHeight: "400px" }}
					/>
				</Upload>
			</Form.Item>

			<Divider />

			<Form.Item label="제목 (원어)" name="org_name">
				<Input id="org_name" showCount maxLength={50} onChange={formItemChange} defaultValue={games.org_name} />
			</Form.Item>

			<Divider />

			<Form.Item label="제목 (한글)" name="kor_name">
				<Input id="kor_name" showCount maxLength={50} onChange={formItemChange} defaultValue={games.kor_name} />
			</Form.Item>

			<Divider />
			<Form.Item label="발매일">
				<DatePicker
					defaultValue={dayjs.tz(games.release_date, 'Asia/Seoul')}
					onChange={(date) => {setRelDate(dayjs(date, 'YYYY-MM-DD'));}}
				/>
				<span style={{ paddingLeft: 30 }}>
                    * YYYY-MM-DD 형식으로 입력
                </span>
			</Form.Item>
			<Divider />
			<Form.Item label="제작사(한글)" name="company">
				<AutoComplete
					defaultValue={games.company}
					options={compOption}
					listHeight={90}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					} />
			</Form.Item>
			<span onClick={toggleAddCompany} style={{color:"#3F568B", cursor:"pointer"}}>* 제작사를 추가하고 싶습니다.</span>

			<Divider />
			<div id="add-company">
				<div style={{fontSize:"18px", marginBottom:"12px", display:"flex"}}>
					<a style={{marginRight:"12px"}}>제작사 추가</a>
					<Button type="primary" onClick={onClickNewCompany}>추가</Button>
				</div>
				<Form.Item label="제작사 (원어)" name="add_comp_kor_name">
					<Input showCount maxLength={20} onChange={(e) => {setNewOrgCompVal(e.target.value)}} />
				</Form.Item>
				<Form.Item label="제작사 (한글)" name="add_comp_org_name">
					<Input showCount maxLength={20} onChange={(e) => {setNewCompVal(e.target.value)}}  />
				</Form.Item>
				<Divider />
			</div>

			<Form.Item label="시리즈" name="series">
				<AutoComplete
					options={seriOption}
					defaultValue={games.series}
					listHeight={90}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
				/>
			</Form.Item>
			<span onClick={toggleAddSeries} style={{color:"#3F568B", cursor:"pointer"}}>* 시리즈를 추가하고 싶습니다.</span>
			<Divider />

			<div id="add-series">
				<div style={{fontSize:"18px", marginBottom:"12px", display:"flex"}}>
					<a style={{marginRight:"12px"}}>시리즈 추가</a>
					<Button type="primary" onClick={onClickNewSeries}>추가</Button>
				</div>
				<Form.Item label="시리즈 (한글)" name="add_series_kor_name">
					<Input id="add_new_genre_input" showCount maxLength={20} onChange={(e) => {setNewSerVal(e.target.value)}} />
				</Form.Item>
				<Form.Item
					label="태그 (별칭)"
				>
					<ReactTags
						id="tags-input"
						className="tag"
						tags={newSerTag}
						delimiters={delimiters}
						handleDelete={handleDelete}
						handleAddition={handleAddition}
						placeholder="엔터로 태그 구분"
						inputFieldPosition="bottom"
					/>
				</Form.Item>

				<Divider />
			</div>

			<Form.Item label="장르" name="nickname">
				<Space size={[0, 8]} wrap>
					{genreOption.map((tag) => (
						<CheckableTag
							key={tag.value}
							checked={selectedTag.some((genre) => tag.value === genre.value)}
							onChange={(checked) => handleChangeGenre(tag, checked)}
						>
							{tag.value}
						</CheckableTag>
					))}
				</Space>
			</Form.Item>
			<span onClick={toggleAddGenre} style={{color:"#3F568B", cursor:"pointer"}}>* 장르를 추가하고 싶습니다.</span>
			<Divider />

			<div id="add-genre">
				<div style={{fontSize:"18px", marginBottom:"12px", display:"flex"}}>
					<a style={{marginRight:"12px"}}>장르 추가</a>
					<Button type="primary" onClick={onClickNewGenre}>추가</Button>
				</div>
				<Form.Item label="장르명" name="add_genre_kor_name">
					<Input showCount maxLength={10} onChange={(e) => {setNewGenre(e.target.value)}} />
				</Form.Item>
				<Divider />
			</div>

			<Form.Item label="구매처" name="shop">
				<AutoComplete
					options={shopOption}
					defaultValue={shop.kor_name}
					listHeight={90}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
				/>
			</Form.Item>
			<span onClick={toggleAddShop} style={{color:"#3F568B", cursor:"pointer"}}>* 구매처를 추가하고 싶습니다.</span>
			<Divider />

			<div id="add-shop">
				<div style={{fontSize:"18px", marginBottom:"12px", display:"flex"}}>
					<a style={{marginRight:"12px"}}>구매처 추가</a>
					<Button type="primary" onClick={onClickNewShop}>추가</Button>
				</div>
				<Form.Item label="구매처" name="add_shop_kor_name">
					<Input showCount maxLength={20} onChange={(e) => {setNewShop(e.target.value)}} />
				</Form.Item>
				<Divider />
			</div>

			<Form.Item label="줄거리" name="synopsis">
				<TextArea
					id="synopsis"
					showCount
					onChange={formItemChange}
					defaultValue={games.synopsis}
					maxLength={1000}
					style={{ height: 220, resize: "none" }}
				/>
			</Form.Item>
			<Divider />
			<Form.Item label="후킹코드" name="hookcode">
				<Input id="hookcode" defaultValue={games.hookcode} onChange={formItemChange} showCount maxLength={300} />
			</Form.Item>
			<Divider/>
			<Form.Item
				label="별칭(줄임말)"
				name="nickname"
			>
				<ReactTags
					id="tags-input"
					className="tag"
					tags={nickTag}
					delimiters={delimiters}
					handleDelete={handleDeleteNick}
					handleAddition={handleAdditionNick}
					placeholder="엔터로 태그 구분"
					inputFieldPosition="bottom"
				/>
			</Form.Item>

			<Divider />

			<Form.Item label="비고" name="etc">
				<TextArea
					id="etc"
					showCount
					onChange={formItemChange}
					defaultValue={games.etc}
					maxLength={200}
					style={{ height: 100, resize: "none" }}
				/>
			</Form.Item>

			<Form.Item>
				<Button className="buttons" type="primary" htmlType="submit">
					등록
				</Button>
			</Form.Item>
		</Form>
	);
}
