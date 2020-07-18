import * as React from 'react'
import Icon from '../components/stuff/Icon'
import { User } from '../interfaces'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

type ListDetailProps = {
  item: User
}

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div className="p-20">
    <h1 className="text-4xl">Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
    <br />
    <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style={{ transition: 'all .15s ease' }}
    >
      <Icon fill={faBackward} />
      <a href="/users">Back to user lists</a>
    </button>
  </div>
)

export default ListDetail
