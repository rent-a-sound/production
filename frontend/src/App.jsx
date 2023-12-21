import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import Form from "./components/Form";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AnimatePresence mode="wait">
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
            </motion.div>
          </AnimatePresence>
        }
      />
      <Route
        path="/katalog/*"
        element={
          <AnimatePresence mode="wait">
            <motion.div
              key="catalogue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Catalogue />
            </motion.div>
          </AnimatePresence>
        }
      />
      <Route
        path="/rez/*"
        element={
          <AnimatePresence mode="wait">
            <motion.div
              key="form"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.4 }}
            >
              <Form />
            </motion.div>
          </AnimatePresence>
        }
      />
    </Routes>
  );
};

export default App;
