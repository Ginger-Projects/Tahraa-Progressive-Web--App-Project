import React from "react";
import "./CodeOfConduct.css";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";

export default function CodeOfConduct() {
  return (
    <div className="legal-wrapper">
      <Header />
      <main className="legal-page">
        <section className="legal-container">
          <header className="legal-header">
            <h1>Code of Conduct</h1>
            <p className="legal-updated">Last updated: 7 December, 2025 — Yanmu, Bloom Consulting LLC</p>
          </header>

        </section>
      </main>
      <Footer />
    </div>
  );
}
