import React, { useEffect, useRef } from "react";
import GroupedTweetHistogram from "../../components/groupedTweetHistogram/GroupedTweetHistogram";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import css from "./TweetGroupPage.module.css";
import * as d3 from "d3";

const TweetGroupsPage = ({ tweets }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(100px,5px)`);
        title.style("opacity", 1);
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <h3
        ref={titleRef}
        style={{
          position: "relative",
          opacity: 0,
          left: "100px",
          top: "-5px",
        }}
        className={css.title}
      >
        Which assets inspire people to tweet?
      </h3>

      <section className={css.container}>
        <GroupedTweetHistogram tweets={tweets} />
        <section className={css.text}>
          <Paragraph className={css.textSection}>
          - Tesla has the highest engagement in terms of likes, retweets, and shares.
          <br></br> 
          - This makes sense given that Elon Musk is a crucial component of Tesla and has the most interactions with the company. 
          <br></br> 
          - Another thing to remember is that tweets are typically liked considerably more often than they are retweeted or replied to. 
          <br></br> 
          - Following an Elon Musk tweet, all asset categories under consideration increased. However, as the values of all assets have risen over these periods, it is not clear what is to blame.
          </Paragraph>
        </section>
      </section>
    </Layout>
  );
};

export default TweetGroupsPage;
