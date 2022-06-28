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

function Body() {
  // biến ẩn hiện phần tử
  const [visibleI, setVisibleI] = React.useState(true);
  const [visibleB, setVisibleB] = React.useState(false);
  const [visibleR, setVisibleR] = React.useState(false);
  const [visibleP, setVisibleP] = React.useState(false);
  // biến thêm css 
  const [isActiveI, setActiveI] = React.useState(true);
  const [isActiveB, setActiveB] = React.useState(false);
  const [isActiveR, setActiveR] = React.useState(false);
  const [isActiveP, setActiveP] = React.useState(false);

  const [changeInfor, setChangeInfor] = React.useState(false);


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

  const handleSaveInfor = async () => {
    try {
      const newUser = {
        "id": idUser,
        "name": nameI,
        "phone": phoneI,
        "email": emailI,
        "representation": representationI
      }
      var Getuser = localStorage.getItem("user");
      const user = JSON.parse(Getuser);
      const newUser1 = {
        "email": emailI,
        "id": idUser,
        "name": nameI,
        "password": user.password,
        "phone": phoneI,
        "representation": representationI,
      }
      callApi.putInformation(newUser);
      localStorage.setItem('user', JSON.stringify(newUser1));
      alert("Save successful");
      // setName(nameI);
      // setName_img(nameI);
      // setPhone(phoneI);
      // setEmail(emailI)
      // setRepresentation(representationI);
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
        alert ('Change password successful')
      } else {
        alert ('Confirm password incorrect')
      }
    } else {
      alert('Password incorrect');
    }
  }

  function getNickName(name) {
    var Namearr = name.split(' ')
    return Namearr[Namearr.length - 1];
  }

  useEffect(() => {
    const fetchUser = async () => {
      console.log(1);
      try {
        var Getuser = localStorage.getItem("user");
        const user = JSON.parse(Getuser);
        setIdUser(user.id)
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
        const boothid = await callApi.getBooth(user.id);
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
          }
          for (var i in boothid.result) {
            if (Waitarr.find(v => {return v === boothid.result[i].booth_id})) {
              continue
            } else {
              Waitarr.push(boothid.result[i].booth_id);
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

  return (
    <div className="app__container">
      <div className="grid wide">
        <div className="row sm-gutter app__content">
          <div className="col l-3 m-12 c-12">
            <div className="avatar">
              <img src={avatar_img} className="body-user-img" alt="" />
              <span className="body-user-name">{name_img}</span>
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
                      setActiveP(false);
                    }}
                    className={
                      isActiveI
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-solid fa-circle-user"></i>
                    <span className="category-item-name">My information</span>
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
                      setBooth_arr(initArr());
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
                    }}
                    className={
                      isActiveR
                        ? "category-item-link category-item-link-active"
                        : "category-item-link"
                    }
                  >
                    <i className="category-item-icon fa-brands fa-wpforms" />
                    <span className="category-item-name">Register form</span>
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
                <span className="information-title">My information</span>
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
                            <td className={booth_arr[5]} onClick={() => handleButton(5)}>5</td>
                            <td className={booth_arr[6]} onClick={() => handleButton(6)}>6</td>
                            <td className={booth_arr[7]} onClick={() => handleButton(7)}>7</td>
                            <td className={booth_arr[8]} onClick={() => handleButton(8)}>8</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[21]} onClick={() => handleButton(21)}>21</td>
                            <td className={booth_arr[22]} onClick={() => handleButton(22)}>22</td>
                            <td className={booth_arr[23]} onClick={() => handleButton(23)}>23</td>
                            <td className={booth_arr[24]} onClick={() => handleButton(24)}>24</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[33]} onClick={() => handleButton(33)}>33</td>
                            <td className={booth_arr[34]} onClick={() => handleButton(34)}>34</td>
                            <td className={booth_arr[34]} onClick={() => handleButton(35)}>35</td>
                            <td className={booth_arr[36]} onClick={() => handleButton(36)}>36</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[61]} onClick={() => handleButton(61)}>61</td>
                            <td className={booth_arr[62]} onClick={() => handleButton(62)}>62</td>
                          </tr>
                          <tr>
                            <td className="btn btn-none" />
                            <td className={booth_arr[9]} onClick={() => handleButton(9)}>9</td>
                            <td className={booth_arr[10]} onClick={() => handleButton(10)}>10</td>
                            <td className={booth_arr[11]} onClick={() => handleButton(11)}>11</td>
                            <td className={booth_arr[12]} onClick={() => handleButton(12)}>12</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[57]} onClick={() => handleButton(57)}>57</td>
                            <td className={booth_arr[58]} onClick={() => handleButton(58)}>58</td>
                            <td className={booth_arr[59]} onClick={() => handleButton(59)}>59</td>
                            <td className={booth_arr[60]} onClick={() => handleButton(60)}>60</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[45]} onClick={() => handleButton(45)}>45</td>
                            <td className={booth_arr[46]} onClick={() => handleButton(46)}>46</td>
                            <td className={booth_arr[47]} onClick={() => handleButton(47)}>47</td>
                            <td className={booth_arr[48]} onClick={() => handleButton(48)}>48</td>
                            <td className="btn btn-none" />
                            <td className={booth_arr[63]} onClick={() => handleButton(63)}>63</td>
                            <td className={booth_arr[64]} onClick={() => handleButton(64)}>64</td>
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
                          <td className={booth_arr[1]} onClick={() => handleButton(1)}>1</td>
                          <td className={booth_arr[2]} onClick={() => handleButton(2)}>2</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[13]} onClick={() => handleButton(13)}>13</td>
                          <td className={booth_arr[14]} onClick={() => handleButton(14)}>14</td>
                          <td className={booth_arr[15]} onClick={() => handleButton(15)}>15</td>
                          <td className={booth_arr[16]} onClick={() => handleButton(16)}>16</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[25]} onClick={() => handleButton(25)}>25</td>
                          <td className={booth_arr[26]} onClick={() => handleButton(26)}>26</td>
                          <td className={booth_arr[27]} onClick={() => handleButton(27)}>27</td>
                          <td className={booth_arr[28]} onClick={() => handleButton(28)}>28</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[37]} onClick={() => handleButton(37)}>37</td>
                          <td className={booth_arr[38]} onClick={() => handleButton(38)}>38</td>
                          <td className={booth_arr[39]} onClick={() => handleButton(39)}>39</td>
                          <td className={booth_arr[40]} onClick={() => handleButton(40)}>40</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[49]} onClick={() => handleButton(49)}>49</td>
                          <td className={booth_arr[50]} onClick={() => handleButton(50)}>50</td>
                          <td className={booth_arr[51]} onClick={() => handleButton(51)}>51</td>
                          <td className={booth_arr[52]} onClick={() => handleButton(52)}>52</td>
                        </tr>
                        <tr>
                          <td className={booth_arr[3]} onClick={() => handleButton(3)}>3</td>
                          <td className={booth_arr[4]} onClick={() => handleButton(4)}>4</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[17]} onClick={() => handleButton(17)}>17</td>
                          <td className={booth_arr[18]} onClick={() => handleButton(18)}>18</td>
                          <td className={booth_arr[19]} onClick={() => handleButton(19)}>19</td>
                          <td className={booth_arr[20]} onClick={() => handleButton(20)}>20</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[29]} onClick={() => handleButton(29)}>29</td>
                          <td className={booth_arr[30]} onClick={() => handleButton(30)}>30</td>
                          <td className={booth_arr[31]} onClick={() => handleButton(31)}>31</td>
                          <td className={booth_arr[32]} onClick={() => handleButton(32)}>32</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[41]} onClick={() => handleButton(41)}>41</td>
                          <td className={booth_arr[42]} onClick={() => handleButton(42)}>42</td>
                          <td className={booth_arr[43]} onClick={() => handleButton(43)}>43</td>
                          <td className={booth_arr[44]} onClick={() => handleButton(44)}>44</td>
                          <td className="btn btn-none" />
                          <td className={booth_arr[53]} onClick={() => handleButton(53)}>53</td>
                          <td className={booth_arr[54]} onClick={() => handleButton(54)}>54</td>
                          <td className={booth_arr[55]} onClick={() => handleButton(55)}>55</td>
                          <td className={booth_arr[56]} onClick={() => handleButton(56)}>56</td>
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
            {visibleR && (
              <div id="RegisterForm" className="register">
                <span className="information-title">Register form</span>
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
                    <label>Booth available:</label>
                    <label className="input no-outline">{boothAvailable()}</label>
                  </li>
                </ul>
                <div className="register-btn" onClick={() => RegisterButton()}>
                  <span>REGISTER</span>
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
