import React from "react";
import { Typography, Container, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IProps } from "../App";
const Article = (props: any) => {
  const article = props?.location?.state?.article || null;
  const isLogged = useSelector((state: IProps) => state.isLogged);
  let imageIndex = article.multimedia.findIndex(
    (x: any) => x.format === "superJumbo"
  );

  const handleBack = () => {
    props.history.goBack();
  };
  if (isLogged && article) {
    return (
      <Container maxWidth="md">
        <Button
          onClick={handleBack}
          className="back-button"
          startIcon={<ArrowBackIosIcon />}
        >
          Go Back
        </Button>
        <img
          alt={article.multimedia[imageIndex].copyright}
          className="article-image-lg"
          src={article.multimedia[imageIndex].url}
        ></img>
        <Typography variant="h3">{article.title}</Typography>
        <Typography variant="h6"> {article.byline}</Typography>
        <div className="article-tags">
          {article.des_facet.map((tag, index) => {
            return (
              <Chip className="article-tag-item" key={index} label={tag} />
            );
          })}
        </div>
        <Typography variant="body1">{article.abstract} </Typography>
      </Container>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
};
export default Article;
