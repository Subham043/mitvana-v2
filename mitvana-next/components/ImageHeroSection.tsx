type Props = {
  title: string;
  image: string;
};

function ImageHeroSection({ title, image }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${image})`, backgroundPosition: "center" }}
      className="relative"
    >
      <div className="absolute top-0 start-0 right-0 bottom-0 bg-[#222222] w-full opacity-50"></div>
      <div className="container mx-auto">
        <div className="text-white text-center py-14 relative">
          <h2 className="text-5xl font-medium">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImageHeroSection;
