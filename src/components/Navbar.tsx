import Image from "next/image"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-[#151515] border-b border-[#272727]'>
      {/* SEARCH BAR */}
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full w-1/3 px-2 bg-[#1E1E1E]'>
        <Image src="/search.png" alt="" width={14} height={14}/>
        <input type="text" placeholder="Search for jobs, candidates and more..." className="w-full p-2 bg-transparent outline-none"/>
      </div>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-4 justify-end w-full'>
        <Image src="/setting.png" alt="" width={36} height={36} className="rounded-full"/>
        <Image src="/notification.png" alt="" width={36} height={36} className="rounded-full"/>
        <Image src="/user_profile.png" alt="" width={36} height={36} className="rounded-full"/>
      </div>
    </div>
  )
}

export default Navbar