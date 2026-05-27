import Head from "next/head";

import PostEditor from "@src/features/admin/components/editor/PostEditor";
import withAuth from "@src/features/admin/withAuth";

const CreatePage = () => {
  return (
    <>
      <Head>
        <title>Create Post | CAN Trading</title>
      </Head>
      <PostEditor mode="create" />
    </>
  );
};

export default withAuth(CreatePage);
