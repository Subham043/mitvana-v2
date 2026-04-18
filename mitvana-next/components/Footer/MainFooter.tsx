import FooterLinks from "./FooterLinks";

function MainFooter() {
  return (
    <div className="bg-[#f6f6f8] pt-5">
      {/* Main Section for Mitvana, Support, and Keep In Touch */}
      <FooterLinks />

      {/* Footer Section */}
      <div className="border-t border-[#e5e7eb]">
        <div className="flex flex-col md:flex-row justify-center md:justify-between py-5 container mx-auto max-w-[90%]">
          <div className="w-full md:w-3/5 flex justify-center md:justify-start items-center">
            <p>
              @{`${new Date().getFullYear()} `}
              <span style={{ color: "#6e8456", fontWeight: "bold" }}>
                Mitvana
              </span>
              . All Rights are Reserved
            </p>
          </div>
          <div className="w-full md:w-1/5 flex justify-center md:justify-end items-center mt-3 md:mt-0">
            <img
              src="/images/payment2.png"
              alt=""
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
