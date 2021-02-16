import React from 'react'
import  {
  Badge,
  IconButton
} from '@material-ui/core'
export default(props)=>{
  const badge=props.showBadge && ({
    overlap:"circle",
    anchorOrigin:props.anchorOrigin,
    badgeContent:props.badge
  });
  return(
    <Badge
      {...props}
      {...badge}
      children={
        <IconButton
          onClick={props.onClick}
          color={props.color || "default"}
          children={
            <props.icon
              color={props.iconColor || "action"}
            />}
        />
      }
    />
  )
};
