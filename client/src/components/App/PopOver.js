import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  Typography,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Slide,
  Fade,
  Paper,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/CropOriginal";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ShareIcon from "@material-ui/icons/PersonAddOutlined";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import { useTheme } from "@material-ui/core/styles";
import WORDS from "../../lang/app";
import { InputBase } from "../Utils/Input";
import {
  showPopover,
  hidePopover,
  handleEdit,
  handleDelete,
} from "../../actions/appActions";
import {
  Site,
  Note,
  Personal,
  CreditCard,
  BankAccount,
  Collaborator,
} from "./Items";
import PasswordIcon from "@material-ui/icons/Lock";
import NoteIcon from "@material-ui/icons/Note";
import CardIcon from "@material-ui/icons/CreditCard";
import BankIcon from "@material-ui/icons/AccountBalance";
import AddressIcon from "@material-ui/icons/ContactMail";
import LanguageIcon from "@material-ui/icons/Language";
import TimeAgo from "react-timeago";
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const PopOver = ({
  lang,
  popover: { component, data },
  domain,
  own,
  edited,
  collaborators,
  hidePopover,
  showPopover,
  handleEdit,
  writable,
  handleDelete,
}) => {
  const { placeholder } = WORDS[lang],
    [curComponent, setCurComponent] = useState(component),
    [prevComponent, setPrevComponent] = useState({}),
    descriptionElementRef = useRef(null),
    imgRef = useRef(),
    theme = useTheme(),
    fullScreen = useMediaQuery(theme.breakpoints.down("xs")),
    handleImageRemove = (imgIndex) =>
      handleEdit({ component, imgIndex, removeImage: true }),
    handleImageUpload = (file) =>
      handleEdit({ component, file, addImage: true }),
    handleCollaboratrRemove = (cid) =>
      handleEdit({ component, cid, removeUser: true }),
    handleChange = (value, name) =>
      handleEdit({
        component,
        name,
        value,
        addNewCollaborator: name === "collaborators",
      }),
    toggleCheck = ({ checked, cid }) =>
      handleEdit({ component, checked, cid, toggleCheckBox: true }),
    title = {
      placeholder: placeholder.title,
      inputValue: data.title,
      name: "title",
      handleChange,
    };

  React.useEffect(() => {
    if (component) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
      setCurComponent(component);
    }
  }, [component, data]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={!!component}
        onClose={hidePopover}
        scroll="paper"
        maxWidth="xs"
        TransitionComponent={fullScreen ? Transition : Fade}
      >
        {curComponent !== "NewItem" && (
          <DialogTitle>
            <div className="flex items-center">
              {component === "Site" && (
                <Avatar
                  className="mr-2 relative"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    top: "-3px",
                    minHeight: 20,
                    minWidth: 20,
                  }}
                  alt={domain}
                  src={`https://logo.clearbit.com/${domain}?size=800`}
                >
                  <LanguageIcon />
                </Avatar>
              )}
              <InputBase {...title} autoFocus={true} />
              <div style={{ display: fullScreen ? "inline-block" : "none" }}>
                <IconButton size="small" onClick={hidePopover}>
                  <BackIcon />
                </IconButton>
              </div>
            </div>
          </DialogTitle>
        )}

        {/* dividers={scroll === "paper"} */}
        <DialogContent className="font-serif">
          <div ref={descriptionElementRef} tabIndex={-1}>
            {curComponent === "Site" ? (
              <Site handleChange={handleChange} site={data} />
            ) : curComponent === "Note" ? (
              <Note
                handleChange={handleChange}
                handleRemove={handleImageRemove}
                handleUpload={handleImageUpload}
                imgRef={imgRef}
                note={data}
              />
            ) : curComponent === "Personal" ? (
              <Personal handleChange={handleChange} personal={data} />
            ) : curComponent === "Card" ? (
              <CreditCard handleChange={handleChange} card={data} />
            ) : curComponent === "Bank" ? (
              <BankAccount handleChange={handleChange} bank={data} />
            ) : curComponent === "Collaborator" ? (
              <Collaborator
                handleRemove={handleCollaboratrRemove}
                handleChange={handleChange}
                toggleCheck={toggleCheck}
              />
            ) : curComponent === "NewItem" ? (
              <div className="p-4  text-center">
                <h2 className="m-2">
                  {lang === "EN"
                    ? "Choose the item you want to create"
                    : "သင်ဖန်တီးလိုသောပစ္စည်းကိုရွေးချယ်ပါ"}
                </h2>
                <div className="flex flex-wrap px-1 justify-center">
                  <Paper
                    className="p-6 md:p-8 m-2 md:m-4  cursor-pointer rounded hover:shadow-lg bg-gray-200"
                    onClick={() =>
                      showPopover({
                        component: "Site",
                        data: { writable: true, own: true },
                      })
                    }
                  >
                    <PasswordIcon fontSize="large" />
                  </Paper>
                  <Paper
                    className="p-6 md:p-8 m-2 md:m-4  cursor-pointer rounded hover:shadow-lg bg-gray-200"
                    onClick={() =>
                      showPopover({
                        component: "Note",
                        data: { writable: true, own: true },
                      })
                    }
                  >
                    <NoteIcon fontSize="large" />
                  </Paper>
                  <Paper
                    className="p-6 md:p-8 m-2 md:m-4  cursor-pointer rounded hover:shadow-lg bg-gray-200"
                    onClick={() =>
                      showPopover({
                        component: "Card",
                        data: { writable: true, own: true },
                      })
                    }
                  >
                    <CardIcon fontSize="large" />
                  </Paper>
                  <Paper
                    className="p-6 md:p-8 m-2 md:m-4  cursor-pointer rounded hover:shadow-lg bg-gray-200"
                    onClick={() =>
                      showPopover({
                        component: "Bank",
                        data: { writable: true, own: true },
                      })
                    }
                  >
                    <BankIcon fontSize="large" />
                  </Paper>
                  <Paper
                    className="p-6 md:p-8 m-2 md:m-4  cursor-pointer rounded hover:shadow-lg bg-gray-200"
                    onClick={() =>
                      showPopover({
                        component: "Personal",
                        data: { writable: true, own: true },
                      })
                    }
                  >
                    <AddressIcon fontSize="large" />
                  </Paper>
                </div>
              </div>
            ) : (
              <></>
            )}
            {curComponent !== "Collaborator" && own ? (
              <ul className="flex list-none pb-2 pt-0 px-4  flex-wrap ">
                {collaborators.map(({ avatar, email = "", _id }) => (
                  <li key={_id} className="m-1">
                    <Chip
                      size="small"
                      avatar={
                        <Avatar alt="Remy Sharp" src={avatar}>
                          {email[0]}
                        </Avatar>
                      }
                      label={email}
                      onDelete={() => handleCollaboratrRemove(_id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
        {curComponent !== "NewItem" && (
          <DialogActions>
            <div className="flex px-1 flex-1 text-gray-700 ">
              {edited && (
                <Typography variant="caption">
                  Edited <TimeAgo date={edited} minPeriod={60} />
                </Typography>
              )}
            </div>
            <div className="flex items-center float-left">
              {curComponent === "Note" && writable && (
                <Tooltip
                  title="Add image"
                  onClick={() => imgRef.current.click()}
                >
                  <IconButton size="small">
                    <ImageIcon />
                  </IconButton>
                </Tooltip>
              )}
              {data._id && own && (
                <Tooltip title="Delete" onClick={() => handleDelete(component)}>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              {curComponent === "Collaborator" ? (
                <Tooltip
                  title="Back"
                  onClick={() => {
                    setCurComponent(prevComponent);
                  }}
                >
                  <IconButton size="small">
                    <ArrowIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                own && (
                  <Tooltip
                    title="Add collaborator"
                    onClick={() => {
                      setPrevComponent(curComponent);
                      setCurComponent("Collaborator");
                    }}
                  >
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                )
              )}
            </div>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

const mapStateToProp = ({ app }) => ({
  lang: app.lang,
  popover: app.popover,
  collaborators: app.popover.data.collaborators || [],
  domain: app.popover.data.domain || "",
  own: app.popover.data.own || "",
  edited: app.popover.data.updatedAt || "",
  writable: app.popover.data.writable,
});
export default connect(mapStateToProp, {
  showPopover,
  hidePopover,
  handleEdit,
  handleDelete,
})(PopOver);
