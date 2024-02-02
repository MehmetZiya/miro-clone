import NewButton from './new-button'

export default function Sidebar() {
  return (
    <aside className='flex flex-col fixed z-[1] left-0 bg-blue-950 h-full w-[60px] p-3 gap-y-4 text-white'>
      <NewButton />
    </aside>
  )
}
