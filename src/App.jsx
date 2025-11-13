import React from "react";
import Header from "./components/header.jsx";
import Content from "./components/content.jsx";
import Footer from "./components/footer.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;