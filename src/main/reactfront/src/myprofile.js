import {Link} from 'react-router-dom';
import './myprofile.css';

const MyProfile = () => {
    return (
        <div>
            <div className="header">
                <div className="logotext">
                    <div className="logotextItem">에브리타임</div>
                    <div className="logotextItem">포항공대</div>
                </div>
                <div className="menu">
                    <Link to={'/board/list'} style={{ textDecoration: 'none', color: 'inherit'}}><div className="menuItem">게시판</div></Link>
                    <div className="menuItem">추가기능</div>
                </div>
                <button onClick={() => {window.location.href = "/myprofile"}} className="myprofile">내 정보</button>
            </div>
            <div className="profile">
                <div className="profileInfo">
                    <div className="profileInfoItem profileInfoTitle">
                        <div className="profileInfoTitleItem">내 정보</div>
                        <div className="profileInfoTitleItem">로그아웃</div>
                    </div>
                    <div className="profileInfoContent">
                        <img src="unknownimage.png" className="profileImage" alt="unknownimage"></img>
                        <div className="profileInfoData profileInfoItem">
                            <div className="profileInfoDataItem">kmw14641</div>
                            <div className="profileInfoDataItem">김민우 / kmw14641</div>
                            <div className="profileInfoDataItem">포항공대 21학번</div>
                            <div className="profileInfoDataItem">회원기능 구현 안한사람</div>
                        </div>
                    </div>
                </div>
                <div className="profileAccount">
                    <div className="profileAccountItem">계정</div>
                    <div className="profileAccountItem">비밀번호 변경</div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;