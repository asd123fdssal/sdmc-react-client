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
    Tag, Select, Space,
} from "antd";
import "./index.css";
import React, {useEffect, useState} from "react";
import { API_URL } from "../../config/constants";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { WithContext as ReactTags } from 'react-tag-input';
import CheckableTag from "antd/es/tag/CheckableTag";
import {Navigate} from "react-router-dom";
import {getBase64} from "../../utils/utility";

export function GameUploadPage() {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [relDate, setRelDate] = useState(null);
    const [compOption, setCompOption] = useState([]);
    const [newCompVal, setNewCompVal] = useState('');
    const [newOrgCompVal, setNewOrgCompVal ] = useState('');
    const [seriOption, setSeriOption] = useState([]);
    const [newSerVal, setNewSerVal] = useState('');
    const [newSerTag, setNewSerTag] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [genreOption, setGenreOption] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [shopOption, setShopOption] = useState([]);
    const [newShop, setNewShop] = useState('');
    const [nickTag, setNickTag] = useState([]);
    const [insertFin, setInsertFin] = useState(false);
    const [redirectId, setRedirectId] = useState('');
    const delimiters = [13];


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
                                 : selectedTag.filter((t) => t !== tag);
        setSelectedTag(nextSelectedTags);
    };

    const onFinish = (values) => {
        axios.post(`${API_URL}/games/upload`, {
            company: values.company,
            series: values.series,
            imageUrl: imageUrl,
            release_date: relDate,
            org_name: values.org_name,
            kor_name: values.kor_name,
            synopsis: values.synopsis,
            hookcode: values.hookcode,
            etc: values.etc,
            genre: selectedTag,
            nickname: nickTag,
            shop: values.shop
        }).then((res) => {
            message.info(res.data.message);
            setInsertFin(true);
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
        updateGenreList();
        updateShopList();
    }, []);

    if(insertFin){
        const kor_name = document.getElementById("game_kor_name").value;
        axios.get(`${API_URL}/api/games/id`, {
            params: {
                release_date: relDate,
                kor_name: kor_name
            }
        }).then((res) => {
            setRedirectId(res.data.id);
        });
    }

    if(redirectId !== undefined && redirectId !== ''){
        const url = "/games/title/" + redirectId
        console.log(url);
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

            <Form.Item label="제목 (원어)" name="org_name">
                <Input showCount maxLength={50} />
            </Form.Item>

            <Divider />

            <Form.Item label="제목 (한글)" name="kor_name">
                <Input id="game_kor_name" showCount maxLength={50} />
            </Form.Item>

            <Divider />
            <Form.Item label="발매일">
                <DatePicker
                    onChange={(date, datestring) => {setRelDate(datestring);}}
                />
                <span style={{ paddingLeft: 30 }}>
                    * YYYY-MM-DD 형식으로 입력
                </span>
            </Form.Item>
            <Divider />
            <Form.Item label="제작사(한글)" name="company">
                <AutoComplete
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
                            checked={selectedTag.includes(tag)}
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
                    showCount
                    maxLength={1000}
                    style={{ height: 220, resize: "none" }}
                />
            </Form.Item>
            <Divider />
            <Form.Item label="후킹코드" name="hookcode">
                <Input showCount maxLength={300} />
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
                    showCount
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
