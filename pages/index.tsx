//components
import {H1, Paragraph, Button, Layout} from '../components/common';

export default function Home() {
  return (
    <Layout
      title="Home | Chestr"
      description="Save items into wishlists from any online store, and get notified every time there's a discount.">
      <section className="py-12 md:py-28">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-[50%] order-2">
              <img
                className="box-shadow rounded-xl"
                src="/images/browser.jpg"
                alt=""
              />
            </div>
            <div className="w-full md:w-[44%] order-1 md:order-3 mb-10 md:0">
              <H1>
                Snappy Fast <br /> Shopping Wishlist
              </H1>
              <Paragraph classname="text-lg md:text-xl mb-4 md:mb-8 max-w-[432px]">
                Save items into wishlists from any online store, and get
                notified every time there&apos;s a discount.
              </Paragraph>
              <Button
                classname="!py-4 !px-7 !text-lg"
                target="_blank"
                href="https://chrome.google.com/webstore/detail/chestr-universal-shopping/aknpjjjjbhhpbdeboefcnnbafldhckej?hl=en&authuser=0"
                color="pink"
                icon="icon-left">
                <img src="/chrome.svg" alt="" />
                Get Chestr - It’s Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
