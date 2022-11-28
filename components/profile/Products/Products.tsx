// components
import { H6 } from "../../common/H6/H6";
import { Button } from "../../common/Button/Button";

export const Products = () => {
  return (
    <section className="py-4 md:py-8">
      <div className="container">
        <H6>Products</H6>
        <div className="flex items-center">
          <label className="flex-1 relative">
            <img
              className="absolute z-10 w-4 left-4 top-1/2 -translate-y-1/2"
              src={"./search.svg"}
              alt=""
            />
            <input
              className="pl-10"
              type="search"
              placeholder="Search (⌘+K)"
            />
          </label>
          <Button classname="ml-4 md:ml-10 !p-3 !border-[#D0D5DD] group">
            <img
              className="w-4 !mr-0 group-hover:invert"
              src={"./filter.svg"}
              alt=""
            />
          </Button>
        </div>
      </div>
    </section>
  )
}