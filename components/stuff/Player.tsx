import ReactPlayer from 'react-player'

type Props = {
  link: string
  width?: string
  height?: string
}

// Render a YouTube video player
const Player = ({ link, width = '100%', height = '320px' }: Props) => {
  return <ReactPlayer url={link} width={width} height={height} />
}

export default Player
