import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import css from "./IntroductionPage.module.css";
import { HeroStats } from "../../components/heroStats/HeroStats";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";
import Instruction from "../../components/instruction/Instruction";

const Introduction = ({ nTweets }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [showNavHint, setShowNavHint] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const title = d3.select(titleRef.current);
      setTimeout(() => {
        title.style("transform", `translate(100px,0)`);
        title.style("opacity", 1);
      }, 100);
    }
    if (textRef.current) {
      const text = d3.select(textRef.current);
      setTimeout(() => {
        text.style("transform", `translate(0,-100px)`);
        text.style("opacity", 1);
      }, 200);
    }
    setTimeout(() => {
      setShowNavHint(true);
    }, 5000);
  }, []);

  return (
    <Layout>
      <article className={css.content}>
        <div
          ref={titleRef}
          style={{ position: "relative", opacity: 0, left: "-100px" }}
          className={css.title}
        >
          Does Elon Musk engage in market manipulation?
        </div>

        <section className={css.stats}>
          <HeroStats
            size={70}
            value={nTweets}
            text={"Total number of tweets"}
          />
          <HeroStats
            size={70}
            value={95}
            text={"Twitter followers"}
            suffix={"M"}
          />
          <HeroStats
            size={70}
            value={255}
            text={"Net Worth"}
            prefix={"$"}
            suffix={"B"}
          />
        </section>
        <section
          className={css.introductionText}
          style={{ position: "relative", opacity: 0, bottom: "-100px" }}
          ref={textRef}
        >
          <Paragraph className={css.introductionText}>
            Elon Musk, one of the wealthiest individuals globally, is an iconic figure of the twenty-first century whose impact extends across various cultural aspects. He has established highly prosperous ventures such as PayPal, Tesla, and SpaceX.
            <br />
            <br />
            Due to Elon Musk's significant influence and substantial following, with nearly 80 million Twitter followers, his tweets possess the potential for wide-ranging consequences. In recent times, Elon Musk has faced scrutiny from media and regulators who have accused him of engaging in market manipulation of stocks and cryptocurrencies.
            <br />
            <br />
            The objective of this visualization is to demonstrate the impact of Elon Musk's tweets on the stock and cryptocurrency markets. Join us on this exploration as we delve into the potential market influence of Elon Musk.
          </Paragraph>
        </section>
        {showNavHint && <Instruction text={"Use arrow keys to navigate ›"} />}
      </article>
    </Layout>
  );
};

export default Introduction;
