import moment from "moment"
import React, { useMemo, useState } from "react"
import Tooltip from "../../atoms/tooltip"
// import medusaRequest from "../../../services/request"

 
 
const useCollectionTableColumn = (id) => {
  
  const [selectedRow, setSelectedRow] = useState(id)

  const columns = useMemo(
    () => [
      {
        Header: "Select any one",
        accessor: "selectedData",
        Cell: ({ row: { original } }) => (
          <div className="flex items-center">
            <input
              type="radio"
              value={original.id}
              checked={selectedRow === original.id}
              onChange={() => setSelectedRow(original.id)}
            />
          </div>
        ),
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row: { original } }) => (
          <div className="flex items-center">{original.title}</div>
        ),
      },
      {
        Header: "Handle",
        accessor: "handle",
        Cell: ({ cell: { value } }) => <div>/{value}</div>,
      },
      {
        Header: "Created At",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      },
      {
        Header: "Products",
        accessor: "products",
        Cell: ({ cell: { value } }) => {
          return <div>{value?.length || "-"}</div>
        },
      },
    ],
    [selectedRow]
  )
    
  return [columns,selectedRow,setSelectedRow]
}

export default useCollectionTableColumn
