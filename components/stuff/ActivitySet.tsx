import Title from '@/stuff/Title'
import ActivityCard from '@/stuff/ActivityCard'

type Props = {
  data: any
  title: string
}

const ActivitySet = ({ data, title }: Props) => {
  return (
    <>
      <div className="mx-4">
        <Title text={title} />
      </div>
      {data.slice(0, 2).map((item: any) => (
        <div className="inline-block w-1/2 relative my-4 px-4 bg-white">
          <ActivityCard data={item} />
        </div>
      ))}
    </>
  )
}

export default ActivitySet
