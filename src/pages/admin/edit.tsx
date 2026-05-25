import PostEditor from "@src/features/admin/components/editor/PostEditor";
import withAuth from "@src/features/admin/withAuth";

const EditPage = () => {
  return <PostEditor mode="edit" />;
};

export default withAuth(EditPage);
