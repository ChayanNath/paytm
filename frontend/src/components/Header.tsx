import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <div className="flex justify-between p-3 items-center border-b border-zinc-200 dark:border-zinc-700">
      <h1 className="text-2xl font-bold">Paytm</h1>
      <div className="flex items-center gap-2">
        Hello, User
        <Button>Signout</Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
