import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = (props) => {
  const { listName, getData } = props;
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleSignOut = async () => {
    try {
      removeCookies("Email");
      removeCookies("Token");
      setCookies(null);

      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <>
      <h4>{cookies.Email && cookies.Email}</h4>
      <div className="list_header">
        <h1>{listName.toUpperCase()}</h1>
        <div className="btn_container">
          <button className="btn_create" onClick={handleModal}>
            Add new
          </button>
          <button className="btn_sign_out" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        {showModal && <Modal mode={"add"} setShowModal={setShowModal} getData={getData} />}
      </div>
    </>
  );
};

export default ListHeader;
