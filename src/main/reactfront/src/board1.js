import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './board1.css';


const Board1 = () => {
    const [postList, setPostList] = useState([]);
    const [nowPage, setNowPage] = useState(0);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {
        axios.get(`https://everytime1.azurewebsites.net/server/list?page=${nowPage}`).then(
        (response) => {
        setPostList(response.data.list.content)
        setPageList(Array.from({length: response.data.endPage - response.data.startPage + 1}, (v, i)=>i+response.data.startPage))
        window.scrollTo(0, 0);
        }
    )}, [nowPage])
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
            <div className="section">
                <div className="board">
                    <div className="boardItem boardName">자유게시판</div>
                    <Link to={'/board/write'} style={{ textDecoration: 'none', color: 'inherit'}}><div className="boardItem writeNewPost">새 글 작성하기</div></Link>
                    <div className="boardItem posts">
                        {postList.map((post)=>{return (
                            <Link to={`/board/view?id=${post.id}`} style={{ textDecoration: 'none', color: 'inherit'}}><div className="post" key={post.id}>
                                <div className="postTitle">{post.title}</div>
                                <div className="postContent">{post.content}</div>
                                <div className="postWriter">익명</div>
                            </div></Link>
                        )})}
                    </div>
                    <div className="pageboard">
                        {pageList.map((page)=>{
                            if (page - 1 !== nowPage) {
                                return (
                                    <button className="pageboardItem" key={page} onClick={() => setNowPage(page-1)}>{page}</button>
                                )
                            }
                            else {
                                return (
                                    <button className="pageboardItem curPageButton" key={page}>{page}</button>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board1;