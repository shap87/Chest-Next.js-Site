// libs
import Link from "next/link";

//components
import { H5 } from "../components/common/H5/H5";
import { H6 } from "../components/common/H6/H6";
import { Paragraph } from "../components/common/Paragraph/Paragraph";
import { Layout } from "../components/common/Layout/Layout";

// assets
import styles from "../styles/profile.module.scss";

export default function Profile() {
  return (
    <Layout
      title='Home | Chestr'
      description="Save items into wishlists from any online store, and get notified every time there's a discount.">
      <section className='py-12 md:py-28'>
        <div className='container'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full md:w-[48%] mb-10 md:0'>
              <H5>Get started in three easy steps.</H5>
              <ul className={styles.steps}>
                <li>
                  <img className={styles.icon} src={'./extension.svg'} alt='' />
                  <div className={styles.desc}>
                    <H6>Get the extension</H6>
                    <Paragraph>
                      If you don't have the chrome extension, get it <Link href='#'><a>here</a></Link>
                    </Paragraph>
                    <Link href='#'>
                      <a className='no-underline font-semibold flex items-center group'>
                        Get chrome extension
                        <img className='ml-3 w-[12px] group-hover:ml-4 transition-all' src={'./arrow-right.svg'}
                             alt='' />
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <img className={styles.icon} src={'./pin.svg'} alt='' />
                  <div className={styles.desc}>
                    <H6>Pin the extension</H6>
                    <Paragraph>
                      Pin the extension to your chrome tab bar for easy access </Paragraph>
                  </div>
                </li>
                <li>
                  <img className={styles.icon} src={'./chest-icon.svg'} alt='' />
                  <div className={styles.desc}>
                    <H6>Click to save</H6>
                    <Paragraph>
                      Click on the extension on any online store to save an item </Paragraph>
                  </div>
                </li>
              </ul>
            </div>
            <div className='w-full md:w-[48%]'>
              <div className='rounded-md md:rounded-2xl p-4 border-[#F9FAFB] bg-[#F9FAFB]'>
                <img className='rounded-md md:rounded-2xl' src={'./images/get-started-2.jpg'} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}