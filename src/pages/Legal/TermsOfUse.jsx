import React from "react";
import "./TermsOfUse.css";

export default function TermsOfUse() {
  return (
    <div className="terms-page">
      <header className="terms-header">
        <h1>Terms of Use</h1>
        <p className="terms-updated">Last updated: 7 December, 2025 — Yanmu, Bloom Consulting LLC</p>
      </header>

      <main className="terms-content">
        <p>
          Welcome to our platform. These Terms of Use (“Terms”) govern your access to and use of the
          Platform and its related services. By creating an account or using the Platform in any way, you
          agree to these Terms.
        </p>

        <p>
          Our Platform connects Experts who offer training or coaching services with Trainees who are
          seeking to learn or develop specific skills. The Platform provides tools to manage schedules,
          sessions, performance, and payments. While we verify certain aspects of an Expert’s profile to
          maintain a safe environment, we do not certify Experts as licensed professionals nor guarantee
          their qualifications or work permits.
        </p>

        <p>Please read these Terms carefully.</p>

        <h2>1. About the Platform</h2>
        <p>The Platform is a digital marketplace that helps Experts publish their Packages, manage their
          existing Trainees, and potentially engage with new Trainees. We provide the technology; we do
          not create, deliver, or control the services provided by Experts.
        </p>
        <p>The Platform does not employ Experts, endorse their services, or supervise their work. Trainees
          engage directly with Experts for actual services.
        </p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>You are at least 18 years old,</li>
          <li>You have legal capacity to enter into binding agreements, and</li>
          <li>Your access complies with the laws of the State of Qatar and any applicable local regulations.</li>
        </ul>
        <p>We may suspend or terminate access if any information provided is inaccurate, misleading, or incomplete.</p>

        <h2>3. User Accounts</h2>
        <p>Users must create an account to use the Platform. You agree to:</p>
        <ul>
          <li>Provide accurate and updated information,</li>
          <li>Maintain confidentiality of your login credentials,</li>
          <li>Promptly notify us if you suspect unauthorized access.</li>
        </ul>
        <p>We may refuse, modify, or remove accounts that violate our standards or create risk.</p>

        <h2>4. Expert Independence and Legal Status</h2>
        <h3>4.1 Independent Contractor Status</h3>
        <p>Experts provide services as independent contractors, not employees or agents.</p>

        <h3>4.2 Taxes and Social Contributions</h3>
        <p>Experts are responsible for their own taxes, social contributions, and regulatory obligations.</p>

        <h3>4.3 No Authority to Bind the Platform</h3>
        <p>Experts cannot make commitments on behalf of the Platform.</p>

        <h3>4.4 Compliance with Local Regulations</h3>
        <p>Experts must ensure they are legally permitted to provide services in Qatar or any jurisdiction.</p>

        <h2>5. Packages & Listings</h2>
        <h3>5.1 Accuracy of Package Content</h3>
        <p>Experts must ensure that all package information is accurate and lawful.</p>

        <h3>5.2 Prohibited Content</h3>
        <ul>
          <li>Personal contact information,</li>
          <li>Offensive or inappropriate content,</li>
          <li>Misleading claims,</li>
          <li>Content violating Qatari law or PDPPL.</li>
        </ul>

        <h3>5.3 Platform’s Right to Moderate Content</h3>
        <p>We may edit or remove any content that violates these Terms.</p>

        <h3>5.4 No Guarantee of Visibility</h3>
        <p>Publishing a Package does not guarantee trainees or visibility.</p>

        <h2>6. Communication & Mediation Rules</h2>
        <h3>6.1 Communication Must Stay on the Platform</h3>
        <p>Experts and Trainees may not exchange personal contact details before payment.</p>

        <h3>6.2 Prohibition of Circumvention</h3>
        <p>Users may not bypass platform fees or arrange off-platform payments.</p>

        <h3>6.3 Message Monitoring (PDPPL-Compliant)</h3>
        <p>Messages may be reviewed to ensure safety and resolve disputes, as allowed under PDPPL.</p>

        <h3>6.4 Mediation Support</h3>
        <p>We may facilitate non-binding conflict resolution.</p>

        <h2>7. Payments</h2>
        <p>Payments must be completed using approved methods. Off-platform payments are prohibited.</p>

        <h2>8. Cancellations & Refunds</h2>
        <p>Experts may define their own cancellation policies. We may intervene in cases of abuse but do
          not guarantee refunds.
        </p>

        <h2>9. User Conduct</h2>
        <ul>
          <li>Do not violate Qatari law,</li>
          <li>Do not harass other users,</li>
          <li>Do not disrupt or manipulate platform systems,</li>
          <li>Do not circumvent fees.</li>
        </ul>

        <h2>10. Limitation of Liability</h2>
        <p>The Platform is provided “as is.” We are not liable for data loss, service interruptions, disputes,
          or indirect damages.
        </p>

        <h2>11. Privacy</h2>
        <p>We do not collect special category personal data. See our Privacy Policy.</p>

        <h2>12. Changes to These Terms</h2>
        <p>We may update these Terms. Continued use means acceptance.</p>

        <h2>13. Governing Law and Dispute Resolution</h2>
        <p>These Terms are governed by Qatari law. Courts in Qatar have exclusive jurisdiction.</p>

        <h2>14. Contact Us</h2>
        <p>For questions, email: <strong>info@yanmu.qa</strong></p>
      </main>
    </div>
  );
}
