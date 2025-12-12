import React from "react";
import "./PrivacyPolicy.css";
import Header from "../../components/Dashbaord/Header";
import { Footer } from "../../components/Home/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-wrapper">
      <Header/>
      <div className="privacy-page">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="privacy-updated">Last updated: 12 December, 2025 — Yanmu, Bloom Consulting LLC</p>
        </header>

        <main className="privacy-content">
          <p>
            This Privacy Policy explains how we collect, use, and protect your information when you use Yanmu.
            We follow the requirements of Qatar’s Personal Data Privacy Protection Law (PDPPL, Law No. 13 of 2016 as amended).
            If you have any questions, please reach out - email us at <strong>info@yanmu.qa</strong>.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>Information you share with us</h3>
          <ul>
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Profile information (bio, skills, portfolio, professional details)</li>
            <li>Messages and communication on the platform</li>
            <li>Payment or billing information (processed securely through external providers)</li>
          </ul>

          <h3>Information we collect automatically</h3>
          <ul>
            <li>Device information</li>
            <li>IP address</li>
            <li>Browser or app version</li>
            <li>Page views and usage activity</li>
            <li>Cookies (see Section 8)</li>
          </ul>

          <h3>Information from third-party services</h3>
          <p>If you connect via Google, Apple, or other social accounts, they may share your basic profile data with us.</p>
          <p>We do not collect sensitive personal data under PDPPL.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Set up and manage your account</li>
            <li>Help Trainees and Experts connect</li>
            <li>Facilitate communication between Users</li>
            <li>Process payments and withdrawals</li>
            <li>Personalize your experience</li>
            <li>Improve our platform and features</li>
            <li>Detect and prevent fraud or misuse</li>
            <li>Comply with legal and regulatory requirements in Qatar</li>
          </ul>

          <h2>3. Legal Basis for Processing</h2>
          <ul>
            <li>Your consent, when required</li>
            <li>Contractual necessity — to provide our services</li>
            <li>Legal obligations</li>
            <li>Legitimate interests — such as platform improvements or fraud prevention</li>
          </ul>
          <p>You can withdraw consent at any time.</p>

          <h2>4. How We Share Your Information</h2>
          <ul>
            <li>Payment processors</li>
            <li>Cloud hosting providers</li>
            <li>Customer support tools</li>
            <li>Verification partners</li>
            <li>Analytics tools</li>
            <li>Other Users (e.g., your profile is visible to them)</li>
            <li>Qatari authorities, if required by law</li>
          </ul>
          <p>We do not sell your data to third parties. All partners follow PDPPL requirements.</p>

          <h2>5. International Data Transfers</h2>
          <p>Data may be transferred outside Qatar only if adequate protection or explicit consent is in place.</p>

          <h2>6. How Long We Keep Your Data</h2>
          <p>Data is retained only as long as necessary for services, compliance, dispute resolution, or auditing, then securely deleted or anonymized.</p>

          <h2>7. Your Rights</h2>
          <ul>
            <li>Access your data</li>
            <li>Request corrections or updates</li>
            <li>Request deletion (if legally allowed)</li>
            <li>Withdraw consent</li>
            <li>Object to certain processing</li>
            <li>Know who your data has been shared with</li>
          </ul>
          <p>Contact <strong>info@yanmu.qa</strong> to exercise your rights.</p>

          <h2>8. Cookies & Tracking Technologies</h2>
          <p>Cookies help us improve platform functionality and your experience.</p>
          <ul>
            <li>Essential cookies</li>
            <li>Functional cookies</li>
            <li>Analytics cookies</li>
            <li>Performance cookies</li>
          </ul>
          <p>Most browsers allow you to disable cookies, but essential features may not work properly.</p>

          <h2>9. How We Keep Your Data Safe</h2>
          <ul>
            <li>Encryption</li>
            <li>Access controls</li>
            <li>Secure servers</li>
            <li>Continuous monitoring</li>
            <li>Regular audits</li>
          </ul>
          <p>In case of a breach, affected users and authorities will be notified as required by PDPPL.</p>

          <h2>10. Children’s Privacy</h2>
          <p>Our platform is not intended for anyone under 18.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy. Significant changes may be notified to users.</p>

          <h2>12. Contact Us</h2>
          <p>Yanmu, Bloom Consulting LLC — <strong>info@yanmu.qa</strong></p>
        </main>
      </div>
      <Footer />
    </div>);
}
