type Props = {
  text: string
}

const Title = ({ text }: Props) => {
  return <h1 className="text-2xl font-bold text-gray-700">{text}</h1>
}

export default Title
