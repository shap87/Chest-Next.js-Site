// libs
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Link from "next/link";

// components
import { Paragraph } from "../../common/Paragraph/Paragraph";

// assets
import styles from "./GetStarted.module.scss";

export const GetStartedLayout = ({ children }: any) => {
  return (
    <section className="py-6 md:py-12 text-center">
      <div className="container">
        <div className="flex flex-wrap items-start justify-between">
          <div className="md:pt-4 w-full md:w-[51%] order-2">
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <div className={styles.slide}>
                  <div className={styles.image}>
                    <img src={"./images/get-started.jpg"} alt="" />
                  </div>
                  <Paragraph classname={styles.desc}>
                    Save items into wishlists from any online store.
                  </Paragraph>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.slide}>
                  <div className={styles.image}>
                    <img src={"./images/get-started.jpg"} alt="" />
                  </div>
                  <Paragraph classname={styles.desc}>
                    Save items into wishlists from any online store.
                  </Paragraph>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.slide}>
                  <div className={styles.image}>
                    <img src={"./images/get-started.jpg"} alt="" />
                  </div>
                  <Paragraph classname={styles.desc}>
                    Save items into wishlists from any online store.
                  </Paragraph>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="text-left w-full md:w-[34%] order-1 md:order-3 mb-10 md:0">
            {children}
          </div>
        </div>
        <Paragraph classname="mt-16 md:mt-36 text-[#98A2B3] !text-xs max-w-[310px] mx-auto">
          By continuing, you agree to the{" "}
          <Link href="#">
            <a className='text-primary text-xs'>Terms and Conditions</a>
          </Link>{" "}
          and{" "}
          <Link href="#">
            <a className='text-primary text-xs'>Privacy Policy</a>
          </Link>
          .
        </Paragraph>
      </div>
    </section>
  )
}