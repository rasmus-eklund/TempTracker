import { getServerAuthSession } from "~/server/auth";
import GetData from "./_components/GetData";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div>
        <p>Restricted area!</p>
      </div>
    );
  }
  console.log(session.user);
  if (session.user.role !== "admin") {
    return (
      <div>
        <p>Restricted area!</p>
      </div>
    );
  }
  return (
    <div>
      <p>Welcome</p>
      <GetData />
    </div>
  );
};

export default Admin;
