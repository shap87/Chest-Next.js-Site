//components
import { Layout } from "../components/common";
import { User, Folders, Products, Steps, SubFolders } from "../components/layout/profile";

export default function Profile() {

  return (
    <Layout classname='profile-page' title="Profile | Chestr" description="Profile | Chestr">
      <User />
      <Folders />
      <SubFolders />
      <Products />
      <Steps />
    </Layout>
  );
}
