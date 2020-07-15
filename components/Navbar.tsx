import Link from 'next/link'

export const LinkNav = ({ text = '', link_to = '/' }) => {
  return (
    <a
      href={link_to}
      className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
    >
      {text}
    </a>
  )
}

export const LinkHome = ({ text = '', link_to = '/' }) => {
  return (
    <Link href={link_to}>
      <a className="font-semibold text-xl tracking-tight">{text}</a>
    </Link>
  )
}

export const Logo = () => {
  return (
    <svg
      className="fill-current h-8 w-8 mr-2"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
    </svg>
  )
}
