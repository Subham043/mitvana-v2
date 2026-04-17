import Image from "next/image";

function CountriesSection() {
  return (
    <div className="text-[#193a43] mt-24">
      <h2 className="text-center font-semibold text-4xl mb-5">
        22 Countries & Counting
      </h2>
      <div className="w-full grid place-items-center">
        <Image
          src="/images/new-home/countries.jpg"
          alt="img"
          className="w-full"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}

export default CountriesSection;
