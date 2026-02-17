import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/our-story')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8 pt-10 text-[#193a43]">
        <div>
          <p className="text-lg font-semibold">
            Wellness is a journey, and we believe that it is one of the most
            personal experiences beginning with our inner selves. At Mitvana,
            we’re harnessing the unique herbal knowledge of ancient India to be
            your partners in this wellness journey.
          </p>
        </div>

        <div className="w-full">
          <div className="w-full aspect-square rounded-xl overflow-hidden">
            <img
              src="/images/story/img1.jpg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-5 text-[#193a43] md:col-span-2 lg:col-span-1">
          <p className="text-base font-medium">
            We're going to save you the time to read through how we're a
            well-researched head to toe premium brand, crafting products to meet
            international standards. What you really want is personal care that
            tunes into your personal journey effectively; not just products but
            a way of life that is more honest, effective & responsible. And
            we're here to deliver. Before you start your own journey with
            Mitvana, you might want to know how ours began.
          </p>
          <h5 className="font-semibold text-lg">
            THE VISIONARY DOYEN OF HERBAL RESEARCH IN INDIA
          </h5>
          <p className="text-base font-medium">
            Established in 2011 in Bangalore, India by{' '}
            <strong>Dr. S.K Mitra</strong>, our motivation. Dr Mitra has been
            previously a partner and Executive Director with the Himalaya Drug
            Company and CEO of Zandu-Emami group, a veteran in the field of
            herbal products' research and development for the last 3 decades, he
            has dedicated his years to make personal care accessible and
            efficient for all.
          </p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        <div className="w-full border rounded-xl flex flex-col items-center gap-10 p-6 h-fit">
          <div className="aspect-square h-[100px]">
            <img
              src="/images/story/customers3.svg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center text-[#193a43]">
            <h1 className="text-6xl font-semibold">500K+</h1>
            <p className="text-xl font-medium">Happy customers</p>
          </div>
        </div>
        <div className="w-full border rounded-xl flex flex-col items-center gap-10 p-6 h-fit">
          <div className="aspect-square h-[100px]">
            <img
              src="/images/story/global3.svg"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center text-[#193a43]">
            <h1 className="text-6xl font-semibold">22+</h1>
            <p className="text-xl font-medium">Counties</p>
          </div>
        </div>
        <div className="w-full border rounded-xl flex flex-col items-center gap-10 p-6 h-fit">
          <div className="aspect-square h-[100px]">
            <img
              src="/images/story/certified.png"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center text-[#193a43]">
            <h1 className="text-6xl font-semibold">63+</h1>
            <p className="text-xl font-medium">Products</p>
          </div>
        </div>
      </div>
      <div className="py-[50px] bg-[#fbf4df]">
        <div className="container mx-auto flex justify-between flex-col items-center md:flex-row gap-5">
          <div className="md:w-[30%]">
            <div className="w-full rounded-xl overflow-hidden">
              <img
                src="/images/story/img1.jpg"
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:flex-1 space-y-5">
            <h4 className="text-2xl font-semibold"> Our Promise</h4>
            <p className="text-[#193a43] text-base font-medium">
              To say that Natural Herbs are an important element of our
              production process would be an understatement. As our name
              suggests, we're Mit-vana or 'friends of the forest. At our core,
              we're focussed on staying connected to nature. Our natural
              elements are sourced from responsible suppliers who cultivate
              these plants using healthy and safe agricultural practices, free
              from pesticides and any other toxic chemicals, with the extraction
              of herbs done using only what's good and true - pure water.
            </p>
            <p className="text-[#193a43] text-base font-medium mb-10">
              We believe that only the most authentic and natural personal care
              can be your meet,your friend, on this journey. And so, our promise
              is to deliver care that is innovative yet intuitive, products that
              meet quality standards and at the same time, suit your personal
              needs, and a way of life that is in tune with your wellness
              journey.
            </p>
            <a href="/shop">
              <button className="textx-base font-semibold text-white py-2 px-4 bg-[#6d8355]">
                EXPLORE OUR PRODUCTS
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
