import { type Session } from "next-auth";
import Image from "next/image";
import { Logout } from "./Auth";
import Icon from "~/icons/Icon";
import Link from "next/link";

type Props = { user: Session["user"] };

const UserCard = ({ user: { name, image, role } }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="group relative flex flex-col">
        <Icon icon="hamburgerMenu" className="h-10" />
        <div className="absolute right-0 top-full hidden flex-col gap-1 border border-black bg-c1 p-2 group-hover:flex">
          <p className="select-none text-nowrap">{name}</p>
          {role === "admin" ? <Link href={"/admin"}>Admin</Link> : null}
          <Logout />
        </div>
      </div>

      {image ? (
        <Image
          className="h-10 w-10 rounded-full"
          src={image}
          height={250}
          width={250}
          alt="Profile Picture"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-c4"></div>
      )}
    </div>
  );
};

export default UserCard;
