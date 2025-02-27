// libs
import Link from "next/link";

// components
import { H4, H5, Paragraph } from "../../../common";

// assets
import styles from "../../../../styles/profile.module.scss";

export const Steps = () => {
  return (
    <section className="pt-4 md:pt-8 pb-12 md:pb-28">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-[48%] mb-10 md:0">
            <H4>Get started in three easy steps.</H4>
            <ul className={styles.steps}>
              <li>
                <img className={styles.icon} src={"./extension.svg"} alt="" />
                <div className={styles.desc}>
                  <H5>Get the extension</H5>
                  <Paragraph>
                    If you don&apos;t have the chrome extension, get it{" "}
                    <Link href="#">
                      <a>here</a>
                    </Link>
                  </Paragraph>
                  <Link href="#">
                    <a className="no-underline font-semibold flex items-center group">
                      Get chrome extension
                      <img
                        className="ml-3 w-[12px] group-hover:ml-4 transition-all"
                        src={"./arrow-right.svg"}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <img className={styles.icon} src={"./pin.svg"} alt="" />
                <div className={styles.desc}>
                  <H5>Pin the extension</H5>
                  <Paragraph>
                    Pin the extension to your chrome tab bar for easy access{" "}
                  </Paragraph>
                </div>
              </li>
              <li>
                <img className={styles.icon} src={"./chest-icon.svg"} alt="" />
                <div className={styles.desc}>
                  <H5>Click to save</H5>
                  <Paragraph>
                    Click on the extension on any online store to save an item{" "}
                  </Paragraph>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[48%]">
            <div className="rounded-md md:rounded-2xl p-4 border-[#F9FAFB] bg-[#F9FAFB]">
              <img
                className="rounded-md md:rounded-2xl"
                src={"./images/get-started-2.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
