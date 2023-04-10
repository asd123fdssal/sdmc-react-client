import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { API_URL } from "./config/constants";
import { GameTitlePage } from "./games/index";
import { MainPage } from "./main/index"

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src={"http://localhost:3000/images/logo.png"} alt="로고 이미지"></img>
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
            <a
              id="menu__my"
              onClick={function () {
                navigate("/login");
              }}
            >
              로그인
            </a>
            <a id="menu__my">내 정보</a>
          </div>
        </div>
      </div>
      <div id="body">
        <Routes>
          <Route path="/">
            <Route path="" element={<MainPage/>}/>
          </Route>
          <Route path="games">
            <Route path=":index" element={<GameTitlePage/>} />
            <Route path="" element={<GameTitlePage/>} />
            <Route path="titles/:id">
            </Route>
          </Route>
          <Route path="/books" element={<h2>books</h2>} />
          <Route path="/movies" element={<h2>movies</h2>} />
          <Route path="/login" element={<h2>login</h2>} />
        </Routes>
      </div>
      <div id="footer"></div>
    </div>
  );
}
export default App;
