import { fetchCurrentUser, fetchSetting } from "@/app/actions/user-actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddSettingForm from "@/app/components/user-forms/settings/AddSettingForm";
import UpdateProfileForm from "@/app/components/user-forms/settings/UpdateProfileForm";
import UpdateSettingForm from "@/app/components/user-forms/settings/UpdateSettingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {

  const session = await getServerSession(authOptions);
  
      if(!session) {
          return redirect('/auth/login')
      }

  const setting = await fetchSetting(session?.user?.id);

  const currentUserData = await fetchCurrentUser()

  return (
    <>
    <div className="">
      {setting ?  <UpdateSettingForm setting={setting}  /> : <AddSettingForm /> }
    </div>

    <div className="my-5 py-5 container mx-auto">
        <UpdateProfileForm currentUserData={currentUserData} />
    </div>
    </>
    
    
  );
}

export default SettingsPage

