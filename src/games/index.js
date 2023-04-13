import { useParams } from "react-router-dom";
import "./index.css";
import { API_URL } from "../config/constants";
import axios from "axios";
import {useEffect, useState} from "react";
import { GameCard } from "../components/gameCard"
const {  Pagination  } = require("antd");

export function GameTitlePage() {
  let { index } = useParams();
  index = (index === undefined) ? 1 : index;
  const [games, setGames] = useState([]);

  useEffect(() => {
      axios
          .get(`${API_URL}/games/${index}`)
          .then((result) => {
              const games = result.data.games;
              setGames(games);
              console.log(games);
          })
          .catch((error) => {
              console.log(error);
          });
  }, []);

  return (
    <div>
        <h1 id="game-headline">게임 목록</h1>
        <div id="game-list">
            {games.map(function (game, index){
                return <GameCard game ={game} key ={index}/>;
            })}
        </div>
        <div id="page">
            <Pagination className="pagination" defaultCurrent={1} total={1000} defaultPageSize={10} responsive={true} />
        </div>
    </div>
  );
}