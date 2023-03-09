import React, { useState } from 'react';
import './boardwrite.css';
import axios from 'axios';

const BoardWrite = () => {
    const [titleText, setTitleText] = useState('');
    const [contentText, setContentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://everytime1.azurewebsites.net/server/writePro',
        null,
        { params : {
            title: titleText,
            content: contentText
        }}).then(
            (reponse) => {
                window.location.href = "/board/list"
            }
        )
    }
    return (
        <div>
            <div className="writeHeader">
                <div className="infoTextWrite">글 쓰기</div>
                <button onClick={() => {window.location.href = "/board/list"}} className="backButton">뒤로가기</button>
            </div>
            <hr></hr>
            <div className="layout">
                <form onSubmit={handleSubmit}>
                    <input name="title" type="text" value={titleText} onChange={(e) => {
                        setTitleText(e.target.value);
                    }}/>
                    <textarea name="content" value={contentText} onChange={(e) => {
                        setContentText(e.target.value);
                    }}></textarea>
                    <button type="submit">작성</button>
                </form>
            </div>
        </div>
    )
}

export default BoardWrite;