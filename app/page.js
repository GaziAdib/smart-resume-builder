import { getServerSession } from "next-auth";
import LogoutButton from "./ui/LogoutButton";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello Smart Resume Developer!
      <LogoutButton color={'gray'} label={'Logout'} />
      {session?.user?.email}
    </main>
  );
}
