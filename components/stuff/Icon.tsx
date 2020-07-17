import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  fill: any
}

// Font Awesome Icon
const Icon = ({ fill }: Props) => {
  return <FontAwesomeIcon icon={fill} className="mr-3 fa-show" />
}

export default Icon

// Other icon
export const FacebookIcon = () => {
  return (
    <svg
      className="svg-inline--fa fa-plus fa-w-20 mr-2 fa-show"
      viewBox="0 0 50 50"
    >
      <path
        fill="currentColor"
        d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
      ></path>
    </svg>
  )
}

export const YoutubeIcon = () => {
  return (
    <svg
      className="svg-inline--fa fa-plus fa-w-20 mr-2 fa-show"
      viewBox="0 0 682 496"
    >
      <path
        fill="currentColor"
        d="M647.2,94.3c-7.4-27.4-29-49-56.4-56.4c-50-13.7-250.2-13.7-250.2-13.7s-200.1,0-250.2,13.2c-26.9,7.4-49,29.5-56.4,56.9 C21,144.3,21,248.1,21,248.1s0,104.3,13.2,153.8c7.4,27.4,29,49,56.4,56.4c50.6,13.7,250.2,13.7,250.2,13.7s200.1,0,250.2-13.2 c27.4-7.4,49-29,56.4-56.4c13.2-50,13.2-153.8,13.2-153.8S660.9,144.3,647.2,94.3z M276.9,343.9V152.2l166.4,95.9L276.9,343.9z"
      ></path>
    </svg>
  )
}

export const InstagramIcon = () => {
  return (
    <svg
      className="svg-inline--fa fa-plus fa-w-20 mr-2 fa-show"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M373.4,0H138.6C62.2,0,0,62.2,0,138.6v234.8C0,449.8,62.2,512,138.6,512h234.8c76.4,0,138.6-62.2,138.6-138.6V138.6 C512,62.2,449.8,0,373.4,0z M256,396c-77.2,0-140-62.8-140-140s62.8-140,140-140s140,62.8,140,140S333.2,396,256,396z M399.3,149 c-22.8,0-41.4-18.6-41.4-41.4s18.6-41.4,41.4-41.4s41.4,18.6,41.4,41.4S422.2,149,399.3,149z"
      />
      <path
        fill="currentColor"
        d="M256,157.2c-54.5,0-98.8,44.3-98.8,98.8c0,54.5,44.3,98.8,98.8,98.8c54.5,0,98.8-44.3,98.8-98.8 C354.8,201.5,310.5,157.2,256,157.2z"
      />
      <path
        fill="currentColor"
        d="M399.3,93c-8.1,0-14.7,6.6-14.7,14.7s6.6,14.7,14.7,14.7c8.1,0,14.7-6.6,14.7-14.7S407.4,93,399.3,93z"
      />
    </svg>
  )
}
