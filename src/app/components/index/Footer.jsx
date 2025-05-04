"use client";
import { project_email, project_name } from "../../../../env";
import logo from "../../../../public/img/logo.png";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import "./styles/footer.css";
import { useTranslations } from "next-intl";
const Footer = () => {
  const t = useTranslations("footer");
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="footer__box__1">
            <Link href="/">
              <Image src={logo} alt="Logo" className="logo" />
            </Link>
            <span>{project_name}</span>
            <span id="email">
              <EnvelopeClosedIcon />
              {project_email}
            </span>
          </div>
          <div className="footer__box__2">
            <h4>{t("quick_links")}</h4>

            <ul>
              <li>
                <Link href="contact">{t("contact_us")}</Link>
              </li>
              <li>
                <Link href="/">{t("my_account")}</Link>
              </li>
              <li>
                <Link href="signup">{t("create_account")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
