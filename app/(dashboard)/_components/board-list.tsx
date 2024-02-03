'use client'

import { EmptyBoards } from './empty-boards'
import { EmptyFavorites } from './empty-favorites'
import { EmptySearch } from './empty-search'

interface BoardListProps {
  ordId: string
  query: {
    search?: string
    favorites?: boolean
  }
}

export default function BoardList({ ordId, query }: BoardListProps) {
  const data = []

  if (!data?.length && query.search) {
    return <EmptySearch />
  }
  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }
  if (!data?.length) {
    return <EmptyBoards />
  }
  return (
    <div>
      <h1>BoardList</h1>
    </div>
  )
}
