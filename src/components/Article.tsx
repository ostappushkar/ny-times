import React from "react";
import { Typography, Container, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IArticle } from "../App";
import { IStoreState } from "../redux/store";
const Article = (props: any) => {
  const article: IArticle = props?.location?.state?.article || null;
  const isLogged = useSelector((state: IStoreState) => state.login.isLogged);

  const handleBack = () => {
    props.history.goBack();
  };
  if (isLogged && article) {
    return (
      <Container className="thumbnail-parent" maxWidth={false}>
        <div className="thumbnail-article">
          <img
            alt={article.byline}
            className="article-image-lg"
            src={article.image}
          ></img>
          <div className="overlay"></div>
        </div>
        <Container className="article-body" maxWidth="md">
          <Button
            onClick={handleBack}
            className="back-button"
            startIcon={<ArrowBackIosIcon />}
          >
            Go Back
          </Button>

          <Typography variant="h3">{article.title}</Typography>
          <Typography variant="h6"> {article.byline}</Typography>
          <div className="article-tags">
            {article.tags.map((tag, index) => {
              return (
                <Chip className="article-tag-item" key={index} label={tag} />
              );
            })}
          </div>
          <Typography variant="body1">{article.abstract} </Typography>
        </Container>
      </Container>
    );
  } else {
    return <Redirect to="/"></Redirect>;
  }
};
export default Article;
