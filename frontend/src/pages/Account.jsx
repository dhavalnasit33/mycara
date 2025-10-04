import React from "react";
import UserProfile from "../components/userAccount/UserProfile";
import AccountTabs from "../components/userAccount/AccountTabs";


const user = {
  name: "User",
  image: "https://i.pravatar.cc/150?img=12",
};

export default function MyAccount() {
  return (
    <div>
      <UserProfile user={user} />

      <AccountTabs />

    </div>
  );
}
