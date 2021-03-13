import axios from "axios"
import { useState, useEffect } from "react"
import LineChart from '@/chart/LineChart'
import GroupedBar from '@/chart/GroupedBar'

interface UserJSONPLACE  {
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
  address: {
    city: string
    street: string
    suite: string
    zipcode: string
  }
}

const mockUser: UserJSONPLACE = {
  email: '',
  id: 0,
  name: '',
  phone: '',
  username: '',
  website: '',
  company: {
    bs: '',
    catchPhrase: '',
    name: '',
  },
  address: {
    city: '',
    street: '',
    suite: '',
    zipcode: '',
  }
}

const Page = () => {
  const [ users , setUser ] = useState<UserJSONPLACE[]>([])
  const [ current, setCurrent ] = useState(mockUser)
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if(response.status == 200){
          console.log(response.data)
          setUser(response.data)
          setCurrent(response.data[0])
        }
      } );
  }, []);
  return <div className="w-full h-screen bg-teal-600 text-white flex items-center justify-center flex-col">
    <div>
      { current ?
        <>
          <div className="px-12 text-2xl">{`Hello ${current?.name}`}</div>
          <div className="text-teal-900 px-12" >{current?.address?.city}</div>
          <div className="text-teal-900 px-12" >{current?.company?.name}</div>
          <div className="text-teal-900 px-12" >{current?.email}</div>
          <div className="text-teal-900 px-12" >{current?.phone}</div>
          <div className="mb-4"></div>
        </>
        : <h1>Loading</h1>
       }
      <hr/>
      <div className="px-12 text-2xl">{`we have ${users.length} users`}</div>
      <hr/>
      { users.filter(user => user.id < 5)
          .sort((a,b) => b.id - a.id )
          .map(user => <button
            onClick={() => setCurrent(user) }
            className={`${user.id == current.id && "text-yellow-400" }  flex w-full px-12`}>
          <span className="w-64" >{user.name}</span>
          <span className="w-24" >{user.id}</span>
          <span className="w-32" >{user.phone}</span>
          <span className="w-48" >{user.website}</span>
          <span className="w-24" >{user.address.city}</span>
        </button>
      )}
      <hr/>
      <div className="flex ">
        <div className="bg-white w-64 flex-grow">
          <div className="w-full">
            <LineChart></LineChart>
          </div>
        </div>
        <div className="ml-4 bg-white w-64 flex-grow">
          <div className="w-full">
            <GroupedBar></GroupedBar>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Page
