import PostEditor from "@src/features/admin/components/editor/PostEditor";
import withAuth from "@src/features/admin/withAuth";

const CreatePage = () => {
  return <PostEditor mode="create" />;
};

export default withAuth(CreatePage);
