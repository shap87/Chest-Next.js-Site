// libs
import { useState } from "react";
import cn from "classnames";

// components
import { H5, H6 } from "../../../common";

// assets
import styles from "../../../../styles/profile.module.scss";
import { EditProfileModal } from "../../../dialogs";

export const User = () => {
  const [showEditProfileModal, setShowEditProfileModal] =
    useState<boolean>(false);

  return (
    <>
      <section className="py-4 md:py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className={cn(
                  "border-4 border-white w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full object-cover",
                  styles.avatar
                )}
                src={"./images/avatar.png"}
                alt=""
              />
              <div className="ml-5">
                <H5 classname="font-normal mb-1">Faruk Shuaibu</H5>
                <H6 classname="mb-0">@ligma001</H6>
              </div>
              <div className="relative p-2 group ml-6 group">
                <div className="group-hover:rotate-180 transition-all cursor-pointer">
                  <img className="w-3" src={"./arrow-select.svg"} alt="" />
                </div>
                <ul className="list hidden group-hover:block">
                  <li onClick={() => setShowEditProfileModal(true)}>
                    Edit profile
                    <img src={"./edit.svg"} alt="" />
                  </li>
                  <li>
                    Share
                    <img src={"./share.svg"} alt="" />
                  </li>
                  <li>
                    Settings
                    <img src={"./settings.svg"} alt="" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative pt-2 pb-2 group ml-2">
              <div className="rounded-lg bg-[#FFEBF6] border border-transparent py-4 px-4 md:px-11 group-hover:border-[#CC0174] transition-all cursor-pointer">
                <img className="w-3" src={"./plus.svg"} alt="" />
              </div>
              <ul className="list hidden group-hover:block">
                <li>
                  New Folder
                  <img src={"./folder.svg"} alt="" />
                </li>
                <li>
                  New Item
                  <img src={"./plus.svg"} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EditProfileModal show={showEditProfileModal} />
    </>
  );
};
