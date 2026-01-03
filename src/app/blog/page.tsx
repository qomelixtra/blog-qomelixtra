import { BlogListClient } from "@/components/BlogListClientProps";
import { getAllPosts } from "@/lib/blog";


export default async function BlogListPage() {
  const posts = await getAllPosts();
  
  return <BlogListClient posts={posts} />;
}