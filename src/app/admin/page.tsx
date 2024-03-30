import { getServerAuthSession } from "~/server/auth";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div>
        <p>Restricted area!</p>
      </div>
    );
  }
  if (session.user.role !== "admin") {
    return (
      <div>
        <p>Restricted area!</p>
      </div>
    );
  }
  return <div>Welcome</div>;
};

export default Admin;
