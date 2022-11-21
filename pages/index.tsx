//components
import { H1 } from "../components/common/H1/H1";
import { Paragraph } from "../components/common/Paragraph/Paragraph";
import { Button } from "../components/common/Button/Button";
import { Layout } from "../components/common/Layout/Layout";

export default function Home() {
  return (
    <Layout
      title='Home | Chestr'
      description="Save items into wishlists from any online store, and get notified every time there's a discount.">
      <section className='py-12 md:py-28'>
        <div className='container'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full md:w-[50%] order-2'>
              <img className='box-shadow' src={'./images/browser.jpg'} alt='' />
            </div>
            <div className='w-full md:w-[44%] order-1 md:order-3 mb-10 md:0'>
              <H1>Snappy Fast <br /> Shopping Wishlist</H1>
              <Paragraph classname='max-w-[432px]'>
                Save items into wishlists from any online store, and get notified every time there&apos;s a discount.
              </Paragraph>
              <Button target='_blank'
                      href='https://chrome.google.com/webstore/detail/chestr-universal-shopping/aknpjjjjbhhpbdeboefcnnbafldhckej?hl=en&authuser=0'
                      type='second'>
                <img src={'./chrome.svg'} alt='' />
                Get Chestr - It’s Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}