import UserCard from "./UserCard";
import NavMenu from "./NavMenu";

const NavBar = () => {
  return (
    <header className="flex items-center justify-between bg-c3 p-4">
      <h1>TempTracker</h1>
      <div className="flex items-center gap-5">
        <NavMenu />
        <UserCard />
      </div>
    </header>
  );
};

export default NavBar;
