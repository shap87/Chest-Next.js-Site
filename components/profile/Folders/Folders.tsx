import { useEffect, useState } from "react";

// libs
import cn from "classnames";

// components
import { H6 } from "../../common/H6/H6";
import { Paragraph } from "../../common/Paragraph/Paragraph";
import { useWindowSize } from "../../../utils/useWindowSize";

// assets
import styles from "../../../styles/profile.module.scss";

const folders = [
  { image: "./images/folder-1.jpg", title: 'All', count: 0, type: 'default' },
  { image: "./images/chestr-bg.png", title: 'Private', count: 0, type: 'private' },
  { image: "./images/folder-2.jpg", title: 'Private', count: 0, type: 'private' },
  { image: "./images/folder-1.jpg", title: 'All', count: 0, type: 'default' },
  { image: "./images/chestr-bg.png", title: 'Private', count: 0, type: 'private' },
  { image: "./images/folder-2.jpg", title: 'Private', count: 0, type: 'private' },
  { image: "./images/folder-1.jpg", title: 'All', count: 0, type: 'default' },
  { image: "./images/chestr-bg.png", title: 'Private', count: 0, type: 'private' },
  { image: "./images/folder-2.jpg", title: 'Private', count: 0, type: 'private' },
]

export const Folders = () => {
  const [showAll, setShowAll] = useState(false);
  const [count, setCount] = useState(6);
  const { width }: any = useWindowSize();

  useEffect(() => {
    if (width < 640) {
      setCount(2)
    } else if (width < 768) {
      setCount(3)
    } else if (width < 1024) {
      setCount(4)
    } else {
      setCount(5)
    }
  }, [width])


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
          className={cn("flex flex-wrap items-center justify-between gap-y-12", styles.folders)}>
          {folders.slice(0, showAll ? folders.length : count).map((folder) => <div className={styles.folder}>
            <span className={styles.checkbox} />
            <img className={styles.image} src={folder.image} alt="" />
            <div className={styles.info}>
              <div className={styles.desc}>
                <H6>{folder.title}</H6>
                <Paragraph>{folder.count} items</Paragraph>
              </div>
              {folder.type === 'private' && <img className={styles.lock} src={"./lock.svg"} alt="" />}
            </div>
          </div>)}
        </div>
      </div>
    </section>
  )
}