import {useEffect, useState} from "react";
import SearchAppBar from "./components/SearchAppBar";
import NewsContainer from "./components/NewsContainer";
import NewsAPI from "newsapi";
import {Container, makeStyles} from '@material-ui/core';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  loadMore: {
    paddingBottom: theme.spacing(2),
  }
}));


export default function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const theme = unstable_createMuiStrictModeTheme();
  const classes = useStyles(theme);

  const fetchNews = async () => {
    setLoading(true);
    console.log(loading);
    const newsApi = new NewsAPI('fc6d8e4f9c7342d2bdab5634956f9693', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });
    const filters = {
      country: 'in',
      pageSize: 20,
      page: page,
      category: category,
    }

    if(query !== ''){
      filters.q = query;
    }
    
    newsApi.v2.topHeadlines(filters).then(response => {
      console.log(response);
      setTotalResults(response.totalResults);
      setPage(page + 1);
      setNewsArray([...newsArray, ...response.articles]);
      setLoadMore(false);
      setLoading(false);
    });
  };

  useEffect(() => {
    if(loadMore){
      fetchNews();
    }
  }, [loadMore]);

  useEffect(()=> {
    setPage(1);
    setTotalResults(0);
    setNewsArray([]);
    setLoadMore(true);
  }, [category, query]);

  return (
    <div>
      <ThemeProvider theme={theme}>
      <SearchAppBar 
        setCategory={setCategory}
        setQuery={setQuery} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {totalResults > 0 ?
              <NewsContainer newsArray={newsArray} /> : 
              !loading ? <Alert severity="info">No results found for the search</Alert> : null }
            {loading ? <LinearProgress /> : null}
          </Container>
          <Box 
            className={classes.loadMore}
            display="flex"
            maxWidth="lg"
            alignItems="center"
            justifyContent="center">
          {totalResults > (page-1)*20 ? 
              <Button variant="contained" onClick={() => setLoadMore(true)} disabled={loading}>
                {loading && <CircularProgress size={16} />}
                {!loading && 'Load More'}
              </Button> : null
            }
          </Box>
      </main>
      </ThemeProvider>
    </div>
  );
}
