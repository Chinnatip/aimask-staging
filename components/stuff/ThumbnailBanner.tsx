type Props = {
  image_url: string
  text: string
}

const Thumbnail = ({ image_url, text }: Props) => {
  return (
    <div
      className="h-24 my-4 mx-6 bg-gray-300 relative rounded-lg flex items-center justify-center text-white text-2xl mr-20 bg-no-repeat bg-cover bg-local bg-center bg-gray-400 font-bold"
      style={{ backgroundImage: `url(${image_url})` }}
    >
      <img
        src="ic_edit.png"
        className="absolute top-8 right-8 h-12"
        alt="edit button"
        style={{
          top: '12px',
          right: '12px',
          height: '24px',
        }}
      />
      " {text} "
    </div>
  )
}

export default Thumbnail
