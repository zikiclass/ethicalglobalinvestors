"use client";
import { project_name } from "../../../../env";
import GeneralBanner from "../../../../public/img/Hero3.jpg";
import { useEffect, useRef } from "react";
import { Footer, NavBar } from "../../HomeComponents";
import Banner from "../../components/Banner";
import "../../components/style1.css";

const GeneralRisk = () => {
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
        text="General Risk Disclosure"
        smallText=""
        image={GeneralBanner}
      />
      <div className="__section" ref={refHandle}>
        <div className="container">
          <div className="content">
            <h1>General Risk Disclosure</h1>
            <p>
              This notice provides you with information about the risks
              associated with investment products, in which you may invest,
              through services provided to you by {project_name} Group entities.
            </p>

            <p></p>
            <p>
              Investment products offered by {project_name} include stocks,
              Exchange-Traded Funds (ETFs) and cryptocurrencies, in which you
              gain ownership of the underlying asset. In addition,{" "}
              {project_name} offers contracts for differences (CFDs) that offer
              exposure to currencies, commodities and indices.
            </p>

            <p>
              Any transactions relating to stocks, ETFs or cryptocurrencies in
              which {project_name} offers you leverage (which is not currently
              available for cryptocurrencies) or allows you to enter into short
              transactions, and/or some copy trading transactions (including
              CopyPortfolios), shall be considered CFD transactions.
            </p>

            <p>
              {project_name} also offers investors the opportunity to buy the
              underlying cryptocurrencies, stock or ETFs (i.e., BUY transactions
              for said assets using leverage 1) hold such assets and
              subsequently sell such assets. All transactions relating to
              cryptocurrencies are subject to the Cryptocurrencies Trading
              Addendum (“Cryptocurrencies Trading Addendum”).
            </p>

            <p>
              Since Cryptocurrency markets are decentralised and non-regulated,
              our Cryptocurrencies Trading Services as such term is defined in
              the Cryptocurrencies Trading Addendum, are unregulated services
              which are not governed by any specific European regulatory
              framework (including MIFID). Therefore, when {project_name}{" "}
              (Europe) Ltd. customers use our Cryptocurrencies Trading Service,
              they will not benefit from the protections available to clients
              receiving regulated investment services such as access to the
              Investor Compensation Fund for Customers of Cypriot Investment
              Firms and the UK Financial Ombudsman Service for dispute
              resolution. {project_name} (Europe) Ltd. customers will continue
              to benefit from the rules relating to best execution and client
              money and safekeeping of client assets. {project_name} (UK) Ltd.
              customers using the Cryptocurrencies Trading Service only will not
              benefit from the protections available to clients receiving
              regulated investment services such as access to the Financial
              Services Compensation Scheme (FSCS) and the Financial Ombudsman
              Service for dispute resolution. We will endeavour to enable you to
              benefit from rules relating to best execution and safekeeping of
              client assets.
            </p>

            <p>
              All of these products carry a high degree of risk and are not
              suitable for many investors. This notice provides you with
              information about the risks associated with these products, but it
              cannot explain all of the risks nor how such risks relate to your
              personal circumstances. If you are in doubt, you should seek
              professional advice. It is important that you fully understand the
              risks involved before deciding to trade with {project_name}, that
              you have adequate financial resources to bear such risks and that
              you monitor your positions carefully. Trading involves risk to
              your capital. You should not invest money that you cannot afford
              to lose, however, you cannot lose more than the equity in your
              account.
            </p>

            <p>
              NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THE TERMS AND
              CONDITIONS AND/OR THIS GENERAL RISK DISCLOSURE, FRENCH RESIDENTS
              SHALL BE ELIGIBLE TO INTRINSIC PROTECTION. ACCORDINGLY AND
              INDEPENDENTLY OF MARKET VOLATILITY, THEIR MAXIMUM LOSS WITH
              RESPECT TO EACH TRANSACTION SHALL BE THE TOTAL AMOUNT INVESTED IN
              SUCH TRANSACTION, AS UPDATED BY SUCH USER FROM TIME TO TIME.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>CFDS</b>
            </p>

            <p>
              CFD stands for “Contract For Difference,” meaning you are not
              buying the underlying asset, but, rather, purchasing a contract to
              settle the difference in the initial and ending price of the
              asset. When trading CFDs, you generally trade on margin, which
              means you only have to deposit a small percentage of the overall
              value of your position. This is known as “Leverage”, and even
              small market movements may have great impact, negative or
              positive, on your trading account.
            </p>

            <p>
              If the market moves against you, you may sustain a total loss
              greater than the funds invested in a specific position. You are
              responsible for all losses in your account up to the equity in
              your account.
            </p>

            <p>
              Before deciding to trade on margin, you should carefully consider
              your investment objectives, level of experience, and risk
              appetite. Our CFDs are not listed on any exchange. CFDs involve
              greater risk than investing in on-exchange products, as market
              liquidity cannot be guaranteed and it may be more difficult to
              liquidate an existing position. The prices and other conditions
              are set by us in accordance with our obligation to provide best
              execution as set out in our order execution policy, to act
              reasonably and in accordance with the applicable Terms and
              Conditions. The characteristics of our CFDs can vary substantially
              from the actual underlying market or instrument. Full details of
              all of our CFDs are set out on our website. In respect of
              corporate events, with respect to the underlying assets, we do not
              aim to make a profit from our clients from the outcome of
              corporate events such as rights issues, takeovers, mergers, share
              distributions or consolidations and open offers. We aim to reflect
              the treatment we receive, or, would receive if we were hedging our
              exposure to you in the underlying market. Ultimately, however, you
              are not dealing in the underlying market and, therefore, in
              relation to our CFDs, the treatment you receive may be less
              advantageous than if you owned the underlying instrument.
            </p>

            <p>
              CFDs are complex instruments and come with a high risk of losing
              money rapidly due to leverage. 67% of retail investor accounts
              lose money when trading CFDs with this provider. You should
              consider whether you understand how CFDs work, and whether you can
              afford to take the high risk of losing your money.
            </p>

            <p>
              CFDs are not suited to the long-term investor. If you hold a CFD
              open over a long period of time, the associated costs increase
              (such as overnight fees), and it may be more beneficial for you to
              buy the underlying asset instead. Sudden market movements, known
              as “gapping” may occur, causing a dramatic shift in the price of
              an underlying asset. Gapping may occur when the underlying market
              is closed, meaning the price on the underlying market may open at
              a significantly different level, and at a less advantageous price
              for you.
            </p>

            <p>
              At all times during which you have open positions, you must ensure
              that your account meets our margin requirements, which may change
              from time to time. Therefore, if our price moves against you, or
              if our margin requirements have changed, you may need to provide
              us with significant additional funds to meet your margin
              requirement at short notice, to maintain your open positions. If
              you do not do this, we will be entitled to close one or more or
              all of your positions and you alone will be responsible for any
              losses incurred as a result.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>Appropriateness</b>
            </p>

            <p>
              Before we open an account for you, we are required to make an
              assessment of whether the product(s) and/or services you have
              chosen are appropriate for you, and to warn you if, on the basis
              of the information you provide us, any product or service is not
              appropriate. If you decide to continue and open an account with
              us, you are confirming that you are aware of and understand the
              risks.
            </p>

            <p>
              <b>Position Monitoring</b>
            </p>

            <p>
              You should further ensure that you are able to monitor positions
              on your account at all times, as you are solely responsible for
              this. We are not responsible for monitoring positions on your
              account.
            </p>

            <p>
              <b>Copy Trading</b>
            </p>

            <p>
              {project_name} offers Social Trading Features. In making a
              decision to copy a specific trader or traders and/or follow a
              particular strategy, you must consider your entire financial
              situation, including financial commitments. You must understand
              that using Social Trading Features is highly speculative and that
              you could sustain significant losses exceeding the amount used to
              copy a trader or traders. The risks associated with Social Trading
              Features include, but are not limited to, automated trading
              execution whereby the opening and closing of trades will happen in
              your account without your manual intervention.
            </p>

            <p></p>

            <p>
              <b>Trading risks</b>
            </p>

            <p>
              Since Cryptocurrency markets are decentralised and non-regulated,
              our Cryptocurrencies Trading Services are unregulated services
              which are not governed by any specific European regulatory
              framework (including MIFID). This means that there is no central
              bank that can take corrective measures to protect the value of
              Cryptocurrencies in a crisis or issue more currency. Therefore,
              when {project_name} (Europe) Ltd. customers use our
              Cryptocurrencies Trading Services, they will not benefit from the
              protections available to clients receiving regulated investment
              services such as access to the Investor Compensation Fund for
              Customers of Cypriot Investment Firms and the Financial Ombudsman
              Service for dispute resolution. {project_name} (Europe) Ltd.
              customers will continue to benefit from the rules relating to best
              execution and client money and safekeeping of client assets.
            </p>

            <p>
              {project_name} (UK) Ltd. customers using Cryptocurrencies Services
              will not benefit from the protections available to clients
              receiving regulated investment services such as access to the
              Financial Services Compensation Scheme (FSCS) and the Financial
              Ombudsman Service for dispute resolution. We will endeavour to
              enable you to benefit from rules relating to best execution and
              safekeeping of client assets.
            </p>

            <p>
              CRYPTOCURRENCY MARKETS ARE DETERMINED BY DEMAND AND SUPPLY ONLY.
              The Cryptocurrency market is a dynamic arena and its respective
              prices are often highly unpredictable and volatile. The
              Cryptocurrency prices are usually not transparent, highly
              speculative and susceptible to market manipulation. In the
              worst-case scenario, the product could be rendered worthless.
            </p>

            <p>
              It is important to make a distinction between indicative prices
              which are displayed on charts and dealable prices which are
              displayed on our trading platform. Indicative quotes only give an
              indication of where the market is. Because Cryptocurrency markets
              are decentralised, meaning they lack a single central exchange
              where all transactions are conducted, each market maker may quote
              slightly different prices. Therefore, any prices displayed on any
              chart made available by us or by a third party will only reflect
              “indicative” prices and not necessarily actual “dealing” prices
              where trades can be executed.
            </p>

            <p>
              Cryptocurrency trading is prone to being misused for illegal
              activities due to the anonymity of transactions and investors
              would be adversely affected if law enforcement agencies were to
              investigate any alleged illicit activities.
            </p>

            <p>
              ACCORDINGLY, CRYPTOCURRENCIES SHOULD BE SEEN AS AN EXTREMELY
              HIGH-RISK ASSET AND YOU SHOULD NEVER INVEST FUNDS THAT YOU CANNOT
              AFFORD TO LOSE.
            </p>

            <p>
              Given the foregoing, Cryptocurrencies are not appropriate for all
              investors. You should not deal in these products unless you have
              the necessary knowledge and expertise, understand these products’
              characteristics and your exposure to risk. You should also be
              satisfied that the product is suitable for you in light of your
              circumstances and financial position. In addition, use of our
              Services can never be considered a safe investment, rather, only
              an investment with a high risk of loss inherently associated with
              them.
            </p>

            <p>
              Furthermore, our own spread is added to online quotes which makes
              a trade on our websites even more volatile.
            </p>

            <p>
              The risk of loss in trading Cryptocurrencies can be substantial.
              You should, therefore, carefully consider whether such trading is
              suitable for you in light of your circumstances and financial
              resources. You should be aware that you may sustain a total loss
              of the funds in your account. If the market moves against your
              position, we may ask you to provide a substantial amount of
              additional margin funds on short notice, in order to maintain your
              position. If you do not provide the required funds within the time
              frame required by us, your position may be liquidated at a loss,
              and you will be liable for any resulting deficit in your account.
            </p>

            <p>
              {project_name} currently allows trading in cryptocurrencies over
              the weekend and it reserves the right not to do so. Should{" "}
              {project_name} so elect, trading in cryptocurrencies shall be
              allowed only from Monday through Friday. Given that the
              Cryptocurrency exchanges may operate over weekends, there may be a
              significant difference between Friday’s close and Sunday’s open.
              All such factors may result in you either not completing an order
              on a specific trading day or completing an order on a
              substantially less favourable price.
            </p>

            <p>
              Under certain market conditions, you may find it difficult or
              impossible to liquidate a position. This can occur, for example,
              when the market reaches a daily price fluctuation limit (“limit
              move”), if there is insufficient liquidity in the market. Certain
              crypto assets may carry additional or specific risks.
            </p>

            <p>
              Newly issued cryptocurrencies might carry additional risks you
              need to consider. Limited liquidity or difficulties to trade the
              asset after you’ve bought it. This means prices could be volatile,
              going up and down quickly, and liquidity may be limited, all
              depending on supply and demand. {project_name} cannot control
              these external factors.
            </p>
            <p></p>
            <p></p>

            <p>
              <b>Blockchain Risks</b>
            </p>

            <p>
              Since blockchain is an independent public peer-to peer network and
              is not controlled in any way or manner by {project_name},{" "}
              {project_name} shall not be responsible for any failure and/or
              mistake and/or error and/or breach which shall occur in blockchain
              or in any other networks in which the Cryptocurrencies are being
              issued and/or traded. You will be bound and subject to any change
              and/or amendments in the blockchain system and subject to any
              applicable law which may apply to the blockchain. We make no
              representation or warranty of any kind, express or implied,
              statutory or otherwise, regarding the blockchain functionality nor
              for any breach of security in the blockchain.
            </p>

            <p>
              <b>Operation of Cryptocurrency Protocols</b>
            </p>

            <p>
              {project_name} does not own or control the underlying software
              protocols which govern the operation of Cryptocurrencies available
              for trading on our platform. In general, the underlying protocols
              are open source and anyone can use, copy, modify, and distribute
              them. {project_name} is not responsible for the operation of the
              underlying protocols and {project_name} makes no guarantee of
              their functionality, security, or availability. The underlying
              protocols are subject to sudden changes in operating rules
              (“Forks”), and such Forks may materially affect the value,
              function, and/or even the name of the Cryptocurrency{" "}
              {project_name} holds for your benefit. In the event of a Fork,{" "}
              {project_name} may temporarily suspend {project_name} operations
              (with or without advance notice) and {project_name} may (a)
              configure or reconfigure its systems or (b) decide not to support
              (or cease supporting) the Forked protocol entirely. {project_name}{" "}
              may, but is not obligated to do so, adjust your account in respect
              of a Fork, depending on the circumstances of each event
              attributable to any specific Cryptocurrency which you hold.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>Third-party Risks.</b>
            </p>

            <p>
              We may elect to execute any order and/or hold any fiat money and
              cryptocurrencies via a Third Party. Such Third Parties are not
              banks that hold their fiat money/virtual currency as a deposit. If
              any such Third Party loses any money, fails or goes out of
              business, there is no specific legal protection that covers you
              for losses arising from any funds you may have held with such a
              Third Party, even when such party is registered with a national
              authority. Depending on the structure and security of the{" "}
              {project_name} Money crypto wallet, some individuals may be
              vulnerable to hacks, resulting in the theft of virtual currency or
              loss of customer assets. {project_name} will not be responsible in
              the event of losses caused by those Third Parties.
            </p>

            <p>
              Delisting and/or unsupported Cryptocurrencies: if at any time any
              of the Cryptocurrencies form the subject of your order are
              delisted and/or we no longer support the trading in such
              Cryptocurrencies for any reason, then the applicable order will be
              immediately closed. If {project_name} is notified that a
              Cryptocurrency you hold in your account is likely to be delisted
              and/or removed and/or cancelled from any of the exchanges (some of
              them or all) and {project_name} believes that it shall not be able
              to trade in such Cryptocurrencies, {project_name} shall make an
              effort to sell the Cryptocurrencies on your behalf at such time
              and price, and in such manner, as it determines.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>Automated Trading & Internet Risks</b>
            </p>

            <p>
              While trading on our website and/or applications, system errors
              may occur. You should be aware of the risks that may result from
              any system failure which could mean that your order may be delayed
              or fail.
            </p>

            <p>
              You acknowledge that there are risks associated with utilising an
              Internet-based trading system including, but not limited to, the
              failure of hardware, software, and Internet connections, the risk
              of malicious software introduction, the risk that third parties
              may obtain unauthorized access to information and/or assets
              (including your Cryptocurrencies) stored on your behalf, cyber
              attack, Cryptocurrency network failure (such as blockchain),
              computer viruses, communication failures, disruptions, errors,
              distortions or delays you may experience when trading via the
              Services, howsoever caused, spyware, scareware, Trojan horses,
              worms or other malware that may affect your computer or other
              equipment, or any phishing, spoofing or other attack. You should
              also be aware that SMS and email services are vulnerable to
              spoofing and phishing attacks and should use care in reviewing
              messages purporting to originate from {project_name}.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>Fees and Costs</b>
            </p>

            <p>
              Our fees and charges are set out on our website {project_name}.com
              under the ‘Fees’ section. Please be aware of all costs and charges
              that apply to you, because such costs and charges will affect your
              profitability.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>Information</b>
            </p>

            <p>
              Any opinions, news, research, analyses, prices, or other
              information contained on this website are provided as general
              market commentary, and do not constitute investment advice.{" "}
              {project_name} shall not be responsible for any loss arising from
              any investment based on any recommendation, forecast or other
              information provided.
            </p>

            <p></p>
            <p></p>

            <p>
              <b>SPAC Risks</b>
            </p>

            <p>
              Investing in SPACs carries different risks to investing in other
              stocks on {project_name}. Unlike other listed companies, SPACs are
              shell companies when they become public and, therefore, they do
              not have an underlying operating business. This means that you are
              relying on the managers of the SPACs to realise your investment.
              There is no guarantee that SPACs will be managed by individuals
              and firms that may not be competent or qualified to do so. You
              should read the SPAC’s IPO prospectus and any reports or other key
              information documents filed or published to understand the terms
              of your investments and the economic interests and motivations of
              the SPAC you are investing in. Moreover, SPACs that do not carry
              out an acquisition within a certain time period will be
              liquidated. As a result, there is a risk that you may not recover
              some or all of the money directly invested by you into the SPAC.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GeneralRisk;
