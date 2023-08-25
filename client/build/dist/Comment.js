import React, {useCallback, useEffect, useState} from "../_snowpack/pkg/react.js";
import {SERVERURL, PORT} from "./ServerURL.js";
import axios from "../_snowpack/pkg/axios.js";
import "./Comment.css.proxy.js";
const Comment = (props) => {
  const recipeName = props.recipeName;
  const [commentData, setCommentData] = useState([]);
  const [sendCommentData, setSendCommentData] = useState({
    recipeName: "",
    comment: ""
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const commentsPerPage = 10;
  const commentJsonData = useCallback(async () => {
    const response = await axios.get(`${SERVERURL}:${PORT}/recipe?recipeName=${recipeName}`);
    if (response.data.data.commentData) {
      const allComments = response.data.data.commentData.comment;
      const startIdx = (currentPage - 1) * commentsPerPage;
      const endIdx = startIdx + commentsPerPage;
      setCommentData(allComments.slice(startIdx, endIdx));
      setLoading(false);
      const calculatedTotalPages = Math.ceil(allComments.length / commentsPerPage);
      setTotalPages(calculatedTotalPages);
    } else {
      setCommentData([]);
      setLoading(false);
      setTotalPages(1);
    }
  }, [currentPage, recipeName]);
  const commentDataSend = async (event) => {
    event.preventDefault();
    try {
      const finalConfirm = window.confirm("댓글을 등록하시겠습니까?");
      if (!finalConfirm) {
        return;
      }
      if (sendCommentData.comment === null || sendCommentData.comment === "") {
        alert("입력창이 비어있습니다");
        return;
      }
      const response = await axios.post(`${SERVERURL}:${PORT}/recipe`, sendCommentData);
      if (response.data.success) {
        alert("comment send success");
        setLoading(true);
        commentJsonData();
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  const fileInput = (event) => {
    event.preventDefault();
    const comment = event.target.value;
    setSendCommentData({
      ...sendCommentData,
      recipeName,
      comment
    });
  };
  useEffect(() => {
    commentJsonData();
  }, [commentJsonData]);
  if (loading) {
    return /* @__PURE__ */ React.createElement("h1", null, "로딩중...");
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "commentArea"
  }, /* @__PURE__ */ React.createElement("div", null, commentData.map((comment, index) => /* @__PURE__ */ React.createElement("p", {
    key: index
  }, /* @__PURE__ */ React.createElement("span", null, (currentPage - 1) * commentsPerPage + index + 1, "번 댓글 : "), comment))), /* @__PURE__ */ React.createElement("div", {
    className: "pagination"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => setCurrentPage(currentPage - 1),
    disabled: currentPage === 1
  }, "이전 페이지"), /* @__PURE__ */ React.createElement("div", {
    className: "pageNumbers"
  }, Array.from({length: totalPages}, (_, index) => /* @__PURE__ */ React.createElement("button", {
    key: index + 1,
    onClick: () => setCurrentPage(index + 1),
    className: currentPage === index + 1 ? "active" : ""
  }, index + 1))), /* @__PURE__ */ React.createElement("button", {
    onClick: () => setCurrentPage(currentPage + 1),
    disabled: currentPage === totalPages
  }, "다음 페이지")), /* @__PURE__ */ React.createElement("form", {
    onSubmit: commentDataSend
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    onChange: fileInput,
    placeholder: "댓글 쓰기"
  }), /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, "전 송")));
};
export default Comment;
