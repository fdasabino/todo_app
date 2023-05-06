import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = (props) => {
  const [cookies] = useCookies();
  const { mode, setShowModal, task, getData } = props;
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date().toISOString().slice(0, 10),
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setData({
      title: "",
      progress: 0,
      user_email: "",
      date: editMode ? "" : new Date().toISOString().slice(0, 10),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_PREFIX}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        console.log("Task added");
        handleCloseModal();
        getData();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_PREFIX}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        console.log("Task updated");
        handleCloseModal();
        getData();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  console.log(data);
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form_title_container">
          <h2>{mode} task</h2>
          <button onClick={handleCloseModal}>
            <FaRegTimesCircle />
          </button>
        </div>

        <form action="">
          <input
            type="text"
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            max={40}
            onChange={handleChange}
            required
          />
          <label htmlFor="progress">Progress current at: {data.progress}%</label>
          <input
            type="range"
            name="progress"
            value={data.progress}
            min={0}
            max={100}
            onChange={handleChange}
            required
          />
          <div className="form_button_container">
            <button
              disabled={data.title.length < 1 || data.progress < 1}
              className={mode === "add" ? "btn_create" : mode === "edit" && "btn_edit"}
              type="submit"
              onClick={editMode ? updateData : postData}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
