// libs
import Link from "next/link";

//components
import { H5 } from "../components/common/H5/H5";
import { H4 } from "../components/common/H4/H4";
import { H6 } from "../components/common/H6/H6";
import { Paragraph } from "../components/common/Paragraph/Paragraph";
import { Layout } from "../components/common/Layout/Layout";
import { Button } from "../components/common/Button/Button";

// assets
import styles from "../styles/profile.module.scss";

export default function Profile() {
  return (
    <Layout
      title='Home | Chestr'
      description="Save items into wishlists from any online store, and get notified every time there's a discount.">
      <section className='py-12 md:py-28'>
        <div className='container'>
          <H6>Products</H6>
          <div className='flex items-center mb-5 md:mb-10'>
            <label className='flex-1 relative'>
              <img className='absolute z-10 w-4 left-4 top-1/2 -translate-y-1/2' src={'./search.svg'} alt='' />
              <input className='pl-10' type='search' placeholder='Search (⌘+K)' />
            </label>
            <Button classname='ml-4 md:ml-10 !p-3 !border-[#D0D5DD] group'>
              <img className='w-4 !mr-0 group-hover:invert' src={'./filter.svg'} alt='' />
            </Button>
          </div>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full md:w-[48%] mb-10 md:0'>
              <H4>Get started in three easy steps.</H4>
              <ul className={styles.steps}>
                <li>
                  <img className={styles.icon} src={'./extension.svg'} alt='' />
                  <div className={styles.desc}>
                    <H5>Get the extension</H5>
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
                    <H5>Pin the extension</H5>
                    <Paragraph>
                      Pin the extension to your chrome tab bar for easy access </Paragraph>
                  </div>
                </li>
                <li>
                  <img className={styles.icon} src={'./chest-icon.svg'} alt='' />
                  <div className={styles.desc}>
                    <H5>Click to save</H5>
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