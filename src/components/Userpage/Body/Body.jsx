import React from "react";
import "../Body/Body.css";
import "../common_css/base.css";
import "../common_css/grid.css";
import "../common_css/responsive.css";
import ava from "../../../assets/User_img/user-avatar-filled-alt.jpg";
import big_logo from "../../../assets/User_img/big_logo.png";
import { useEffect } from "react";
import callApi from "../../../api/callApi";
import NotFound from "../../NotFound";
import { data } from "jquery";
import { CSVLink } from "react-csv";

function Body() {
  // biến ẩn hiện phần tử
  const [visibleI, setVisibleI] = React.useState(true);
  const [visibleB, setVisibleB] = React.useState(false);
  const [visibleR, setVisibleR] = React.useState(false);
  const [visibleH, setVisibleH] = React.useState(false);
  const [visibleP, setVisibleP] = React.useState(false);
  // biến thêm css 
  const [isActiveI, setActiveI] = React.useState(true);
  const [isActiveB, setActiveB] = React.useState(false);
  const [isActiveR, setActiveR] = React.useState(false);
  const [isActiveH, setActiveH] = React.useState(false);
  const [isActiveP, setActiveP] = React.useState(false);

  const [changeInfor, setChangeInfor] = React.useState(false);

  const [printInput, setPrintInput] = React.useState('');

  const [avatar_img, setAvatar_img] = React.useState(ava);
  const [name_img, setName_img] = React.useState('')
  //information
  const [nameI, setNameI] = React.useState("");
  const [representationI, setRepresentationI] = React.useState("");
  const [phoneI, setPhoneI] = React.useState('');
  const [emailI, setEmailI] = React.useState("");
  const [idUser, setIdUser] = React.useState(0);

  //register
  const [name, setName] = React.useState('');
  const [representation, setRepresentation] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [permit, setPermit] = React.useState('');

  const [chooseIndex, setIndex] = React.useState('');
  const [reloadBooth, setReloadBooth] = React.useState(false);

  //change password
  const [currpass, setCurrpass] = React.useState('');
  const [newpass, setNewpass] = React.useState('');
  const [confpass, setConfpass] = React.useState('');

  const [arr, setArr] = React.useState([]);
  const [Rejectarr, setRejectArr] = React.useState([]);
  const [Activearr, setActiveArr] = React.useState([]);
  const [Waitarr, setWaitArr] = React.useState([]);
  const [prices, setPrices] = React.useState([]);

  function initArr() {
    for (var i = 0; i < 65; i++) {
      if (Rejectarr.find(v => { return v === i })) {
        arr[i] = 'btn btn-reject';
      }
      else if (Activearr.find(v => { return v === i })) {
        arr[i] = 'btn btn-active';
      }
      else if (Waitarr.find(v => { return v === i })) {
        arr[i] = 'btn btn-wait';
      }
      else {
        arr[i] = 'btn'
      }
    }
    return arr;
  }

  const [booth_arr, setBooth_arr] = React.useState(initArr());

  const handleInputRegister = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      setName(value)
    }
    if (id === 'representation') {
      setRepresentation(value)
    }
    if (id === 'phone') {
      setPhone(value)
    }
    if (id === 'email') {
      setEmail(value)
    }
  }
  const handleIndexRegister = (e) => {
    setIndex(e.target.value)
  }
  const handleInputInformation = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      setNameI(value)
    }
    if (id === 'representation') {
      setRepresentationI(value)
    }
    if (id === 'phone') {
      setPhoneI(value)
    }
    if (id === 'email') {
      setEmailI(value)
    }
  }

  function boothAvailable() {
    var a = []
    var count = 0;
    for (var i = 1; i < 65; i++) {
      if (!Rejectarr.find(v => { return v === i }) && !Activearr.find(v => { return v === i }) &&
        !Waitarr.find(v => { return v === i }) && count < 5) {
        a.push(i);
        count++;
      }
    }
    return a.toString() + ',...'
  }

  const handleChangeInfor = () => {
    setChangeInfor(true)
  }

  const handleButton = (index) => {
    if (Rejectarr.find(v => { return v === index })) {
      alert('This booth was booked')
      return
    }
    else if (Activearr.find(v => { return v === index })) {
      alert(`${index} is your booth`)
      return
    }
    else if (Waitarr.find(v => { return v === index })) {
      alert('You booked this booth. Please wait')
      return
    }
    setVisibleI(false);
    setVisibleB(false);
    setVisibleR(true);
    setVisibleP(false);
    setActiveI(false);
    setActiveB(false);
    setActiveR(true);
    setActiveP(false)
    setIndex(index);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSaveInfor = async () => {
    try {
      const newUser = {
        "id": idUser,
        "name": nameI,
        "phone": phoneI,
        "representation": representationI
      }
      callApi.putInformation(newUser);
      const Getuser = localStorage.getItem("user");
      const user = JSON.parse(Getuser);
      const newUser1 = {
        "email": emailI,
        "id": idUser,
        "name": nameI,
        "password": user.password,
        "permit": permit,
        "phone": phoneI,
        "representation": representationI,
      }
      console.log(newUser1)
      console.log('new: ', newUser)
      localStorage.setItem('user', JSON.stringify(newUser1));
      alert("Save successful");
      for (let i = 0; i < 2; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
      }
      console.log('Done');
      window.location.reload(false);
    } catch (error) {
      console.log("Failed to post: ", error);
    }
    setChangeInfor(false)
  }

  const RegisterButton = async () => {
    try {
      if (chooseIndex == 0) {
        alert('You must choose your index booth')
        return
      } else if (Rejectarr.find(v => { return v == chooseIndex })) {
        alert('This booth was booked')
        return
      } else if (Activearr.find(v => { return v == chooseIndex })) {
        alert(`${chooseIndex} is your booth`)
        return
      } else if (Waitarr.find(v => { return v == chooseIndex })) {
        alert('You booked this booth')
        return
      }
      const id = await callApi.getID();
      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const application = {
        "id": id.result + 1,
        "time_register": time,
        "business_id": idUser,
        "booth_id": chooseIndex
      }
      await callApi.putRegister(application);
      alert("Register successful");
      setReloadBooth(true);
    } catch (error) {
      console.log("Failed to put reg: ", error);
    }
  }

  const handleChangePass = async () => {
    const Getuser = localStorage.getItem("user");
    const user = JSON.parse(Getuser);
    console.log(user);
    console.log(currpass);

    if (currpass === user.password) {
      if (newpass === confpass) {
        var item = {
          "id": user.id,
          "curpassword": currpass,
          "newpassword": newpass
        }
        await callApi.putPassword(item)
        const newUser1 = {
          "email": user.email,
          "id": user.id,
          "name": user.name,
          "password": newpass,
          "phone": user.phone,
          "representation": user.representation,
        }
        localStorage.setItem('user', JSON.stringify(newUser1));
        alert('Change password successful')
      } else {
        alert('Confirm password incorrect')
      }
    } else {
      alert('Password incorrect');
    }
  }

  function getNickName(name) {
    var Namearr = name.split(' ')
    return Namearr[Namearr.length - 1];
  }


  var [historyR, setHistoryR] = React.useState([]);
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Business', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Booth number', key: 'booth_id' },
    { label: 'Price', key: 'price' },
    { label: 'Time Register', key: 'time_register' },
    { label: 'Time Approve', key: 'time_approve' },
    { label: 'Approve', key: 'approve' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      console.log(1);
      try {
        var Getuser = localStorage.getItem("user");
        var user = JSON.parse(Getuser);
        var getapiuser = await callApi.getUser(user.id);
        localStorage.setItem('user', JSON.stringify(getapiuser.result[0]));
        Getuser = localStorage.getItem("user");
        user = JSON.parse(Getuser);
        setIdUser(user.id)
        setPermit(user.permit);
        setName(user.name);
        setNameI(user.name);
        setName_img(getNickName(user.representation));
        setPhone(user.phone);
        setPhoneI(user.phone);
        setEmail(user.email)
        setEmailI(user.email)
        setRepresentation(user.representation);
        setRepresentationI(user.representation);
        const boothMap = await callApi.getBoothMap();
        var tmp = await callApi.getBooth(user.id);
        const loadToArr = () => {
          for (var i = 0; i < 64; i++) {
            if (boothMap.result[i].owner == user.id) {
              if (Activearr.find(v => { return v === i + 1 })) {
                continue
              } else {
                Activearr.push(i + 1);
              }
            } else if (boothMap.result[i].owner != null) {
              if (Rejectarr.find(v => { return v === i + 1 })) {
                continue
              } else {
                Rejectarr.push(i + 1);
              }
            }
            prices[i + 1] = boothMap.result[i].price;
          }
          for (var i in tmp.result) {
            if (tmp.result[i].approve === 0 || Waitarr.find(v => { return v === tmp.result[i].booth_id })) {
              continue
            } else {
              Waitarr.push(tmp.result[i].booth_id);
            }
            if (historyR.find(v => { return v.id === tmp.result[i].id })) {
              continue
            } else {
              historyR.push(tmp.result[i]);
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
  }, [reloadBooth])

  const login = localStorage.getItem("isLogined");

  if (login != "true") {
    return (
      <NotFound></NotFound>
    )
  }

  function TimeSQLtoJS(time) {
    if (time == null) {
      return "Chưa duyệt";
    }
    var t = time.slice(12, 19);
    var d = time.slice(0, 10);
    return t + ' ' + d;
  }

  return (
    <div className="app__container">
      <div className="grid wide">
        <div className="row sm-gutter app__content">
          <div className="col l-3 m-12 c-12">
            <div className="avatar">
              <img src={avatar_img} className="body-user-img" alt="" />
              <span className="body-user-name">{name_img}</span>
              <i className={permit ? "body-user-icon fa-solid fa-circle-check" : "hide"}></i>
            </div>
            <div className="category">
              <ul className="category-list">
                <li className="category-item">
                  <div
                    onClick={function () {
                      setVisibleI(true);
                      setVisibleB(false);
                      setVisibleR(false);
                      setVisibleP(false)
                      setActiveI(true);
                      setActiveB(false);
                      setActiveR(false);
                      setActiveH(false);
                      setVisibleH(false);
                      setActiveP(false);
                    }}
                    className={
                      isActiveI
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-circle-user"></i>
                    <span className="category-item-name">My Information</span>
                  </div>
                </li>
                <li className="category-item">
                  <div
                    onClick={function () {
                      setVisibleI(false);
                      setVisibleB(true);
                      setVisibleR(false);
                      setVisibleP(false);
                      setActiveI(false);
                      setActiveB(true);
                      setActiveR(false);
                      setActiveP(false);
                      setActiveH(false);
                      setVisibleH(false);
                      setBooth_arr(initArr());
                    }}
                    className={
                      isActiveB
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-map"></i>
                    <span className="category-item-name">Booth Map</span>
                  </div>
                </li>
                <li className="category-item">
                  <div
                    onClick={function () {
                      setVisibleI(false);
                      setVisibleB(false);
                      setVisibleR(true);
                      setVisibleP(false);
                      setActiveI(false);
                      setActiveB(false);
                      setActiveR(true);
                      setActiveP(false);
                      setActiveH(false);
                      setVisibleH(false);
                    }}
                    className={
                      isActiveR
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-brands fa-wpforms" />
                    <span className="category-item-name">Register Form</span>
                  </div>
                </li>
                <li className="category-item">
                  <div
                    onClick={function () {
                      setVisibleI(false);
                      setVisibleB(false);
                      setVisibleR(false);
                      setVisibleP(false);
                      setActiveI(false);
                      setActiveB(false);
                      setActiveR(false);
                      setActiveP(false);
                      setActiveH(true);
                      setVisibleH(true);
                    }}
                    className={
                      isActiveH
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-clock-rotate-left" />
                    <span className="category-item-name">Register History</span>
                  </div>
                </li>
                <li className="category-item">
                  <div
                    onClick={function () {
                      setVisibleI(false);
                      setVisibleB(false);
                      setVisibleR(false);
                      setVisibleP(true);
                      setActiveI(false);
                      setActiveB(false);
                      setActiveR(false);
                      setActiveP(true);
                      setActiveH(false);
                      setVisibleH(false);
                    }}
                    className={
                      isActiveP
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-lock" />
                    <span className="category-item-name">Change Password</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col l-9 m-12 c-12">
            {visibleI && (
              <div className="information">
                <span className="information-title">My Information</span>
                <i className="edit-icon fa-solid fa-pen-to-square" onClick={() => handleChangeInfor()}></i>
                <ul className="information-list">
                  <li className="information-item">
                    <fieldset>
                      <legend>Name</legend>
                      <input
                        id="name"
                        className={changeInfor ? "input no-outline" : "input no-outline hide"}
                        type="text"
                        value={nameI}
                        onChange={(e) => handleInputInformation(e)}
                        required
                      />
                      <p className={changeInfor ? "input hide" : "input"}>{nameI}</p>
                    </fieldset>
                  </li>
                  <li className="information-item">
                    <fieldset>
                      <legend>Representation</legend>
                      <input
                        id="representation"
                        className={changeInfor ? "input no-outline" : "input no-outline hide"}
                        type="text"
                        value={representationI}
                        onChange={(e) => handleInputInformation(e)}
                        required
                      />
                      <p className={changeInfor ? "input hide" : "input"}>{representationI}</p>
                    </fieldset>
                  </li>
                  <li className="information-item">
                    <fieldset>
                      <legend>Phone number</legend>
                      <input
                        id="phone"
                        className={changeInfor ? "input no-outline" : "input no-outline hide"}
                        type="text"
                        value={phoneI}
                        onChange={(e) => handleInputInformation(e)}
                        required
                      />
                      <p className={changeInfor ? "input hide" : "input"}>{phoneI}</p>
                    </fieldset>
                  </li>
                  <li className="information-item">
                    <fieldset>
                      <legend>Email</legend>
                      <input
                        id="email"
                        className={changeInfor ? "input no-outline" : "input no-outline hide"}
                        type="email"
                        value={emailI}
                        onChange={(e) => handleInputInformation(e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveInfor()
                          }
                        }}
                        required
                      />
                      <p className={changeInfor ? "input hide" : "input"}>{emailI}</p>
                    </fieldset>
                  </li>
                </ul>
                <div className={changeInfor ? "save-btn" : "hide"} onClick={() => handleSaveInfor()}>
                  <span>SAVE</span>
                </div>
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
                            <td className={booth_arr[5]} onClick={() => handleButton(5)}>
                              <p>5</p>
                              <span className="price">{prices[5]}</span>
                            </td>
                            <td className={booth_arr[6]} onClick={() => handleButton(6)}>
                              <p>6</p>
                              <span className="price">{prices[6]}</span>
                            </td>
                            <td className={booth_arr[7]} onClick={() => handleButton(7)}>
                              <p>7</p>
                              <span className="price">{prices[7]}</span>
                            </td>
                            <td className={booth_arr[8]} onClick={() => handleButton(8)}>
                              <p>8</p>
                              <span className="price">{prices[8]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[21]} onClick={() => handleButton(21)}>
                              <p>21</p>
                              <span className="price">{prices[21]}</span>
                            </td>
                            <td className={booth_arr[22]} onClick={() => handleButton(22)}>
                              <p>22</p>
                              <span className="price">{prices[22]}</span>
                            </td>
                            <td className={booth_arr[23]} onClick={() => handleButton(23)}>
                              <p>23</p>
                              <span className="price">{prices[23]}</span>
                            </td>
                            <td className={booth_arr[24]} onClick={() => handleButton(24)}>
                              <p>24</p>
                              <span className="price">{prices[24]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[33]} onClick={() => handleButton(33)}>
                              <p>33</p>
                              <span className="price">{prices[33]}</span>
                            </td>
                            <td className={booth_arr[34]} onClick={() => handleButton(34)}>
                              <p>34</p>
                              <span className="price">{prices[34]}</span>
                            </td>
                            <td className={booth_arr[34]} onClick={() => handleButton(35)}>
                              <p>35</p>
                              <span className="price">{prices[35]}</span>
                            </td>
                            <td className={booth_arr[36]} onClick={() => handleButton(36)}>
                              <p>36</p>
                              <span className="price">{prices[36]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[61]} onClick={() => handleButton(61)}>
                              <p>61</p>
                              <span className="price">{prices[61]}</span>
                            </td>
                            <td className={booth_arr[62]} onClick={() => handleButton(62)}>
                              <p>62</p>
                              <span className="price">{prices[62]}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="btn btn-none" />
                            <td className={booth_arr[9]} onClick={() => handleButton(9)}>
                              <p>9</p>
                              <span className="price">{prices[9]}</span>
                            </td>
                            <td className={booth_arr[10]} onClick={() => handleButton(10)}>
                              <p>10</p>
                              <span className="price">{prices[10]}</span>
                            </td>
                            <td className={booth_arr[11]} onClick={() => handleButton(11)}>
                              <p>11</p>
                              <span className="price">{prices[11]}</span>
                            </td>
                            <td className={booth_arr[12]} onClick={() => handleButton(12)}>
                              <p>12</p>
                              <span className="price">{prices[12]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[57]} onClick={() => handleButton(57)}>
                              <p>57</p>
                              <span className="price">{prices[57]}</span>
                            </td>
                            <td className={booth_arr[58]} onClick={() => handleButton(58)}>
                              <p>58</p>
                              <span className="price">{prices[58]}</span>
                            </td>
                            <td className={booth_arr[59]} onClick={() => handleButton(59)}>
                              <p>59</p>
                              <span className="price">{prices[59]}</span>
                            </td>
                            <td className={booth_arr[60]} onClick={() => handleButton(60)}>
                              <p>60</p>
                              <span className="price">{prices[60]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[45]} onClick={() => handleButton(45)}>
                              <p>45</p>
                              <span className="price">{prices[45]}</span>
                            </td>
                            <td className={booth_arr[46]} onClick={() => handleButton(46)}>
                              <p>46</p>
                              <span className="price">{prices[46]}</span>
                            </td>
                            <td className={booth_arr[47]} onClick={() => handleButton(47)}>
                              <p>47</p>
                              <span className="price">{prices[47]}</span>
                            </td>
                            <td className={booth_arr[48]} onClick={() => handleButton(48)}>
                              <p>48</p>
                              <span className="price">{prices[48]}</span>
                            </td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[63]} onClick={() => handleButton(63)}>
                              <p>63</p>
                              <span className="price">{prices[63]}</span>
                            </td>
                            <td className={booth_arr[64]} onClick={() => handleButton(64)}>
                              <p>64</p>
                              <span className="price">{prices[64]}</span>
                            </td>
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
                          <td className={booth_arr[1]} onClick={() => handleButton(1)}>
                            <p>1</p>
                            <span className="price">{prices[1]}</span>
                          </td>
                          <td className={booth_arr[2]} onClick={() => handleButton(2)}>
                            <p>2</p>
                            <span className="price">{prices[2]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[13]} onClick={() => handleButton(13)}>
                            <p>13</p>
                            <span className="price">{prices[13]}</span>
                          </td>
                          <td className={booth_arr[14]} onClick={() => handleButton(14)}>
                            <p>14</p>
                            <span className="price">{prices[14]}</span>
                          </td>
                          <td className={booth_arr[15]} onClick={() => handleButton(15)}>
                            <p>15</p>
                            <span className="price">{prices[15]}</span>
                          </td>
                          <td className={booth_arr[16]} onClick={() => handleButton(16)}>
                            <p>16</p>
                            <span className="price">{prices[16]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[25]} onClick={() => handleButton(25)}>
                            <p>25</p>
                            <span className="price">{prices[25]}</span>
                          </td>
                          <td className={booth_arr[26]} onClick={() => handleButton(26)}>
                            <p>26</p>
                            <span className="price">{prices[26]}</span>
                          </td>
                          <td className={booth_arr[27]} onClick={() => handleButton(27)}>
                            <p>27</p>
                            <span className="price">{prices[27]}</span>
                          </td>
                          <td className={booth_arr[28]} onClick={() => handleButton(28)}>
                            <p>28</p>
                            <span className="price">{prices[28]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[37]} onClick={() => handleButton(37)}>
                            <p>37</p>
                            <span className="price">{prices[37]}</span>
                          </td>
                          <td className={booth_arr[38]} onClick={() => handleButton(38)}>
                            <p>38</p>
                            <span className="price">{prices[38]}</span>
                          </td>
                          <td className={booth_arr[39]} onClick={() => handleButton(39)}>
                            <p>39</p>
                            <span className="price">{prices[39]}</span>
                          </td>
                          <td className={booth_arr[40]} onClick={() => handleButton(40)}>
                            <p>40</p>
                            <span className="price">{prices[40]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[49]} onClick={() => handleButton(49)}>
                            <p>49</p>
                            <span className="price">{prices[49]}</span>
                          </td>
                          <td className={booth_arr[50]} onClick={() => handleButton(50)}>
                            <p>50</p>
                            <span className="price">{prices[50]}</span>
                          </td>
                          <td className={booth_arr[51]} onClick={() => handleButton(51)}>
                            <p>51</p>
                            <span className="price">{prices[51]}</span>
                          </td>
                          <td className={booth_arr[52]} onClick={() => handleButton(52)}>
                            <p>52</p>
                            <span className="price">{prices[52]}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className={booth_arr[3]} onClick={() => handleButton(3)}>
                            <p>3</p>
                            <span className="price">{prices[3]}</span>
                          </td>
                          <td className={booth_arr[4]} onClick={() => handleButton(4)}>
                            <p>4</p>
                            <span className="price">{prices[4]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[17]} onClick={() => handleButton(17)}>
                            <p>17</p>
                            <span className="price">{prices[17]}</span>
                          </td>
                          <td className={booth_arr[18]} onClick={() => handleButton(18)}>
                            <p>18</p>
                            <span className="price">{prices[18]}</span>
                          </td>
                          <td className={booth_arr[19]} onClick={() => handleButton(19)}>
                            <p>19</p>
                            <span className="price">{prices[19]}</span>
                          </td>
                          <td className={booth_arr[20]} onClick={() => handleButton(20)}>
                            <p>20</p>
                            <span className="price">{prices[20]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[29]} onClick={() => handleButton(29)}>
                            <p>29</p>
                            <span className="price">{prices[29]}</span>
                          </td>
                          <td className={booth_arr[30]} onClick={() => handleButton(30)}>
                            <p>30</p>
                            <span className="price">{prices[30]}</span>
                          </td>
                          <td className={booth_arr[31]} onClick={() => handleButton(31)}>
                            <p>31</p>
                            <span className="price">{prices[31]}</span>
                          </td>
                          <td className={booth_arr[32]} onClick={() => handleButton(32)}>
                            <p>32</p>
                            <span className="price">{prices[32]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[41]} onClick={() => handleButton(41)}>
                            <p>41</p>
                            <span className="price">{prices[41]}</span>
                          </td>
                          <td className={booth_arr[42]} onClick={() => handleButton(42)}>
                            <p>42</p>
                            <span className="price">{prices[42]}</span>
                          </td>
                          <td className={booth_arr[43]} onClick={() => handleButton(43)}>
                            <p>43</p>
                            <span className="price">{prices[43]}</span>
                          </td>
                          <td className={booth_arr[44]} onClick={() => handleButton(44)}>
                            <p>44</p>
                            <span className="price">{prices[44]}</span>
                          </td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[53]} onClick={() => handleButton(53)}>
                            <p>53</p>
                            <span className="price">{prices[53]}</span>
                          </td>
                          <td className={booth_arr[54]} onClick={() => handleButton(54)}>
                            <p>54</p>
                            <span className="price">{prices[54]}</span>
                          </td>
                          <td className={booth_arr[55]} onClick={() => handleButton(55)}>
                            <p>55</p>
                            <span className="price">{prices[55]}</span>
                          </td>
                          <td className={booth_arr[56]} onClick={() => handleButton(56)}>
                            <p>56</p>
                            <span className="price">{prices[56]}</span>
                          </td>
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
                        <div className="btn-wait btn-note" />
                        <span>Booking</span>
                      </li>
                      <li className="note-item">
                        <div className="btn-active btn-note" />
                        <span>My booth</span>
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
            {visibleR && permit === 0 && (
              <div id="RegisterForm" className="register">
                <span className="information-title">Register Form</span>
                <ul className="register-list">
                  <li className="register-item">
                    <div class="alert alert-warning">
                      <strong>Error!</strong>  Tài khoản này chưa được cho phép đăng ký gian hàng bởi Admin. Liên lạc tại : admin@gmail.com
                    </div>
                  </li>
                </ul>
              </div>
            )
            }
            {visibleR && permit === 1 && (
              <div id="RegisterForm" className="register">
                <span className="information-title">Register Form</span>
                <ul className="register-list">
                  <li className="register-item">
                    <fieldset>
                      <legend>Name</legend>
                      <input
                        id="name"
                        className="input no-outline"
                        type="text"
                        value={name}
                        onChange={(e) => handleInputRegister(e)}
                        required
                      />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>Representation</legend>
                      <input
                        id="representation"
                        className="input no-outline"
                        type="text" value={representation}
                        onChange={(e) => handleInputRegister(e)}
                        required
                      />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>Phone number</legend>
                      <input
                        id="phone"
                        className="input no-outline"
                        type="text"
                        value={phone}
                        onChange={(e) => handleInputRegister(e)}
                        required
                      />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>Email</legend>
                      <input
                        id="email"
                        className="input no-outline"
                        type="email"
                        value={email}
                        onChange={(e) => handleInputRegister(e)}
                        required
                      />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <label>Booth available:</label>
                    <label className="input no-outline">{boothAvailable()}</label>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>Index of booth</legend>
                      <input
                        className="input no-outline"
                        type="number"
                        value={chooseIndex}
                        onChange={(e) => handleIndexRegister(e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            RegisterButton();
                          }
                        }} />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <label>Price:</label>
                    <label className="input no-outline">{prices[Number(chooseIndex)]}</label>
                  </li>
                </ul>
                <div className="register-btn" onClick={() => RegisterButton()}>
                  <span>REGISTER</span>
                </div>
              </div>
            )}
            {visibleH && (
              <div className="register">
                <span className="RH-title">Register History</span>
                {historyR.map((result, index) => {
                  return (
                    <div key={index} className="register-history">
                      <a href={`#hr${index}`} className="form-title">{`Register form: ${index + 1}. Booth: ${result.booth_id}`}</a>
                      <hr></hr>
                      <ul id={`hr${index}`} className="register-history-list">
                        <li className="register-history-item">
                          <label className="label1">Name: </label>
                          <label className='label2'>{result.name}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Email: </label>
                          <label className='label2'>{result.email}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Index of booth: </label>
                          <label className='label2'>{result.booth_id}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Price: </label>
                          <label className='label2'>{result.price}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Time register: </label>
                          <label className='label2'>{TimeSQLtoJS(result.time_register)}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Time approve(reject): </label>
                          <label className='label2'>{TimeSQLtoJS(result.time_approve)}</label>
                        </li>
                        <li className="register-history-item">
                          <label className="label1">Status: </label>
                          <label className='label2'>{(result.approve === 1) ? 'Accept' : ((result.approve === 0) ? 'Reject' : 'Waiting')}</label>
                        </li>
                      </ul>
                    </div>
                  )
                })}
                <CSVLink data={historyR} headers={headers} filename={"history_register.csv"} className="Download">Download</CSVLink>
                {/* <div className="print">
                  <label className="print-label">Register Form: </label>
                  <input
                    className="print-input"
                    type="number"
                    placeholder="Index of register form"
                    onChange={event => setPrintInput(event.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        console.log(printInput)
                      }
                    }} />

                  <button className="print-button" onClick={() => { console.log(printInput) }}>Print</button>

                </div> */}
                <div className="fake">

                </div>
              </div>
            )}
            {visibleP && (
              <div className="register">
                <span className="information-title">Change Password</span>
                <ul className="register-list">
                  <li className="register-item">
                    <fieldset>
                      <legend>Current Password</legend>
                      <input className="input no-outline" type="password" onChange={event => setCurrpass(event.target.value)} required />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>New Password</legend>
                      <input className="input no-outline" type="password" onChange={event => setNewpass(event.target.value)} required />
                    </fieldset>
                  </li>
                  <li className="register-item">
                    <fieldset>
                      <legend>Confirm Password</legend>
                      <input className="input no-outline" type="password" onChange={event => setConfpass(event.target.value)} required />
                    </fieldset>
                  </li>
                </ul>
                <div className="register-btn" onClick={() => handleChangePass()}>
                  <span>Change</span>
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
