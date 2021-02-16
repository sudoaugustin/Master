import React from "react";
import { connect } from "react-redux";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Tooltip,
  Slide,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import LZString from "lz-string";

const Gallery = ({ images, handleRemove }) => {
  const theme = useTheme(),
    fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return images.length > 0 ? (
    <Slide direction="right" in={true}>
      <div className="mb-3 flex flex-wrap duration-1000 transition-all ">
        <GridList cellHeight={180} style={{ minWidth: fullScreen ? 200 : 400 }}>
          {images.map((image, index) => (
            <GridListTile key={index}>
              <img
                src={LZString.decompressFromEncodedURIComponent(image)}
                alt={index}
              />
              <GridListTileBar
                style={{ background: "rgba(0, 0, 0, 0)" }}
                actionIcon={
                  <Tooltip title="Remove">
                    <IconButton
                      size="small"
                      id={index}
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Slide>
  ) : (
    <></>
  );
};

const mapStateToProp = ({ app }) => ({
  images: app.popover.data.images || [],
});
export default connect(mapStateToProp, {})(Gallery);
