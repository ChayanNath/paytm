import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  handleSendMoney: (user: User) => void;
}

const UserList = memo(
  ({ users, loading, error, handleSendMoney }: UserListProps) => {
    if (loading) {
      return <p>Loading users...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    return (
      <div>
        {users.map((user: User) => (
          <Card key={user.id} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarFallback>
                    {user.firstName.charAt(0).toUpperCase() +
                      user.lastName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
              </div>
              <Button onClick={() => handleSendMoney(user)}>Send Money</Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }
);

export default UserList;
