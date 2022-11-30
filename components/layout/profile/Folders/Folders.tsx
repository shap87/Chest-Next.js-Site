import { useEffect, useState } from "react";

// libs
import cn from "classnames";

// components

// assets
import styles from "../../../../styles/profile.module.scss";
import { H6, Paragraph } from "../../../common";
import { useWindowSize } from "../../../../utils/useWindowSize";
import { SelectedPanel } from "../SelectedPanel/SelectedPanel";

const initialFolders = [
  {
    image: "./images/folder-1.jpg",
    title: "All",
    count: 0,
    type: "default",
    selected: false
  },
  {
    image: "./images/chestr-bg.png",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/folder-2.jpg",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/folder-1.jpg",
    title: "All",
    count: 0,
    type: "default",
    selected: false
  },
  {
    image: "./images/chestr-bg.png",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/folder-2.jpg",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/folder-1.jpg",
    title: "All",
    count: 0,
    type: "default",
    selected: false
  },
  {
    image: "./images/chestr-bg.png",
    title: "Private",
    count: 0,
    type: "private",
    selected: false,
  },
  {
    image: "./images/folder-2.jpg",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/folder-2.jpg",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
  {
    image: "./images/chestr-bg.png",
    title: "Private",
    count: 0,
    type: "private",
    selected: false
  },
];

interface IFolder {
  image: string,
  title: string,
  count: number,
  type: string,
  selected: boolean,
}

export const Folders = () => {
  const { width }: any = useWindowSize();

  const [showAll, setShowAll] = useState(false);
  const [countSelected, setCountSelected] = useState(0);
  const [count, setCount] = useState(6);
  const [folders, setFolders] = useState<IFolder[]>(initialFolders);

  useEffect(() => {
    if (width < 640) {
      setCount(2);
    } else if (width < 768) {
      setCount(3);
    } else if (width < 1024) {
      setCount(4);
    } else {
      setCount(5);
    }
  }, [width]);

  useEffect(() => {
    setCountSelected(folders.filter((folder: IFolder) => folder.selected).length)
  }, [folders]);

  const removeSelected = () => {
    folders.map(item => {
      item.selected = false;
      return item
    })
    setCountSelected(0);
  }

  const selectAll = () => {
    folders.map(item => {
      item.selected = true;
      return item
    })
    setCountSelected(folders.length);
  }

  return (
    <section className="py-4 md:py-8">
      <div className="container">
        {countSelected ? <SelectedPanel selectAll={selectAll} removeSelected={removeSelected} countSelected={countSelected} /> : null}
        <div className="flex justify-between items-center">
          <H6>Folders</H6>
          {showAll ? (
            <div
              className="font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none"
              onClick={() => setShowAll(!showAll)}
            >
              Hide
              <img
                className="w-3 ml-2 opacity-60 rotate-180 group-hover:rotate-0 transition-all"
                src={"./arrow-select.svg"}
                alt=""
              />
            </div>
          ) : (
            <div
              className="font-semibold text-[#98A2B3] text-sm flex items-center cursor-pointer group select-none"
              onClick={() => setShowAll(!showAll)}
            >
              Show All
              <img
                className="w-3 ml-2 opacity-60 group-hover:rotate-180 transition-all"
                src={"./arrow-select.svg"}
                alt=""
              />
            </div>
          )}
        </div>
        <div className={cn("flex flex-wrap items-center justify-between gap-y-12", styles.folders)}>
          {folders.slice(0, showAll ? folders.length : count).map((folder: IFolder, index: number) => (
            <div
              key={index}
              className={cn(styles.folder, { [styles.selected]: folder.selected })}
              onClick={() => {
                folders[index].selected = !folder.selected;
                setFolders([...folders]);
              }}>
              <div className={styles.settings}>
                <img
                  className="w-1 group-hover:opacity-60 transition-all"
                  src={"./dots.svg"}
                  alt="" />
              </div>
              <span className={styles.checkbox} />
              <img className={styles.image} src={folder.image} alt="" />
              <div className={styles.info}>
                <div className={styles.desc}>
                  <H6>{folder.title}</H6>
                  <Paragraph>{folder.count} items</Paragraph>
                </div>
                {folder.type === "private" && (
                  <img className={styles.lock} src={"./lock.svg"} alt="" />
                )}
              </div>
            </div>))}
        </div>
      </div>
    </section>
  );
};
