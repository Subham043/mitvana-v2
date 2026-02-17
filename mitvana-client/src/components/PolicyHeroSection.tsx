type Props = {
  title: string
}

function PolicyHeroSection({ title }: Props) {
  return (
    <div className="bg-[#fbf4e1] py-10 text-[#194455]">
      <div className="container mx-auto">
        <h1 className="afacad-flux text-4xl text-center font-semibold tracking-wider">
          {title}
        </h1>
        <p className="text-center text-lg tracking-wider">Home / {title}</p>
      </div>
    </div>
  )
}

export default PolicyHeroSection
