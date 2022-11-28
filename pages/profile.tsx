//components
import { Layout } from "../components/common/Layout/Layout";
import { User, Folders, Products, Steps } from "../components/profile";

export default function Profile() {

  return (
    <Layout title="Profile | Chestr" description="Profile | Chestr">
      <User />
      <Folders />
      <Products />
      <Steps />
    </Layout>
  );
}
