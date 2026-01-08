import { BlogListClient } from "@/components/BlogListClientProps";
import { getAllPosts } from "@/lib/blog";
import { BlogLayout } from "@/components/blog-layout";

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <BlogLayout posts={posts}>
      <BlogListClient posts={posts} />
    </BlogLayout>
  );
}
