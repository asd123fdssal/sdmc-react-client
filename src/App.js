import "./App.css";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
} from "react-router-dom";
import { API_URL } from "./config/constants";
import { GameTitlePage } from "./games/list";
import { MainPage } from "./main/index";
import { Login } from "./user/login/index";
import { SignUpPage } from "./user/signup";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Logout } from "./user/logout";
import { GameUploadPage } from "./games/upload";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/auth`).then((res) => {
            setLogin(res.data.loginResult);
            if (res.data.loginResult) {
                return <Navigate to={location.pathname} />;
            }
        });
    }, [location]);

    return (
        <div>
            <div id="header">
                <div id="header-area">
                    <Link to="/">
                        <img
                            src={"http://localhost:3000/images/logo.png"}
                            alt="로고 이미지"
                        ></img>
                    </Link>
                    <div id="main-menu">
                        <a
                            id="menu__contents"
                            onClick={function () {
                                navigate("/games/");
                            }}
                        >
                            게임
                        </a>
                        <a
                            id="menu__contents"
                            onClick={function () {
                                navigate("/movies/");
                            }}
                        >
                            영상
                        </a>
                        <a
                            id="menu__contents"
                            onClick={function () {
                                navigate("/books/");
                            }}
                        >
                            도서
                        </a>
                        <a id="padding__a"></a>
                        {login || (
                            <a
                                id="menu__my"
                                onClick={function () {
                                    navigate("/login");
                                }}
                            >
                                로그인
                            </a>
                        )}
                        {login && (
                            <a
                                id="menu__my"
                                onClick={function () {
                                    navigate("/logout");
                                }}
                            >
                                로그아웃
                            </a>
                        )}
                        {login && <a id="menu__my">내 정보</a>}
                    </div>
                </div>
            </div>
            <div id="body">
                <Routes>
                    <Route path="/">
                        <Route path="" element={<MainPage />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="games">
                        <Route path=":index" element={<GameTitlePage />} />
                        <Route path="" element={<GameTitlePage />} />
                        <Route path="titles/:id" />
                        <Route path="upload" element={<GameUploadPage />} />
                    </Route>
                    <Route path="/books" element={<h2>books</h2>} />
                    <Route path="/movies" element={<h2>movies</h2>} />
                </Routes>
            </div>
            <div id="footer"></div>
        </div>
    );
}
export default App;
