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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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
            (x: any) => x.format === "thumbLarge"
          );
          return (
            <Grid className="article-item" key={index} item xs={12}>
              <Paper elevation={3}>
                <Grid container className="article-content">
                  <Grid
                    className="article-info"
                    item
                    xs={8}
                    sm={9}
                    lg={10}
                    md={10}
                  >
                    <div className="article-title">
                      <Typography variant="h6"> {article.title}</Typography>
                      <Typography variant="subtitle2">
                        {" "}
                        {article.byline}
                      </Typography>
                    </div>
                    <div className="article-read-more">
                      <Button endIcon={<ArrowForwardIosIcon />}>
                        <Link
                          to={{
                            pathname: "/article",
                            state: { article: article },
                          }}
                          onClick={handleDialogOpen}
                        >
                          {" "}
                          Read more
                        </Link>
                      </Button>
                    </div>
                  </Grid>
                  <Grid
                    className="article-image"
                    item
                    md={2}
                    sm={3}
                    lg={2}
                    xs={4}
                  >
                    <img
                      alt={article.multimedia[imageIndex].copyright}
                      src={article.multimedia[imageIndex].url}
                    ></img>
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

export default Dashboard;
