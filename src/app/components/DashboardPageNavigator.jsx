import Link from "next/link";
import { useTranslations } from "next-intl";
const DashboardPageNavigator = ({ text }) => {
  const t = useTranslations();
  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
        marginTop: "7rem",
        marginBottom: "1.5rem",
        fontSize: "14px",
      }}
    >
      <Link href="dashboard" style={{ color: "#6648fe" }}>
        {t("Dashboard.title")}
      </Link>
      <span style={{ color: "#777" }}>&gt; {text}</span>
    </div>
  );
};

export default DashboardPageNavigator;
