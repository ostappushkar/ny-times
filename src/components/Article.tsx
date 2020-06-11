import React from "react";
import { Typography, Container, Button } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IArticle } from "../App";
import { IStoreState } from "../redux/store";

interface IArticlePage {
  isLogged: boolean;
  article: IArticle;
}

const Article = (props: IArticlePage) => {
  const { article, isLogged } = props;
  let history = useHistory();

  const handleBack = () => {
    history.goBack();
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
const mapsStateToProps = (state: IStoreState) => {
  return {
    isLogged: state.login.isLogged,
    article: state.article.currentArticle,
  };
};

export default connect(mapsStateToProps)(Article);
