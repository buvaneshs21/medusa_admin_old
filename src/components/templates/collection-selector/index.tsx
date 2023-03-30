import { useAdminCollections } from "medusa-react"
import React, { useEffect, useState } from "react"
import { usePagination, useTable } from "react-table"
import { useDebounce } from "../../../hooks/use-debounce"
import Spinner from "../../atoms/spinner"
import Table from "../../molecules/table"
import { FilteringOptionProps } from "../../molecules/table/filtering-option"
import useCollectionTableColumn from "./use-collection-column"
import medusaRequest from "../../../services/request"
import useNotification from "../../../hooks/use-notification"
import Medusa from "@medusajs/medusa-js"

const DEFAULT_PAGE_SIZE = 15

type CollectionModalFormData = {
  selectedData: string
}

const collection_id = async () => {
  const path = `/admin/collection_id`
  const id = await medusaRequest("get", path);
  return id.data.response
  }
  

  const key = await collection_id()

const CollectionSelectTable: React.FC<CollectionModalFormData> = () => {
  const [filteringOptions] = useState<
    FilteringOptionProps[]
  >([])
  const [offset, setOffset] = useState(0)
  const limit = DEFAULT_PAGE_SIZE
  const [query, setQuery] = useState("")
  const [numPages, setNumPages] = useState(0)
  const notification = useNotification()
  const [id, setId] = useState(key)
  const [isSaving, setIsSaving] = useState(false);


  const [selectedCollection, setSelectedCollection] = useState(null);
  const handleRowClick = (collection) => {
    setSelectedCollection(collection.id);
  };

  const debouncedSearchTerm = useDebounce(query, 300)
  const { collections, isLoading, isRefetching, count } = useAdminCollections(
    {
      q: debouncedSearchTerm,
      offset: offset,
      limit,
    },
    {
      keepPreviousData: true,
    }
  )

  useEffect(()=>{
    setId(selectedCollection)
      
  },[selectedCollection])
 
  
  const [columns] = useCollectionTableColumn(id)

  const MEDUSA_BACKEND_URL = "http://localhost:9000"
  const cart_id = "cart_01GTHA4QPPRB3MYBHK6ZRSN6JZ"
 
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
medusa.carts.retrieve(cart_id)
.then(({ cart }) => {
 console.log(cart.id);
});


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: collections || [],
      manualPagination: true,
      initialState: {
        pageIndex: Math.floor(offset / limit),
        pageSize: limit,
      },
      pageCount: numPages,
      autoResetPage: false,
    },
    usePagination
  )
  const handleSearch = (q: string) => {
    setOffset(0)
    setQuery(q)
  }

  useEffect(() => {
  
  }, [])


  useEffect(() => {
    },[selectedCollection])

  const handleSave = async () => {
    setIsSaving(true);
    const path = `/admin/SelectCollection?id=${selectedCollection}`
     const data = await medusaRequest("get", path);
     const result = data.data.response
    if(result == true){
 
    
     notification(
      "Success",
      "Successfully updated Special collection",
      "success"
      )
      setIsSaving(false);
      }
  };

  return (
    <div>
      <Table
        enableSearch
        handleSearch={handleSearch}
        searchValue={query}
        searchPlaceholder="Search Collections"
        filteringOptions={filteringOptions}
        {...getTableProps()}
      >
        <Table.Head>
          {headerGroups?.map((headerGroup) => (
            <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Table.HeadCell
                  className="min-w-[100px]"
                  {...col.getHeaderProps()}
                >
                  {col.render("Header")}
                </Table.HeadCell>
              ))}
            </Table.HeadRow>
          ))}
        </Table.Head>
        
        {isLoading || isRefetching || !collections ? (
          <Table.Body {...getTableBodyProps()}>
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                <div className="w-full pt-2xlarge flex items-center justify-center">
                  <Spinner size={"large"} variant={"secondary"} />
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ) : (
          <Table.Body {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return <CollectionRow row={row} onRowClick={handleRowClick} />
            })}
          </Table.Body>
        )}
        
      </Table>
      {!isSaving &&selectedCollection && (
        <div className="relative mt-4">
            <button
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 absolute top-0 right-0"
                onClick={handleSave}
                    
            >
                Save
            </button>
        </div>
      )}
        
        
      </div>
  ) 
  
}
const CollectionRow = ({ row, onRowClick }) => {
    
    const collection = row.original
  
    const handleClick = () => {
      onRowClick(collection)
    }
  
    return (
      <Table.Row onClick={handleClick} {...row.getRowProps()}>
        {row.cells.map((cell, index) => {
          return (
            <Table.Cell {...cell.getCellProps()}>
              {cell.render("Cell", { index })}
            </Table.Cell>
          )
        })}
      </Table.Row>
    )
  }
  

  
export default CollectionSelectTable
