import { useEffect, useState } from "react";
import css from "./App.module.css";
import Navigation from "./components/navigation/Navigation";
import * as d3 from "d3";
import { Route, Routes } from "react-router-dom";
import MainChartPage from "./pages/MainChartPage/MainChartPage";
import EngagementRankingPage from "./pages/EnagementRankingPage/EngagementRankingPage";
import TweetGroupsPage from "./pages/TweetGroupsPage/TweetGroupsPage";
import ConclusionPage from "./pages/ConclusionPage/ConclusionPage";
import Spinner from "./components/spinner/Spinner";
import Introduction from "./pages/IntroductionPage/IntroductionPage";

function App() {
  const [selectedDataset, setSelectedDataset] = useState("Bitcoin");
  const [datasets, setDatasets] = useState(undefined);
  const [tweets, setTweets] = useState(undefined);
  const [allTweets, setAllTweets] = useState(undefined);

  useEffect(() => {
    (async () => {
      const bitcoin = await d3.csv("/coin_Bitcoin.csv");
      const dogecoin = await d3.csv("/coin_Dogecoin.csv");
      const tesla = await d3.csv("/tesla.csv");
      const tweetsDataset = await d3.csv("/alltweets.csv");

      setAllTweets(tweetsDataset);

      const datasets = {
        Bitcoin: bitcoin,
        Dogecoin: dogecoin,
        Tesla: tesla,
      };

      const filter_regex = (regex) => {
        return (tweet) => {
          return tweet.tweet.toLowerCase().match(new RegExp(regex));
        };
      };

      const bisector = d3.bisector((d) => new Date(d.Date));

      // basic filter 'bitcoin': 36, 'doge': 67, 'tesla': 1227, 'tesla stock': 13,
      const filtered_tweets = {
        Bitcoin: tweetsDataset
          .filter(filter_regex(`(bitcoin|btc)`))
          .map((tweet) => {
            const index =
              bisector.left(bitcoin, new Date(tweet.created_at)) - 1;
            return {
              ...tweet,
              dayChange:
                (bitcoin[index + 2].Close - bitcoin[index].Close) /
                bitcoin[index].Close,
            };
          }),
        Dogecoin: tweetsDataset.filter(filter_regex(`doge`)).map((tweet) => {
          const index = bisector.left(dogecoin, new Date(tweet.created_at)) - 1;
          return {
            ...tweet,
            dayChange:
              (dogecoin[index + 2].Close - dogecoin[index].Close) /
              dogecoin[index].Close,
          };
        }),
        Tesla: tweetsDataset
          .filter(
            filter_regex(`((tesla.*(stock|private))|(tsla))|(buy.*tesla.*)`)
          )
          .map((tweet) => {
            const index = bisector.left(tesla, new Date(tweet.created_at)) - 1;
            return {
              ...tweet,
              dayChange:
                (tesla[index + 2].Close - tesla[index].Close) /
                tesla[index].Close,
              days: [tesla[index + 2], tesla[index]],
            };
          }),
      };

      setDatasets(datasets);
      setTweets(filtered_tweets);
    })();
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    switch (selectedDataset) {
      case "Bitcoin":
        d3.select(".icon").attr("href", "/Bitcoin.svg");
        root.style.setProperty("--main-color", "#fcd8ae");
        root.style.setProperty("--text-color", "#1c1c1c");
        root.style.setProperty("--header-color", "#E9983D");
        break;

      case "Dogecoin":
        d3.select(".icon").attr("href", "/Dogecoin.svg");
        root.style.setProperty("--main-color", "#fff1b8");
        root.style.setProperty("--text-color", "#1c1c1c");
        root.style.setProperty("--header-color", "#B6A047");
        break;
      case "Tesla":
        d3.select(".icon").attr("href", "/Tesla.svg");
        root.style.setProperty("--main-color", "#fcc2c0");
        root.style.setProperty("--text-color", "#1c1c1c");
        root.style.setProperty("--header-color", "#D53933");
        break;

      default:
        break;
    }
  }, [selectedDataset]);

  if (!tweets || !datasets || !allTweets)
    return (
      <div className={css.loadingContainer}>
        <Spinner />
      </div>
    );

  return (
    <div className="App">
      <div className={css.container}>
        <header className={css.header}>
          <Navigation
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        </header>
        <article className={css.content}>
          <Routes>
            <Route
              path="/"
              element={<Introduction nTweets={allTweets.length} />}
            />
            <Route
              path="/main"
              element={
                <MainChartPage
                  tweets={tweets?.[selectedDataset]}
                  asset={datasets?.[selectedDataset]}
                />
              }
            />
            <Route
              path="/ranking"
              element={
                <EngagementRankingPage tweets={tweets?.[selectedDataset]} selectedDataset={selectedDataset} />
              }
            />
            <Route
              path="/groups"
              element={<TweetGroupsPage tweets={tweets} />}
            />
            <Route
              path="/conclusion"
              element={<ConclusionPage tweets={tweets} />}
            />
          </Routes>
        </article>
      </div>
    </div>
  );
}

export default App;
