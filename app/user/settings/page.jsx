import { fetchSetting } from "@/app/actions/user-actions";
import AddSettingForm from "@/app/components/user-forms/settings/AddSettingForm";
import UpdateSettingForm from "@/app/components/user-forms/settings/UpdateSettingForm";

const SettingsPage = async () => {

  const setting = await fetchSetting();

  return (
    setting ?  <UpdateSettingForm setting={setting}  /> : <AddSettingForm />
  );
}

export default SettingsPage

