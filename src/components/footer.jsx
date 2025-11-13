import React, { useEffect, useState } from "react";
import "../App.css";

const Footer = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    // Build a robust formatter: use user's locale if available
    const locale = (typeof navigator !== "undefined" && navigator.language) || "en-US";
    const opts = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat(locale, opts);

    const updateTime = () => {
      try {
        setDateTime(formatter.format(new Date()));
      } catch (err) {
        // Fallback to simple formatted string if Intl fails
        const now = new Date();
        setDateTime(
          now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0") +
            " " +
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0") +
            ":" +
            String(now.getSeconds()).padStart(2, "0")
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-left">thouseef@portfolio:~$</div>
      <div className="footer-right" aria-label={`Current date and time: ${dateTime}`}>
        {dateTime}
      </div>
    </footer>
  );
};

export default Footer;
