import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IProps } from "../App";
import Http from "../services/http";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { watchAuthState } from "../services/auth";
const Dashboard = () => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [dialogOpen, openDialog] = useState<boolean>(false);
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
    const fetchData = async () => {
      const response: any = await Http.get("/svc/topstories/v2/home.json");
      setArticles(response?.results);
    };
    fetchData();
  }, []);
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Top stories from NY Times</Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => {
          let imageIndex = article.multimedia.findIndex(
            (x: any) => x.format === "superJumbo"
          );
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
                  alt={article.multimedia[imageIndex].copyright}
                  src={article.multimedia[imageIndex].url}
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
