import React, { useState } from "react";
import { connect } from "react-redux";
import { ComboBox } from "../../Utils/Input";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  Slide,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import WORDS from "../../../lang/app";
import { fetchCollaborators } from "../../../actions/appActions";
import RemoveIcon from "@material-ui/icons/Cancel";
import noCollaborator from "../../../img/nullCollaborator.svg";
const Colleague = ({
  avatar,
  email = " ",
  _id,
  name,
  handleRemove,
  toggleCheck,
  writable,
}) => (
  <ListItem key={_id}>
    <ListItemAvatar>
      <Avatar alt={email} src={avatar}>
        {email[0]}
      </Avatar>
    </ListItemAvatar>
    <ListItemText id={_id} primary={name} secondary={email} />
    <ListItemSecondaryAction>
      <Checkbox
        checked={writable}
        onChange={({ target: { checked } }) =>
          toggleCheck({ checked, cid: _id })
        }
      />
      <Tooltip title="Remove from group">
        <IconButton
          edge="end"
          aria-label="delete"
          size="small"
          onClick={() => handleRemove(_id)}
        >
          <RemoveIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  </ListItem>
);

const Collaborator = ({
  collaborators = [],
  handleChange,
  handleRemove,
  lang,
  fetchCollaborators,
  toggleCheck,
}) => {
  const { placeholder, label } = WORDS[lang],
    [users, setUsers] = useState([]),
    collaborator = {
      placeholder: placeholder.collaborator,
      label: label.collaborator,
      options: users.map(({ email }) => email),
      name: "collaborator",
      autoCompleteProps: {
        noOptionsText: "No user found",
      },
      handleChange: (val) => {
        if (!collaborators.find(({ email }) => email === val)) {
          const user = users.find(({ email }) => email === val);
          handleChange(user, "collaborators");
        }
      },
      inputChange: (email) => fetchCollaborators({ email, setUsers }),
    };
  return (
    <Slide direction="left" in={true}>
      <div className=" px-4">
        <div className="py-1 ">
          <ComboBox {...collaborator} margin="dense" />
        </div>

        {collaborators.length > 0 ? (
          <List className="xs:min-w-400 collaborator-lists">
            <li className="py-1 text-right pr-12">Write</li>
            {collaborators.map((collaborator) => (
              <Colleague
                {...collaborator}
                handleRemove={handleRemove}
                toggleCheck={toggleCheck}
              />
            ))}
          </List>
        ) : (
          <div className="flex justify-center items-center p-8">
            <img
              src={noCollaborator}
              className=" xs:max-w-sm w-full"
              alt="No collaborator"
            />
          </div>
        )}
      </div>
    </Slide>
  );
};
const mapStateToProp = ({ app }) => ({
  lang: app.lang,
  collaborators: app.popover.data.collaborators,
});

export default connect(mapStateToProp, { fetchCollaborators })(Collaborator);
