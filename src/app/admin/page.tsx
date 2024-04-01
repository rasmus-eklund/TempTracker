import { getServerAuthSession } from "~/server/auth";
import GetData from "./_components/GetData";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (session && session.user.role === "admin") {
    return (
      <div>
        <p>Welcome</p>
        <GetData />
      </div>
    );
  }
  return (
    <div>
      <p>Restricted area!</p>
    </div>
  );
};

export default Admin;
