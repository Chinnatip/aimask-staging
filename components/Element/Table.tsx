type Props = {
  row?: any[]
  header?: any[]
}

const Table = ({ row = [], header = [] }: Props) => {
  return (
    <div className="w-full mt-12">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Latest Reports
      </p>
      <div className="bg-white overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {header.map((item, index) => {
                return index <= 1 ? (
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    {item}
                  </th>
                ) : (
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    {item}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {row.map((item, index) => (
              <tr className={index % 2 == 1 ? 'bg-gray-200' : ''}>
                <td className="w-1/3 text-left py-3 px-4">{item[0]}</td>
                <td className="w-1/3 text-left py-3 px-4">{item[1]}</td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href={`tel:${item[2]}`}>
                    {item[2]}
                  </a>
                </td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href={`mailto:${item[3]}`}>
                    {item[3]}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
