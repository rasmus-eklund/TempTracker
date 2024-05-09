import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

const UserCard = async () => {
  const session = await getServerAuthSession();
  if (session?.user.image) {
    return (
      <Image
        className="h-10 w-10 rounded-full"
        src={session.user.image}
        height={250}
        width={250}
        alt="Profile Picture"
      />
    );
  }
  return <div className="h-10 w-10 rounded-full bg-c4"></div>;
};

export default UserCard;
