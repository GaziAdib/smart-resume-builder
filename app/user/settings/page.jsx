import { fetchSetting } from "@/app/actions/user-actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddSettingForm from "@/app/components/user-forms/settings/AddSettingForm";
import UpdateSettingForm from "@/app/components/user-forms/settings/UpdateSettingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {

  const session = await getServerSession(authOptions);
  
      if(!session) {
          return redirect('/auth/login')
      }

  const setting = await fetchSetting(session?.user?.id);

  return (
    <div className="">
      {setting ?  <UpdateSettingForm setting={setting}  /> : <AddSettingForm /> }
    </div>
    
  );
}

export default SettingsPage

