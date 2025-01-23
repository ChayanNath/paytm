import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between p-3 items-center border-b border-zinc-200 dark:border-zinc-700">
      <h1 className="text-2xl font-bold">Paytm</h1>
      <div className="flex items-center gap-2">
        Hello, {user?.firstName} {user?.lastName}
        <Button onClick={logout}>Signout</Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
