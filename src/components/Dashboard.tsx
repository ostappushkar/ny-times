import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IProps, IArticle } from "../App";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import { watchAuthState } from "../services/auth";
import { getArticles } from "../services/articles";
const Dashboard = () => {
  const [dialogOpen, openDialog] = useState<boolean>(false);
  const articles: Array<IArticle> = useSelector(
    (state: IProps) => state.articles
  );
  const isLogged: boolean = useSelector((state: IProps) => state.isLogged);
  const handleDialogOpen = (e) => {
    if (!isLogged) {
      e.preventDefault();
      openDialog(true);
    }
  };
  const handleDialogClose = () => {
    openDialog(false);
  };
  useEffect(() => {
    watchAuthState();
    getArticles();
  }, []);
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Top stories from NY Times</Typography>
      <Grid container spacing={3}>
        {articles.length === 0 && <CircularProgress />}
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
                        to={{
                          pathname: "/article",
                          state: { article: article },
                        }}
                        onClick={handleDialogOpen}
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
                  {/*   <Grid
                    className="article-image"
                    item
                    md={2}
                    sm={3}
                    lg={2}
                    xs={4}
                  ></Grid> */}
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

export default Dashboard;
