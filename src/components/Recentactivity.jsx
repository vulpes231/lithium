import React, { useEffect, useRef } from "react";
import { recentActivities } from "../constants";

const Recentactivity = () => {
  const scrollRef = useRef(null);
  const displayCount = 52;

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          top: 20, // Scroll by 20px at a time (adjust as needed)
          behavior: "smooth",
        });

        // Check if we've scrolled past the last item
        if (
          scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight
        ) {
          // Reset scroll position to the top
          scrollRef.current.scrollTop = 0;
        }
      }
    }, 1000); // Adjust the interval time as needed

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      className=" bg-white rounded-bl-xl rounded-br-xl shadow-xl p-6 w-full overflow-auto"
      style={{ maxHeight: "400px" }}
      ref={scrollRef}
    >
      <table className="min-w-full text-slate-600 ">
        <tbody>
          {recentActivities.slice(0, displayCount).map((act, index) => {
            const len = act.username.length - 1;
            return (
              <tr className="font-[Poppins]" key={index}>
                <td className="px-5 py-2.5">{`${act.username.slice(
                  0,
                  2
                )}****${act.username.slice(len)}`}</td>
                <td className="px-5 py-2.5 font-semibold text-lg">
                  {act.amount} USD
                </td>
                <td
                  className={`px-5 py-2.5 capitalize text-sm ${
                    act.type === "deposit"
                      ? "text-green-500"
                      : act.type === "withdrawal"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {act.type}
                </td>
                <td className="px-5 py-2.5 text-sm">{act.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recentactivity;
