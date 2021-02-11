import React from "react";
import "./TextItem.css";
import Typography from '@material-ui/core/Typography';

/** Component for each word controlling highlight state. */
function TextItem({data,value}) {
    const getHighlight = () => {
      if ((Math.floor(data.info.start / 2000) % value) === 0) {
            return "highlight"
        }
        return ""
    }
 // adding typography component for styling well paragraph
  return (
        <Typography suppressContentEditableWarning={true} className={getHighlight()} contentEditable={true} color="textSecondary" component="span">
          {`${data.text} `}
        </Typography>
  );
}

export default TextItem;
