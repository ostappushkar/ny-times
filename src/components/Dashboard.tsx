import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { IArticle } from "../App";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import { watchAuthState } from "../redux/user/actions";
import {
  getArticles,
  setArticle,
  clearArticle,
} from "../redux/article/actions";
import { IStoreState } from "../redux/store";
import { connect } from "react-redux";
interface IDashboard {
  articles: IArticle[];
  loading: boolean;
  isLogged: boolean;
  watchAuthState: Function;
  getArticles: Function;
  setArticle: Function;
  clearArticle: Function;
}
const Dashboard = (props: IDashboard) => {
  const {
    articles,
    loading,
    isLogged,
    watchAuthState,
    getArticles,
    setArticle,
    clearArticle,
  } = props;
  const [dialogOpen, openDialog] = useState<boolean>(false);
  const handleDialogClose = () => {
    openDialog(false);
  };
  useEffect(() => {
    clearArticle();
    watchAuthState();
    getArticles();
  }, [watchAuthState, getArticles, clearArticle]);
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Top stories from NY Times</Typography>
      <Grid className="dashboard" container spacing={3}>
        {loading && <CircularProgress />}
        {articles.map((article, index) => {
          return (
            <Grid
              className="article-item"
              key={index}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Paper className="thumbnail" elevation={3}>
                <img
                  loading="lazy"
                  alt={article.byline}
                  src={article.image}
                ></img>
                <div className="overlay"></div>
                <Grid container className="article-content">
                  <Grid
                    className="article-info"
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    md={12}
                  >
                    <div className="article-title">
                      <Link
                        to="/article"
                        onClick={(e) => {
                          if (!isLogged) {
                            e.preventDefault();
                            openDialog(true);
                          } else {
                            setArticle(article);
                          }
                        }}
                      >
                        <Typography
                          className="article-author"
                          variant="subtitle2"
                        >
                          {" "}
                          {article.byline}
                        </Typography>
                        <Typography variant="h6"> {article.title}</Typography>
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Not permitted</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please login to read this article
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
const mapsStateToProps = (state: IStoreState) => {
  return {
    isLogged: state.login.isLogged,
    loading: state.article.loading,
    articles: state.article.articles,
  };
};
const mapsDispatchToProps = {
  watchAuthState,
  getArticles,
  setArticle,
  clearArticle,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Dashboard);
