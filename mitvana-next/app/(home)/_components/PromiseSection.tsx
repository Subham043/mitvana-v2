import Image from "next/image";

const promises = [
  {
    img: "/images/new-home/cruelty free.svg",
    text: "Cruelty Free",
  },
  {
    img: "/images/new-home/science.svg",
    text: "Ancient Wisdom Modern Science",
  },
  {
    img: "/images/new-home/natural.png",
    text: "Natural Actives",
  },
  {
    img: "/images/new-home/chemical free.svg",
    text: "Free From Harmful Chemicals",
  },
  {
    img: "/images/new-home/care.png",
    text: "Made with Love",
  },
];

function PromiseSection() {
  return (
    <div className="text-[#193a43] mt-24">
      <h2 className="text-center font-semibold text-4xl mb-14">
        Mitvana's Promise
      </h2>
      <div className="w-full flex justify-between flex-wrap">
        {promises.map((promise, index) => (
          <div key={index}>
            <div className="h-28 w-28 md:h-32 md:w-32 grid place-items-center">
              <Image
                src={promise.img}
                width={100}
                height={100}
                alt="img"
                className="h-full w-full"
              />
            </div>
            <div className="w-28 md:w-32 text-center">
              <p className="text-base font-semibold">{promise.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromiseSection;
