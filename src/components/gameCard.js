import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdThumbUp } from "react-icons/md";
import {API_IMG_URL} from "../config/constants";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export function GameCard(props) {
    const game = props.game;
    return (
        <div className="game-card">
            <Link
                style={{ color: "inherit" }}
                className="game-link"
                to={`/games/${game.title_id}`}
            >
                <div>
                    <img className="game-pic" src={API_IMG_URL + game.title_picture} alt="" />
                    <div className="game-recommend">
                        <MdThumbUp className="thumb-img">mdThumbUp</MdThumbUp>
                        <span className="game-recommend-num">
                            {game.recommend}
                        </span>
                    </div>
                </div>
                <div className="game-contents">
                    <span className="game-name">{game.title_name}</span>
                    <div className="game-footer">
                        <div className="game-company">
                            <span>{game.company_name}</span>
                        </div>
                        <span className="game-date">
                            {dayjs(game.release_date).format("YYYY-MM-DD")}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
