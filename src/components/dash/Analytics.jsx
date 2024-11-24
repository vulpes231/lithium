import React from "react";

const styles = {
  span: "flex flex-col",
  card: "flex flex-col gap-6 bg-white p-6 shadow-md border-l-4 border-green-500",
  title: "text-md md:text-lg font-semibold capitalize ",
  balance: "font-bold text-xl text-slate-800",
  subtitle: "font-semibold text-xs capitalize",
  info: "font-light text-xs",
};

const Analytics = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-500">
        <div className={styles.card}>
          <h5 className={styles.title}>successful deposits</h5>
          <h3 className={styles.balance}>0.00 USD</h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>submitted</small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>pending</small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>rejected</small>
              <small>$0.00</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have requested to deposit $0.00, Where $0.00 has been initiated
            but not completed
          </small>
        </div>
        <div className={styles.card}>
          <h5 className={styles.title}>successful withdrawals</h5>
          <h3 className={styles.balance}>0.00 USD</h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>submitted</small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>pending</small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>rejected</small>
              <small>$0.00</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have requested to withdraw $0.00, Where $0.00 has been initiated
            but not completed
          </small>
        </div>
        <div className={styles.card}>
          <h5 className={styles.title}>Total Investments</h5>
          <h3 className={styles.balance}>0.00 USD</h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>running </small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>completed</small>
              <small>$0.00</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>yield</small>
              <small>$0.00</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have invested $0.00 from the deposit wallet and $0.00 from the
            investment wallet
          </small>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
