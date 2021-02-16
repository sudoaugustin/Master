import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { InputBase } from "../../Utils/Input";
import Gallery from "./Gallery";
import WORDS from "../../../lang/app";
import { toBase64 } from "../../../config";

const Note = ({
  lang,
  note,
  handleChange,
  handleRemove,
  handleUpload,
  imgRef,
}) => {
  const { placeholder } = WORDS[lang],
    _body = {
      placeholder: placeholder.note,
      name: "body",
      handleChange,
      multiline: true,
      inputValue: note.body,
      rows: 18,
      rowsMax: 200,
      readOnly: !note.writable,
    };
  return (
    <Slide direction="right" in={true}>
      <div className="add-note-root">
        <Gallery handleRemove={handleRemove} />
        <InputBase {..._body} />
        <input
          multiple={true}
          type="file"
          accept="image/*"
          className="display-none opacity-0 fixed"
          style={{ top: "-500px", right: "-1000px" }}
          ref={imgRef}
          onChange={() => {
            const files = Array.prototype.slice.call(imgRef.current.files);
            files.forEach(async (file) => {
              file = await toBase64(file);
              handleUpload(file);
            });
          }}
        />
      </div>
    </Slide>
  );
};
const mapStateToProp = ({ app }) => ({
  lang: app.lang,
});
export default connect(mapStateToProp, {})(Note);
