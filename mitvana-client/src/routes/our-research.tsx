import { createFileRoute } from '@tanstack/react-router'
import { CircleCheck } from 'lucide-react'

export const Route = createFileRoute('/our-research')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="pt-10">
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/Q1vW06j_1U8?si=6mLv2nOCcOefSoCX"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="pt-10 flex flex-col items-center md:flex-row gap-10">
          <div className="md:w-3/5 text-[#1b251f]">
            <p className="text-xl font-semibold">
              Research jargon can sometimes be overwhelming and difficult to
              breakdown. We don't expect you to know or understand all the
              science we employ to give you the very best through our work at
              Matxin Labs Pvt Ltd. We will not hide behind complex terminology
              and try to sound smart - instead, we'll break it down for you.
            </p>
            <p className="text-lg py-5">
              There are two major fields that we utilise to develop our personal
              care:
            </p>
            <div className="text-lg">
              <div className="flex items-start gap-4 mb-4 ">
                <div>
                  <CircleCheck strokeWidth={1} size={35} />
                </div>
                <div>
                  <p>
                    Pharmacognosy or the study of the physical, chemical,
                    biochemical and biological properties of substances obtained
                    from natural origin and plant sources
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <CircleCheck strokeWidth={1} size={35} />
                </div>
                <div>
                  <p>
                    Cosmetology or the knowledge and study of application of
                    treatments in skin care, hair care & body care
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-1">
            <img
              src="/images/research/0043.jpg"
              alt="img"
              className="w-full h-[500px] object-cover rounded-md"
            />
          </div>
        </div>
        <div className="pt-10 flex flex-row-reverse items-center gap-10">
          <div className="md:w-3/5 text-[#1b251f]">
            <p className="text-xl font-semibold">
              We're research oriented meaning we like to closely examine natural
              sources to formulate dermatology grade personal care for you. No
              product reaches its final stages without clinical testing and
              trials first. A strong sense of well-being and a healthy
              sustainable lifestyle is our motivation behind every creation at
              our labs.
            </p>
            <p className="text-lg py-5">
              To ensure high standards of quality the following quality
              processes are followed in manufacturing:
            </p>
            <div className="text-lg">
              <img
                src="/images/footer-icons.png"
                alt="img"
                className="w-[300px] h-auto rounded-md hidden md:block"
              />
              <img
                src="/images/research/0050.png"
                alt="img"
                className="w-full h-full rounded-md md:hidden"
              />
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/images/research/0044.jpg"
              alt="img"
              className="w-full h-[400px] object-cover object-top rounded-md"
            />
          </div>
        </div>
        <div className="py-10 grid gap-8 md:grid-cols-4">
          <img
            src="/images/research/0046.jpg"
            alt="img"
            className="w-full h-full rounded-md"
          />
          <img
            src="/images/research/0047.jpg"
            alt="img"
            className="w-full h-full rounded-md"
          />
          <img
            src="/images/research/0048.jpg"
            alt="img"
            className="w-full h-full rounded-md"
          />
          <img
            src="/images/research/0049.jpg"
            alt="img"
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
