import React, { useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import css from "../../pages/ConclusionPage/ConclusionPage.module.css";
import Paragraph from "../../components/paragraph/Paragraph";
import * as d3 from "d3";
import logo from "/elon_musk.jpeg";
import tesla from "/tesla-not-sold-bitcoin.webp";
import acceptBitcoin from "/accept-bitcoin.webp";
import bitcoin from "/Bitcoin.svg";
import downArrow from "/down_arrow.png";
const ConclusionPage = ({ }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

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
  }, []);

  return (
    <div className={css.container}>
      <div
        style={{
          position: "absolute",
          top: "28% ",
          left: "-100px",
          height: "50%",
        }}
      >
        <img src={logo} alt="Logo" height={"100%"} />
      </div>
      <Layout>
        <article className={css.content}> 
          <div  
            ref={titleRef}
            style={{ position: "relative", opacity: 0, left: "-100px", top: "-50px" }}
            className={css.title}
          >
            Not all correlations lead to causes.
          </div>

          <section
            className={css.conclusionText}
            style={{ position: "relative", opacity: 0 }}
            ref={textRef}
          >
            <Paragraph className={css.conclusionText}>
              Frequently making headlines around the world, Elon Musk's tweets appear seemly to have an impact on market movements.
              <br />
              <div
        style={{
          position: "absolute",
          justifyContent: "space-around",
          top: "250px",
          left: "auto",
          height: "50%",

        }}
      >
        <img src={tesla} alt="Logo" height={"100%"} />  
        <br></br>
        <img src={bitcoin} alt="Logo" height={"100%"} />  
        <img src={downArrow} alt="Logo" height={"100%"} />  
      </div>
      <div
        style={{
          position: "absolute",
          justifyContent: "space-around",
          top: "200px",
          left: "auto",
          height: "50%",
          marginLeft: "600px", marginTop:"40px"
        }}
      >
        <img src={acceptBitcoin} alt="Logo" height={"200%"} />
        </div>
              <br />
              Instances such as the tweet on May 17, 2021 where he tweeted “To
              clarify speculation, Tesla has not sold any Bitcoin” and the
              Bitcoin price fell by -15.01%
              However, just looking at his tweets only reveals parts of the
              picture and other factors could have an unknown impact. For
              example, just before he tweeted and clarified that Tesla had not
              sold any bitcoin, Tesla had announced that they would stop
              accepting bitcoin as a payment option, which may have had a
              greater influence on the Bitcoin price.
              <br />
              <br />
              
              <br />
              <br />
        
            </Paragraph>
          </section>
        </article>
      </Layout>
    </div>
  );
};

export default ConclusionPage;
