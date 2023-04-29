import "./index.css";
import {DEBUG_MODE} from "../config/constants";
export function MainPage() {
    return (
        <div id="banner">
            <img
                id="banner-img"
                src={DEBUG_MODE?"":"http://localhost:3000/images/banner.png"}
                alt="배너 이미지"
            />
        </div>
    );
}
