import { getServerAuthSession } from "~/server/auth";
import GetData from "./_components/GetData";
import { getUser } from "./_components/GetUser";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div>
        <p>Restricted area!</p>
      </div>
    );
  }
  const user = await getUser(session.user.id);

  if (user?.role !== "admin") {
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
