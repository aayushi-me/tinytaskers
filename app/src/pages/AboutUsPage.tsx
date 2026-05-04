/**
 * AboutUsPage.tsx
 *
 * This component renders the "About Us" page for the Tiny Taskers platform.
 * It utilizes the `react-i18next` library for internationalization to support multiple languages.
 * The page includes sections about the platform's mission, features, team, vision, and contact information.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Landing-page/Landing-header"; // Adjust the path as necessary
import "./../styles/aboutus.css"; // Importing custom styles for the About Us page

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation(); // Translation hook for multi-language support

  return (
    <div className="aboutus-page">
      <Header />
      <section className="aboutus-content">
        {/* Page Title */}
        <h1>{t("aboutTinyTaskers")}</h1>

        {/* Platform Description */}
        <p>
          <strong>{t("aboutTinyTaskers")}</strong> {t("description")}
        </p>

        {/* Mission Statement */}
        <h2>{t("mission")}</h2>
        <p>{t("missionDescription")}</p>

        {/* Key Features */}
        <h2>{t("features")}</h2>
        <ul>
          <li>💼 {t("featureSafeJobs")}</li>
          <li>🔒 {t("featureParentalControl")}</li>
          <li>🌐 {t("featureUserFriendly")}</li>
          <li>📊 {t("featureTracking")}</li>
          <li>📚 {t("featureLearning")}</li>
        </ul>

        {/* Team Section */}
        <h2>{t("team")}</h2>
        <p>{t("teamDescription")}</p>

        {/* Vision Statement */}
        <h2>{t("vision")}</h2>
        <p>{t("visionDescription")}</p>

        {/* Contact Information */}
        <h2>{t("contactUs")}</h2>
        <p>
          {t("feedbackInvite")}{" "}
          <a href="mailto:contact@tinytaskers.com">{t("emailPlaceholder")}</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
