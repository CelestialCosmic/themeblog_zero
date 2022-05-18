import React, { useState, useEffect } from 'react'
import { CustomIssue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { formatPage } from '@/utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import { External } from '@components/Icons'

type BookProps = {}

const Book: React.FC<BookProps> = () => {
  const loading = useLoading()
  const [list, setList] = useState<Array<CustomIssue>>([])

  const handleQuery = () => {
    queryIssueByLabel('Book')
      .then(async (data) => {
        await loading()
        const list = formatPage(data[0])
        setList(list)
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleQuery()
  }, [])

  return (
    <div className="page">
      {list.length ? (
        <div className="fade select-text my-10">
          {list.map((item) => {
            return (
              <div className="mb-10 leading-relaxed">
                <a className="link text-xl" href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                  <External className="inline-block w-5 h-5 transform -translate-y-0.5" />
                </a>
                <p>作者：{item.author}</p>
                <p>出版时间：{item.published}</p>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Book
