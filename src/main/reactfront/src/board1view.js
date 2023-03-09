import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useSearchParams} from 'react-router-dom';
import './board1view.css';

const PostDelete = (id, e) => {
    e.preventDefault();
    axios.get(`https://everytime1.azurewebsites.net/server/delete?id=${id}`).then(
    (response) => {
        window.location.href = "/board/list"
    })
}

const Board1View = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        axios.get(`https://everytime1.azurewebsites.net/server/view?id=${searchParams.get('id')}`).then(
        (response) => {
        setTitle(response.data.title)
        setContent(response.data.content)
        }
    )}, [searchParams])
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
            <div className="boardview">
                <Link to={'/board/list'} style={{ textDecoration: 'none', color: 'inherit'}}><div className="boardName boardviewItem">자유게시판</div></Link>
                <div className="boardviewItem">
                    <div className="viewUtil">
                        <div className="viewUtilItem viewWriter">익명</div>
                        <button className="viewUtilItem viewDelete" onClick={(e) => PostDelete(searchParams.get('id'), e)}>삭제</button>
                    </div>
                    <div className="viewTitle">{title}</div>
                    <div className="viewContent">{content}</div>
                </div>
            </div>
        </div>
    )
}

export default Board1View;