import React, { useEffect, useState } from "react";
import "../App.css";

const Footer = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).replace(',', '');
      setDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-left">
        thouseef@portfolio:~$
      </div>
      <div className="footer-right">{dateTime}</div>
    </footer>
  );
};

export default Footer;