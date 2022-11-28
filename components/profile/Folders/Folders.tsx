import { useState } from "react";

// libs
import cn from "classnames";

// components
import { H6 } from "../../common/H6/H6";
import { Paragraph } from "../../common/Paragraph/Paragraph";

// assets
import styles from "../../../styles/profile.module.scss";

export const Folders = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-4 md:py-8">
      <div className="container">
        <div className='flex justify-between items-center'>
          <H6>Folders</H6>
          {showAll
            ? <div
              className='font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none'
              onClick={() => setShowAll(!showAll)}>
              Hide
              <img
                className="w-3 ml-2 opacity-60 rotate-180 group-hover:rotate-0 transition-all"
                src={"./arrow-select.svg"}
                alt="" />
            </div>
            : <div
              className='font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none'
              onClick={() => setShowAll(!showAll)}>
              Show All
              <img
                className="w-3 ml-2 opacity-60 group-hover:rotate-180 transition-all" src={"./arrow-select.svg"}
                alt="" />
            </div>}
        </div>
        <div
          className={cn("flex flex-wrap items-center gap-12", styles.folders)}>
          <div className={styles.folder}>
            <span className={styles.checkbox} />
            <img
              className={styles.image}
              src={"./images/folder-1.jpg"}
              alt=""
            />
            <div className={styles.info}>
              <div className={styles.desc}>
                <H6>All</H6>
                <Paragraph>0 items</Paragraph>
              </div>
            </div>
          </div>
          <div className={styles.folder}>
            <span className={styles.checkbox} />
            <img
              className={styles.image}
              src={"./images/chestr-bg.png"}
              alt=""
            />
            <div className={styles.info}>
              <div className={styles.desc}>
                <H6>Private</H6>
                <Paragraph>0 items</Paragraph>
              </div>
              <img className={styles.lock} src={"./lock.svg"} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}