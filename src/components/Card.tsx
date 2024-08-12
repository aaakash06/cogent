import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { IPost } from "@/database/models.db";
import ParseHTML from "./ParseHTML";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardComponent({ post }: { post: IPost }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={post.title || "title"}
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        className="h-[200px] object-cover"
        image="https://firebasestorage.googleapis.com/v0/b/cogent-5dcf9.appspot.com/o/1723224687411catconscience.jpg?alt=media&token=22ebeb8e-6fcc-424b-a443-1acf34849751"
        alt="Paella dish"
      /> */}
      <div className="relative w-full h-[200px]">
        <Image alt="cat" src={post.img!} className="object-cover" fill></Image>
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <ParseHTML content={post.content}></ParseHTML>
        </Typography>
      </CardContent>
    </Card>
  );
}
