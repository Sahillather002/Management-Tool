import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-[#151515]">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 border-r border-[#272727]">
        <div className="w-full border-b border-[#272727] pb-3">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            <Image src="/star.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold text-white">
              RSKD Talent
            </span>
          </Link>
        </div>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#272727]  flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
