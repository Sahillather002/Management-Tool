import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "RECRUITMENT",
    items: [
      {
        icon: "/candidates.png",
        label: "Candidates",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-2 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-start lg:justify-start gap-4 py-4 ml-[-16px] md:px-2 rounded-r-full bg-gradient-to-r from-purple-600 to-red-500"
                >
                  <Image src={item.icon} alt="" width={20} height={20} className="ml-1" />
                  <span className="hidden lg:block text-white">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
