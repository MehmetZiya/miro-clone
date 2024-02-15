'use client'

export default function Info() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md p-3 h-12 center shadow-md'>
      <Button
        asChild
        variant='board'
        className='px-2'
        onClick={() => console.log('clicked')}
      >
        <Link href='/'>
          <Image src='/logo.svg' alt='Board logo' height={30} width={30} />
          <span
            className={cn(
              'font-semibold text-xl ml-2 text-logo',
              font.className
            )}
          >
            Board
          </span>
        </Link>
      </Button>
      <TabSeparator />
      <Hint label='Edit title' side='bottom' sideOffset={10}>
        <Button
          variant='board'
          className='text-base font-normal px-2'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side='bottom' sideOffset={10}>
        <div>
          <Hint label='Main menu' side='bottom' sideOffset={10}>
            <Button size='icon' variant='board'>
              <SlidersHorizontal />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 center shadow-md w-[300px]' />
  )
}
