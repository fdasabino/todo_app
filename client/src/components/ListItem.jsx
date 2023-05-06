import React from "react";
import ProgressBar from "./ProgressBar";
import { BsPatchCheckFill } from "react-icons/bs";
import { useState } from "react";
import Modal from "./Modal";

const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { task, getData } = props;

  const handleModal = () => {
    setShowModal(!showModal);
  };

  // delete task
  const deleteTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_PREFIX}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        console.log("Task deleted");
        getData();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <li className="list_item">
      <div className="info_container">
        <h3 className="task_title">
          <BsPatchCheckFill className="task_icon" />
          {task.title}
        </h3>
        <ProgressBar percent={task.progress} />
      </div>
      <div className="btn_container">
        <button className="btn_edit" onClick={handleModal}>
          Edit
        </button>
        <button className="btn_delete" onClick={deleteTask}>
          Delete
        </button>
      </div>
      {showModal && <Modal mode="edit" setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );
};

export default ListItem;
