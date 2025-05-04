"use client";
import React, { useState } from "react";
import "./styles/faq.css";
import { Fade } from "react-awesome-reveal";
import { useTranslations } from "next-intl";
const Faq = ({ project_title }) => {
  const t = useTranslations();
  const faqs = (param) => {
    let faqArray = [
      {
        id: 1,
        question: t("faq.how_does_copy_trading_work.question"), // Using t() for localization
        answer: t("faq.how_does_copy_trading_work.answer"), // Use t() for answer as well
      },
      {
        id: 2,
        question: t("faq.what_are_the_fees.question"),
        answer: t("faq.what_are_the_fees.answer"),
      },
      {
        id: 3,
        question: t("faq.who_are_the_trading_experts.question"),
        answer: t("faq.who_are_the_trading_experts.answer"),
      },
      {
        id: 4,
        question: t("faq.recommended_amount_to_start_with.question"),
        answer: t("faq.recommended_amount_to_start_with.answer"),
      },
      {
        id: 5,
        question: t("faq.how_does_bitcoin_mining_work.question"),
        answer: t("faq.how_does_bitcoin_mining_work.answer"),
      },
      {
        id: 6,
        question: t("faq.are_you_mining_for_yourself.question"),
        answer: t("faq.are_you_mining_for_yourself.answer"),
      },
      {
        id: 7,
        question: t("faq.where_is_your_mining_farm_located.question"),
        answer: t("faq.where_is_your_mining_farm_located.answer"),
      },
      {
        id: 8,
        question: t("faq.mining_coins_per_algorithm.question"),
        answer: t("faq.mining_coins_per_algorithm.answer", { param }),
      },
      {
        id: 9,
        question: t("faq.how_do_your_ether_contracts_work.question"),
        answer: t("faq.how_do_your_ether_contracts_work.answer"),
      },
      {
        id: 10,
        question: t("faq.expected_returns.question"),
        answer: t("faq.expected_returns.answer", { param }),
      },
      {
        id: 11,
        question: t("faq.which_pools_are_you_using_for_mining.question"),
        answer: t("faq.which_pools_are_you_using_for_mining.answer"),
      },
      {
        id: 12,
        question: t("faq.isnt_buying_hardware_cheaper.question"),
        answer: t("faq.isnt_buying_hardware_cheaper.answer", { param }),
      },
      {
        id: 13,
        question: t("faq.what_is_the_maintenance_fee.question"),
        answer: t("faq.what_is_the_maintenance_fee.answer"),
      },
      {
        id: 14,
        question: t(
          "faq.how_can_i_mine_different_coins_at_the_same_time.question"
        ),
        answer: t(
          "faq.how_can_i_mine_different_coins_at_the_same_time.answer",
          { param }
        ),
      },
    ];
    return faqArray;
  };
  const faqArray = faqs(project_title);
  // State to keep track of active state for each FAQ item
  const [activeItems, setActiveItems] = useState(
    Array(faqs.length).fill(false)
  );

  // Function to toggle active state for an FAQ item
  const toggleActive = (index) => {
    const newActiveItems = [...activeItems];
    newActiveItems[index] = !newActiveItems[index];
    setActiveItems(newActiveItems);
  };
  return (
    <>
      <div className="faq__wrapper">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <h3>faqs</h3>
            <div className="faqs">
              {faqArray.map((faq, index) => (
                <div className="faq" key={faq.id}>
                  <div className="question" onClick={() => toggleActive(index)}>
                    <span
                      style={{
                        color: `${
                          activeItems[index]
                            ? "var(--primary-color)"
                            : "var(--text-gray)"
                        }`,
                      }}
                    >
                      {faq.question}
                    </span>
                    {activeItems[index] ? (
                      <div>
                        <kbd className="inline-flex items-center px-2 py-1.5 text-dark-100">
                          <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 10"
                          >
                            <path d="M9.207 1A2 2 0 0 0 6.38 1L.793 6.586A2 2 0 0 0 2.207 10H13.38a2 2 0 0 0 1.414-3.414L9.207 1Z" />
                          </svg>
                        </kbd>
                      </div>
                    ) : (
                      <>
                        <kbd className="inline-flex items-center px-2 py-1.5 text-dark-100">
                          <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 10"
                          >
                            <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                          </svg>
                        </kbd>
                      </>
                    )}
                  </div>
                  <div
                    className={
                      activeItems[index] ? "answer active" : "answer hide"
                    }
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      className="para"
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Faq;
