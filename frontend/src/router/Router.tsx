import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "../components/atoms/Nav/Nav";
import Home from "../components/pages/Home/Home";
import Protected from "../components/pages/Protected/Protected";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exclusive" element={<Protected />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
