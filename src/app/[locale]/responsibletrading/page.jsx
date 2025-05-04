"use client";
import { project_name } from "../../../../env";
import ResponsibleBanner from "../../../../public/img/Hero3.jpg";
import { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";

const ResponsibleTrading = () => {
  const refHandle = useRef();

  useEffect(() => {
    if (refHandle.current) {
      refHandle.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Banner
        text="Responsible Trading"
        smallText=""
        image={ResponsibleBanner}
      />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>Responsible Trading</h1>
            <p>
              When it comes to trading on {project_name} or using its social
              trading features, we encourage responsible behaviour among all our
              users. Our “responsible trading policy” calls on traders to
              protect themselves from emotional decision making that can result
              in unnecessary losses.
            </p>

            <p>
              Novice traders, in particular, tend to rely more on “gut
              feelings,” because they don’t necessarily have a lot of experience
              in financial trading to make rational and informed choices.
            </p>

            <p>
              To help traders avoid making rash online trading decisions,{" "}
              {project_name}, in accordance with local financial regulators,
              recommends the following:
            </p>

            <p>
              Maximum leverage according to the following list:
              <br />
              30:1 for major currency pairs;
            </p>

            <p>20:1 for non-major currency pairs, gold and major indices;</p>

            <p>
              10:1 for commodities other than gold and non-major equity indices;
            </p>

            <p>5:1 for individual equities and other reference values;</p>

            <p>2:1 for cryptocurrencies;</p>

            <p>
              Place no more than 20% of your equity on one trade
              <br />
              The key factors of smart investing are low leverage and portfolio
              diversity, a fact attested to by the portfolios of {project_name}
              ’s top traders.
            </p>

            <p></p>

            <p>Here are some tips for becoming a more responsible trader:</p>

            <p>
              Only invest in what you know: Don’t follow random tips or gut
              feelings. If you want to invest in a certain asset, familiarise
              yourself with its history and tendencies. Look at your Risk Score:
              Your unique Risk Score is a great way to see if you are a
              responsible trader. Keeping a Risk Score of 3 or lower on{" "}
              {project_name} is recommended. Adjust your portfolio: Diversify
              your portfolio with assets across many classes. If you don’t want
              to monitor your portfolio frequently, opt for lower-involvement
              instruments, such as CopyPortfolios™ or our CopyTrader™ system.
              Copy other responsible traders: When you copy another trader, look
              at their Risk Score, history, and portfolio diversity.
            </p>

            <p></p>
            <p></p>

            <p>
              Human Psychology & Emotional Trading
              <br />
              Traders of all levels can rely too heavily on their emotions while
              trading. This is a mistake as fear, greed and excitement can play
              a hand in making bad decisions. Always have a trading plan, and
              stick to it no matter what happens. When creating your trading
              plan, incorporate the tips from the section above, paying specific
              attention to:
            </p>

            <p>
              Maximum leverage
              <br />
              Portfolio diversity
              <br />
              Risk scores and profiles of other traders
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResponsibleTrading;
