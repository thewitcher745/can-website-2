import Head from "next/head";

import PostEditor from "@src/features/admin/components/editor/PostEditor";
import withAuth from "@src/features/admin/withAuth";

const EditPage = () => {
  return (
    <>
      <Head>
        <title>Edit Post | CAN Trading</title>
      </Head>
      <PostEditor mode="edit" />
    </>
  );
};

export default withAuth(EditPage);
