import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, getAccessToken } from "../../utils/utils";
import { getUserTrnxs } from "../../features/trnxSlice";

const styles = {
  span: "flex flex-col",
  card: "flex flex-col gap-6 bg-white p-6 shadow-md border-l-4 border-green-500",
  title: "text-md md:text-lg font-semibold capitalize ",
  balance: "font-bold text-xl text-slate-800",
  subtitle: "font-semibold text-xs capitalize",
  info: "font-light text-xs",
};

const Analytics = () => {
  const dispatch = useDispatch();
  const { userTrnxs } = useSelector((state) => state.trnx);
  const accessToken = getAccessToken();

  const [summary, setSummary] = useState({
    deposit: { submitted: 0, pending: 0, rejected: 0 },
    withdrawal: { submitted: 0, pending: 0, rejected: 0 },
    investment: { running: 0, completed: 0, yield: 0 },
  });

  // Process user transactions and update the summary state
  const processTransactions = (transactions) => {
    const newSummary = {
      deposit: { submitted: 0, pending: 0, rejected: 0 },
      withdrawal: { submitted: 0, pending: 0, rejected: 0 },
      investment: { running: 0, completed: 0, yield: 0 },
    };

    transactions.forEach((transaction) => {
      const { transactionType, status, amount } = transaction;
      const parsedAmount = parseFloat(amount);

      // Handle Deposit
      if (transactionType.includes("deposit")) {
        if (status.includes("submitted"))
          newSummary.deposit.submitted += parsedAmount;
        if (status.includes("pending"))
          newSummary.deposit.pending += parsedAmount;
        if (status.includes("rejected"))
          newSummary.deposit.rejected += parsedAmount;
      }

      // Handle Withdrawal
      if (transactionType.includes("withdrawal")) {
        if (status.includes("submitted"))
          newSummary.withdrawal.submitted += parsedAmount;
        if (status.includes("pending"))
          newSummary.withdrawal.pending += parsedAmount;
        if (status.includes("rejected"))
          newSummary.withdrawal.rejected += parsedAmount;
      }

      // Handle Investment
      if (transactionType.includes("invest")) {
        if (status.includes("running"))
          newSummary.investment.running += parsedAmount;
        if (status.includes("completed"))
          newSummary.investment.completed += parsedAmount;
        if (status.includes("yield"))
          newSummary.investment.yield += parsedAmount;
      }
    });

    setSummary(newSummary);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrnxs());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (userTrnxs.length > 0) {
      processTransactions(userTrnxs);
    }
  }, [userTrnxs]);

  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-500">
        <div className={styles.card}>
          <h5 className={styles.title}>Total deposits</h5>
          <h3 className={styles.balance}>
            {formatNumber(
              summary.deposit.submitted +
                summary.deposit.pending +
                summary.deposit.rejected
            )}{" "}
            USD
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>submitted</small>
              <small>${formatNumber(summary.deposit.submitted)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>pending</small>
              <small>${formatNumber(summary.deposit.pending)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>rejected</small>
              <small>${formatNumber(summary.deposit.rejected)}</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have requested to deposit $
            {formatNumber(summary.deposit.submitted)}, where $
            {formatNumber(summary.deposit.pending)} is pending.
          </small>
        </div>

        <div className={styles.card}>
          <h5 className={styles.title}>Total withdrawals</h5>
          <h3 className={styles.balance}>
            {formatNumber(
              summary.withdrawal.submitted +
                summary.withdrawal.pending +
                summary.withdrawal.rejected
            )}{" "}
            USD
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>submitted</small>
              <small>${formatNumber(summary.withdrawal.submitted)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>pending</small>
              <small>${formatNumber(summary.withdrawal.pending)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>rejected</small>
              <small>${formatNumber(summary.withdrawal.rejected)}</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have requested to withdraw $
            {formatNumber(summary.withdrawal.submitted)}, where $
            {formatNumber(summary.withdrawal.pending)} is pending.
          </small>
        </div>

        <div className={styles.card}>
          <h5 className={styles.title}>Total Investments</h5>
          <h3 className={styles.balance}>
            {formatNumber(
              summary.investment.running +
                summary.investment.completed +
                summary.investment.yield
            )}{" "}
            USD
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <span className={styles.span}>
              <small className={styles.subtitle}>running</small>
              <small>${formatNumber(summary.investment.running)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>completed</small>
              <small>${formatNumber(summary.investment.completed)}</small>
            </span>
            <span className={styles.span}>
              <small className={styles.subtitle}>yield</small>
              <small>${formatNumber(summary.investment.yield)}</small>
            </span>
          </div>
          <hr />
          <small className={styles.info}>
            You have invested ${formatNumber(summary.investment.running)} in
            running investments and earned $
            {formatNumber(summary.investment.yield)}.
          </small>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
