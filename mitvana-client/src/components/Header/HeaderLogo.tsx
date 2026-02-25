import { Link } from '@tanstack/react-router'

function HeaderLogo() {
  return (
    <div className="h-8 md:h-28">
      <Link className="" to="/">
        <img
          src={'https://www.silkrute.com/images/detailed/4197/41Hf8D9I9lL.jpg'}
          alt=""
          className="  h-full"
        />
      </Link>
    </div>
  )
}

export default HeaderLogo
