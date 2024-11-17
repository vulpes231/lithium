import React, { useEffect, useState } from "react";
import { Sidebar } from "../components";

const Faq = () => {
  const [faqLoading, setFaqLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(false); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching FAQs with a delay
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Set loading to false after successful fetch
        setFaqLoading(false);
      } catch (err) {
        // Handle error
        setError(true);
        setFaqLoading(false);
      }
    };

    fetchData();
  }, []);

  if (faqLoading) {
    return (
      <section className="min-h-screen bg-slate-100 w-full overflow-hidden">
        <div className="flex min-h-full mt-[66px]">
          <Sidebar />
          <div className="bg-white w-full lg:w-[80%] customh m-3 p-6">
            <p>Loading FAQs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 w-full overflow-hidden">
      <div className="flex min-h-full mt-[66px]">
        <Sidebar />
        <div className="bg-white w-full lg:w-[80%] customh m-3 p-6">
          <h3 className="capitalize text-lg font-bold">
            frequently asked questions
          </h3>
          {error ? (
            <p>An error occurred while loading FAQs. Try again later.</p>
          ) : (
            <p>failed to fetch FAQs.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;
