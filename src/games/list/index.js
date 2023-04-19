import {useNavigate, useParams} from "react-router-dom";
import "./index.css";
import { API_URL } from "../../config/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { GameCard } from "../../components/gameCard";
import {Button, Select} from "antd";
import {Option} from "antd/es/mentions";
import Search from "antd/es/input/Search";
import {AiFillFileAdd} from "react-icons/ai";
const { Pagination } = require("antd");

export function GameTitlePage() {
    let { index } = useParams();
    const navigate = useNavigate();
    index = index === undefined ? 1 : index;
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/games/${index}`)
            .then((result) => {
                const games = result.data.games;
                setGames(games);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const selectBefore = (
        <Select defaultValue="제목" style={{width:100}}>
            <Option value="제목">제목</Option>
            <Option value="제작사">제작사</Option>
            <Option value="시리즈">시리즈</Option>
            <Option value="장르">장르</Option>
        </Select>
    );

    return (
        <div style={{width:"100%", position:"relative"}}>
            <h2 id="game-headline">게임 목록</h2>
            <Button style={{right:"-8px",top:0,position:"absolute"}} onClick={(e) => {navigate('/games/upload')}} type="primary" icon={<AiFillFileAdd />} size={"middle"}>
                추가
            </Button>
            <Search
                addonBefore={selectBefore}
                allowClear
                enterButton="Search"
                style={{margin:"12px 0 0 8px"}}
            />
            <div id="game-list">
                {games.map(function (game) {
                    return <GameCard game={game} />;
                })}
            </div>
            <div id="page">
                <Pagination
                    className="pagination"
                    defaultCurrent={1}
                    total={1000}
                    defaultPageSize={10}
                    responsive={true}
                />
            </div>
        </div>
    );
}
