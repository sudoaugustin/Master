import React from "react";
import { useParams } from "react-router-dom";
import NewPassForm from "./NewPassForm.js";

export default function ChangePass(props) {
  const { recover_id } = useParams();
  //if (this.props.isAuthenticated) window.location.replace("/account");
  return (
    <div className="root-container">
      <NewPassForm recover_id={recover_id} {...props} />
    </div>
  );
}
