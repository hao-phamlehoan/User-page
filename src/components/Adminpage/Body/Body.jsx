import React, { useEffect } from "react";
import "./Body.css";
import "../../Userpage/common_css/base.css";
import "../../Userpage/common_css/grid.css";
import "../../Userpage/common_css/responsive.css";
import ava from "../../../assets/User_img/user-avatar-filled-alt.jpg";
import big_logo from "../../../assets/User_img/big_logo.png";
import callApi from "../../../api/callApi"
import SortTable from "./SortTable"
import NotFound from "../../NotFound";

function Body() {
  const [visibleI, setVisibleI] = React.useState(true);
  const [visibleB, setVisibleB] = React.useState(false);
  const [isActiveI, setActiveI] = React.useState(true);
  const [isActiveB, setActiveB] = React.useState(false);

  const [arr, setArr] = React.useState([]);
  const [Activearr, setActiveArr] = React.useState([]);

  function initArr() {
    for (var i = 0; i < 65; i++) {
      if (Activearr.find(v => { return v === i })) {
        arr[i] = 'btn btn-active';
      }
      else {
        arr[i] = 'btn'
      }
    }
    return arr;
  }

  const [booth_arr, setBooth_arr] = React.useState(initArr());
  const [filter, setFilter] = React.useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const boothMap = await callApi.getBoothMap();
        console.log(boothMap)
        const loadToArr = () => {
          for (var i = 0; i < 64; i++) {
            if (boothMap.result[i].owner != null) {
              if (Activearr.find(v => { return v === i + 1 })) {
                continue
              } else {
                Activearr.push(i + 1);
              }
            }
          }
        }
        loadToArr();
        setBooth_arr(initArr);
      } catch (error) {
        console.log("Failed to fetch: ", error)
      }
    }
    fetchUser();
  }, [filter])

  const login = localStorage.getItem("admin");
  if (login != "true") {
    return (
      <NotFound></NotFound>
    )
  }
  return (
    <div className="app__container">
      <div className="grid wide">
        <div className="row sm-gutter app__content">
          <div className="col l-3 m-12 c-12">
            <div className="avatar">
              <img src={ava} className="body-user-img" alt="" />
              <span className="body-user-name">ADMIN</span>
            </div>
            <div className="category">
              <ul className="category-list">
                <li className="category-item">
                  <div
                    onClick={function () {
                      setFilter(!filter)
                      setVisibleI(true);
                      setVisibleB(false);
                      setActiveI(true);
                      setActiveB(false);
                    }}
                    className={
                      isActiveI
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-circle-user"></i>
                    <span className="category-item-name">Request List</span>
                  </div>
                </li>
                <li className="category-item">
                  <div
                    onClick={function () {
                      setFilter(!filter)
                      setVisibleI(false);
                      setVisibleB(true);
                      setActiveI(false);
                      setActiveB(true);
                      setFilter(true);
                    }}
                    className={
                      isActiveB
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-map"></i>
                    <span className="category-item-name">Booth map</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col l-9 m-12 c-12">
            {visibleI && (
              <div className="approve">
                <span className="approve-title">
                  Danh sách phê duyệt
                </span>
                <div className="approve-description">
                  Trong trang này, admin có thể xem lại các đơn đăng ký đã được phê duyệt(đồng ý hoặc từ chối) hoặc chưa được phê duyệt.
                  Trang này chỉ có admin và các member được sử dụng.
                  Các thay đổi sẽ được áp dụng nếu được xem xét bởi ban điều hành. Hãy cẩn thận!
                </div>
                <SortTable></SortTable>
              </div>
            )}
            {visibleB && (
              <div id="BoothMap" className="booth-map">
                <div className="booth">
                  <div className="h6-building">
                    <img className="h6-logo" src={big_logo} alt="logo" />
                  </div>
                  <div className="booth-behind">
                    <div className="h6-block"></div>
                    <div className="booth-behind-map">
                      <table>
                        <tbody>
                          <tr>
                            <td className="btn btn-none" />
                          </tr>
                          <tr>
                            <td className="btn btn-none" />
                            <td className={booth_arr[5]}>5</td>
                            <td className={booth_arr[6]}>6</td>
                            <td className={booth_arr[7]}>7</td>
                            <td className={booth_arr[8]}>8</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[21]}>21</td>
                            <td className={booth_arr[22]}>22</td>
                            <td className={booth_arr[23]}>23</td>
                            <td className={booth_arr[24]}>24</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[33]}>33</td>
                            <td className={booth_arr[34]}>34</td>
                            <td className={booth_arr[34]}>35</td>
                            <td className={booth_arr[36]}>36</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[61]}>61</td>
                            <td className={booth_arr[62]}>62</td>
                          </tr>
                          <tr>
                            <td className="btn btn-none" />
                            <td className={booth_arr[9]}>9</td>
                            <td className={booth_arr[10]}>10</td>
                            <td className={booth_arr[11]}>11</td>
                            <td className={booth_arr[12]}>12</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[57]}>57</td>
                            <td className={booth_arr[58]}>58</td>
                            <td className={booth_arr[59]}>59</td>
                            <td className={booth_arr[60]}>60</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[45]}>45</td>
                            <td className={booth_arr[46]}>46</td>
                            <td className={booth_arr[47]}>47</td>
                            <td className={booth_arr[48]}>48</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[63]}>63</td>
                            <td className={booth_arr[64]}>64</td>
                          </tr>
                          <tr>
                            <td className="btn btn-none" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="booth-front">
                    <table>
                      <tbody>
                        <tr>
                          <td className="btn btn-none" />
                        </tr>
                        <tr>
                          <td className={booth_arr[1]} >1</td>
                          <td className={booth_arr[2]} >2</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[13]}>13</td>
                          <td className={booth_arr[14]}>14</td>
                          <td className={booth_arr[15]}>15</td>
                          <td className={booth_arr[16]}>16</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[25]}>25</td>
                          <td className={booth_arr[26]}>26</td>
                          <td className={booth_arr[27]}>27</td>
                          <td className={booth_arr[28]}>28</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[37]}>37</td>
                          <td className={booth_arr[38]}>38</td>
                          <td className={booth_arr[39]}>39</td>
                          <td className={booth_arr[40]}>40</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[49]}>49</td>
                          <td className={booth_arr[50]}>50</td>
                          <td className={booth_arr[51]}>51</td>
                          <td className={booth_arr[52]}>52</td>
                        </tr>
                        <tr>
                          <td className={booth_arr[3]}>3</td>
                          <td className={booth_arr[4]}>4</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[17]}>17</td>
                          <td className={booth_arr[18]}>18</td>
                          <td className={booth_arr[19]}>19</td>
                          <td className={booth_arr[20]}>20</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[29]}>29</td>
                          <td className={booth_arr[30]}>30</td>
                          <td className={booth_arr[31]}>31</td>
                          <td className={booth_arr[32]}>32</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[41]}>41</td>
                          <td className={booth_arr[42]}>42</td>
                          <td className={booth_arr[43]}>43</td>
                          <td className={booth_arr[44]}>44</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[53]}>53</td>
                          <td className={booth_arr[54]}>54</td>
                          <td className={booth_arr[55]}>55</td>
                          <td className={booth_arr[56]}>56</td>
                        </tr>
                        <tr>
                          <td className="btn btn-none" />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="note">
                    <ul className="note-list">
                      <li className="note-item">
                        <div className="btn-note" />
                        <span>Available</span>
                      </li>
                      <li className="note-item">
                        <div className="btn-active btn-note" />
                        <span>Booked</span>
                      </li>
                      <li className="note-item">
                        <div className="btn-reject btn-note" />
                        <span>Booked</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
