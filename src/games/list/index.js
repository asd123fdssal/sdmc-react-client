import {useNavigate, useParams} from "react-router-dom";
import "./index.css";
import { API_URL } from "../../config/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameCard } from "../../components/gameCard";
import {Button, Form, message, Select, Space} from "antd";
import Search from "antd/es/input/Search";
import {AiFillFileAdd, AiFillTag} from "react-icons/ai";
import CheckableTag from "antd/es/tag/CheckableTag";
const { Pagination } = require("antd");

export function GameTitlePage() {
    let { index } = useParams();
    const navigate = useNavigate();
    index = index === undefined ? 1 : index;
    const [games, setGames] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [page, setPage] = useState(1);
    const [selOption, setSelOption] = useState({value:"제목"});
    const options = [{value: "제목"}, {value: "제작사"}, {value: "시리즈"}]
    const [keyword, setKeyword] = useState('');
    const sortOption = [{value: "발매일순"}, {value:"추천순"}, {value:"댓글순"}, {value: "가나다순"}]
    const [selSortOpt, setSelSortOpt] = useState('발매일순');
    const [hideGenre, setHideGenre] = useState(false);
    const [genreOption, setGenreOption] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);

    useEffect(() => {
        search();
        updateGenreList();
    }, [page, keyword, selSortOpt, selectedTag]);

    const search = () => {
        navigate(`/games/${page}`);
        axios.get(`${API_URL}/games/${page}`, {
            params : {
                options: selOption,
                order: selSortOpt,
                value: keyword,
                genre: selectedTag
            }
        })
            .then((res) => {
                setGames(res.data.games);
                setMaxPage(res.data.pages);
            }).catch((err) => {
            console.error(err);
        });
    }

    const updateGenreList = () => {
        axios.get(`${API_URL}/api/genre/all`).then(res => {
            setGenreOption(res.data);
        });
    }

    const handleChangeGenre = (tag, checked) => {
        const nextSelectedTags = checked
                                 ? [...selectedTag, tag]
                                 : selectedTag.filter((t) =>  t.value !== tag.value);
        setSelectedTag(nextSelectedTags);
    };

    const selectBefore = (
        <Select defaultValue="제목" onChange={(value) => {setSelOption({value: value})}} options={options} style={{width:100}} />
    );

    return (
        <div style={{width:"100%", position:"relative"}}>
            <h2 id="game-headline">게임 목록</h2>
            <div style={{right:"-8px",top:0,position:"absolute"}}>
                <Button onClick={(e) => {setHideGenre(!hideGenre)}} style={{marginRight:"12px"}} icon={<AiFillTag />} type="primary"size={"middle"}>
                    장르 검색
                </Button>
                <Select
                    defaultValue="발매일순" onChange={(value) => {setSelSortOpt(value)}} style={{marginRight:"12px", width:"120px"}} options={sortOption}/>
                <Button onClick={(e) => {navigate('/games/upload')}} type="primary" icon={<AiFillFileAdd />} size={"middle"}>
                    추가
                </Button>
            </div>
            {hideGenre?
                 <div style={{marginTop:"12px"}}>
                     <span>장르 검색 : </span>
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
                 </div>:<div/>
            }
            <Search
                addonBefore={selectBefore}
                allowClear
                enterButton="Search"
                style={{margin:"12px 0 0 8px"}}
                onSearch={(value) => {setKeyword(value); setPage(1) }}
            />
            <div id="game-list">
                {games.map(function (game) {
                    return <GameCard key={game.gid} game={game} />;
                })}
            </div>
            <div id="page">
                <Pagination
                    onChange={(page) => {setPage(page)}}
                    className="pagination"
                    defaultCurrent={index}
                    total={maxPage}
                    showSizeChanger={false}
                    defaultPageSize={20}
                    responsive={true}
                />
            </div>
        </div>
    );
}
