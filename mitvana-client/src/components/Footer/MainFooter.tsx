import { Link } from '@tanstack/react-router'
import { Mail, Map, Phone } from 'lucide-react'

function MainFooter() {
  return (
    <div className="bg-[#f6f6f8] pt-5">
      {/* Main Section for Mitvana, Support, and Keep In Touch */}
      <div className="lg:grid lg:grid-cols-12 gap-2 hidden lg:block container mx-auto">
        {/* Mitvana Section - col-span-3 */}
        <div className="col-span-3 text-left">
          <h2 className="text-4xl font-bold text-gray-700">Mitvana</h2>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Phone className="text-zinc-500" />
              <span className="text-zinc-700 font-light">+918025203871</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-zinc-500" />
              <span className="text-zinc-700 font-light">
                info@matxinlabs.com
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Map className="text-zinc-500" />
                <h6 className="text-base text-zinc-700 font-light">
                  Matxin Labs Pvt Ltd
                </h6>
              </div>
              <p className="text-zinc-700 font-light">
                L-21, F-4, Sector 14, LIC Colony,
              </p>
              <p className="text-zinc-700 font-light">
                Jeevan Bima Nagar, Bengaluru,
              </p>
              <p className="text-zinc-700 font-light">
                Karnataka 560075, India
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <a
              target="_blank"
              href="https://www.facebook.com"
              className="d-inline-block"
            >
              <i className="facl facl-facebook text-zinc-500 text-xl"></i>
            </a>
            <a
              target="_blank"
              href="https://twitter.com"
              className="d-inline-block"
            >
              <i className="facl facl-twitter text-zinc-500 text-xl"></i>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com"
              className="d-inline-block"
            >
              <i className="facl facl-instagram text-zinc-500 text-xl"></i>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com"
              className="d-inline-block"
            >
              <i className="facl facl-linkedin text-zinc-500 text-xl"></i>
            </a>
            <a
              target="_blank"
              href="https://www.pinterest.com"
              className="d-inline-block"
            >
              <i className="facl facl-pinterest text-zinc-500 text-xl"></i>
            </a>
          </div>
        </div>

        {/* Support Section - col-span-2 */}
        <div className="col-span-2 text-left">
          <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/about" className="text-zinc-700 font-light">
              Skin Care
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Hair Care
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Hair Cleanser
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Baby & Bath
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Oil & Treatment
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Face Care
            </Link>
          </div>
        </div>

        <div className="col-span-2 text-left">
          <h2 className="text-xl font-semibold text-gray-700">
            More Categories
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/about" className="text-zinc-700 font-light">
              Body Butters
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Serum & Treatment
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Mens Range
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Hair Creams
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Hand Care
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Hair Serums
            </Link>
          </div>
        </div>

        {/* Information Section - col-span-2 */}
        <div className="col-span-2 text-left">
          <h2 className="text-xl font-semibold text-gray-700">Infomation</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/about" className="text-zinc-700 font-light">
              About Us
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              FAQs
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Terms & Conditions
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Returns & Exchanges
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Shipping & Delivery
            </Link>
            <Link to="/about" className="text-zinc-700 font-light">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Useful links Section - col-span-2 */}

        {/* Keep In Touch Section - col-span-3 */}
        <div className="col-span-4 lg:col-span-2 text-left">
          <h2 className="text-xl font-semibold text-gray-700">Keep In Touch</h2>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-zinc-700 font-semibold">
              Get Special discounts to your inbox
            </p>
            <div className="w-full flex items-center gap-2">
              {/* Email input and Subscribe button in the same row */}
              <input
                type="email"
                placeholder="Your Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 px-2 py-2 text-sm rounded outline-none bg-white flex-1"
              />
              <button
                // onClick={handleSubscribe}
                className="text-sm px-3 py-2 bg-[#6e8456] text-white rounded"
              >
                Subscribe
              </button>
            </div>
            <div className="w-full">
              <img
                src="/images/footer-icons.png"
                alt="icons"
                width={'100%'}
                height={100}
                className="w-2/3 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t border-[#e5e7eb]">
        <div className="flex justify-between py-5 container mx-auto">
          <div className="w-3/5 flex justify-start items-center">
            <p>
              @{`${new Date().getFullYear()} `}
              <span style={{ color: '#6e8456', fontWeight: 'bold' }}>
                Mitvana
              </span>
              . All Rights are Reserved
            </p>
          </div>
          <div className="w-1/5 flex justify-end items-center">
            <img src="/images/payment2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFooter
