import React, { useEffect, useRef } from "react";
import EngagementRanking from "../../components/engagementRanking/EngagementRanking";
import Layout from "../../components/layout/Layout";
import Paragraph from "../../components/paragraph/Paragraph";
import css from "./EngagementRankingPage.module.css";
import * as d3 from "d3";

const EngagementRankingPage = ({ tweets, selectedDataset }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(0,100px)`);
        title.style("opacity", 1);
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <h3
        ref={titleRef}
        style={{ top: "-100px", opacity: 0 }}
        className={css.title}
      >
        What kind of tweets occur before market fluctuations?
      </h3>
      <section style={{ height: "50vh" }} id="disable">
        <EngagementRanking tweets={tweets} selectedDataset={selectedDataset} />
      </section>
      <section className={css.texts}>
        <section style={{ display: "flex", width: "600px", gap: "48px" }}>
          <Paragraph>
            A remarkable observation has been made indicating that tweets with a higher level of engagement demonstrate a positive relationship with increased variability in the subsequent changes in market prices. This suggests that the extent of engagement received by tweets may have an impact on the level of fluctuation experienced in the market.
          </Paragraph>
          <Paragraph>
            A noticeable correlation emerges when examining tweets that garner an unusually high number of replies, as these tend to coincide with substantial fluctuations in the market. It suggests a connection between the level of engagement on Twitter and the subsequent volatility experienced within the market.
          </Paragraph>
        </section>
      </section>
    </Layout>
  );
};

export default EngagementRankingPage;
