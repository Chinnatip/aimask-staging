import Title from '@/stuff/Title'
import Thumbnail from '@/stuff/ThumbnailBanner'
import CourseCard from '@/stuff/CourseCard'

type Props = {
  data: {
    image_url: string
    title: string
    lists: any[]
  }
  banner?: boolean
}

const CourseSet = ({ data, banner = true }: Props) => {
  const { image_url, title, lists } = data
  return (
    <>
      {banner ? (
        <Thumbnail image_url={image_url} text={title} />
      ) : (
        <div className="mx-4">
          <Title text={title} />
        </div>
      )}
      {lists.slice(0, 5).map((i, index) => (
        <CourseCard
          data={i}
          total={lists.length}
          last={index == 4 ? true : false}
        />
      ))}
    </>
  )
}

export default CourseSet
