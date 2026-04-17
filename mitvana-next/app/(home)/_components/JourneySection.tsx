import Image from "next/image";

function JourneySection() {
  return (
    <div className="text-[#193a43] mt-24 grid md:grid-cols-2 gap-10">
      <div className="flex flex-col">
        <div className="">
          <h2 className="font-semibold text-4xl mb-2">Your Wellness Journey</h2>
          <h3 className="text-2xl text-[#5c808a]">Our Intuitive Care</h3>
          <p className="my-4 text-lg font-light text-[#5c808a]">
            At Mitvana, we believe that wellness is a deeply personal journey
            that begins with our inner conscious self. By harnessing the unique
            herbal knowledge of ancient India, we wish to be your partners in
            your wellness journey.
          </p>
        </div>
        <div>
          <Image
            src="/images/new-home/wellness.jpg"
            width={1920}
            height={1080}
            alt="img"
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-col-reverse">
        <div className="">
          <h2 className="font-semibold text-4xl mt-3 mb-2">Our Commitment</h2>
          <p className="my-4 text-lg font-light text-[#5c808a]">
            Research and quality is the heart & soul of Mitvana. We closely
            examine natural sources to formulate dermatology grade personal care
            for you. No product reaches its final stages without clinical
            testing and trials first. A strong sense of well-being and a healthy
            sustainable lifestyle is our motivation behind every creation at our
            labs.
          </p>
        </div>
        <div>
          <Image
            src="/images/new-home/commitment.jpg"
            width={1920}
            height={1080}
            alt="img"
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default JourneySection;
