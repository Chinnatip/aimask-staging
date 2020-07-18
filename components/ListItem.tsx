import Link from 'next/link'
import { User } from '../interfaces'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a className="text-xs font-semibold inline-block  py-2 px-3 uppercase rounded text-pink-600 bg-pink-200 hover:bg-pink-400 uppercase last:mr-0 mr-1 mt-3">
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
