import React, { useCallback, useEffect, useState } from 'react';
import { SERVERURL, PORT } from './ServerURL';
import axios from "axios";
import "./Comment.css"

const Comment = (props) => {
    const recipeName = props.recipeName;
    const [commentData, setCommentData] = useState([]);
    const [sendCommentData, setSendCommentData] = useState({
        recipeName: '',
        comment: ''
    });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const commentsPerPage = 10; // 페이지당 댓글 수 설정

    const commentJsonData = useCallback(async () => {
        const response = await axios.get(`${SERVERURL}:${PORT}/recipe?recipeName=${recipeName}`)
        if (response.data.data.commentData) {
            const allComments = response.data.data.commentData.comment;
            const startIdx = (currentPage - 1) * commentsPerPage;
            const endIdx = startIdx + commentsPerPage;
            setCommentData(allComments.slice(startIdx, endIdx));
            setLoading(false);
            const calculatedTotalPages = Math.ceil(allComments.length / commentsPerPage);
            setTotalPages(calculatedTotalPages);
        } else {
            setCommentData([])
            setLoading(false);
            setTotalPages(1);
        }
    }, [currentPage, recipeName]);

    const commentDataSend = async (event) => {
        event.preventDefault();
        try {
            const finalConfirm = window.confirm('댓글을 등록하시겠습니까?');
            if (!finalConfirm) {
                return;
            }
            if (sendCommentData.comment === null || sendCommentData.comment === '') {
                alert('입력창이 비어있습니다')
                return;
            }
            const response = await axios.post(`${SERVERURL}:${PORT}/recipe`, sendCommentData)
            if (response.data.success) {
                alert('comment send success');
                setLoading(true);
                commentJsonData();
            } else {
                alert(response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    const fileInput = (event) => {
        event.preventDefault();
        const comment = event.target.value;
        setSendCommentData({
            ...sendCommentData,
            recipeName: recipeName,
            comment
        });
    }

    useEffect(() => {
        commentJsonData();
    }, [commentJsonData]);

    if (loading) {
        return <h1>로딩중...</h1>;
    }

    return (
        <div className='commentArea'>
            <div>
                {(commentData.map((comment, index) => (
                    <p key={index}><span>{(currentPage - 1) * commentsPerPage + index + 1}번 댓글 : </span>{comment}</p>
                )))}
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>이전 페이지</button>
                <div className="pageNumbers">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>다음 페이지</button>
            </div>
            <form onSubmit={commentDataSend}>
                <input type="text" onChange={fileInput} placeholder='댓글 쓰기' />
                <button type='submit'>전 송</button>
            </form>
        </div>
    )
}

export default Comment;