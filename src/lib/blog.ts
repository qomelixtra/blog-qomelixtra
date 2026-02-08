import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "..", "content/blog");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  language: "en" | "km";
  category: string;
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts: Post[] = [];

    // Read all items in the blog directory
    const items = await fs.readdir(postsDirectory, { withFileTypes: true });

    // Process folders and markdown files
    for (const item of items) {
      if (item.isDirectory()) {
        // Read markdown files from subdirectories
        const subDirPath = path.join(postsDirectory, item.name);
        const files = await fs.readdir(subDirPath);

        for (const fileName of files) {
          if (fileName.endsWith(".md")) {
            const slug = `${item.name}/${fileName.replace(/\.md$/, "")}`;
            const post = await getPostBySlug(slug);
            if (post) posts.push(post);
          }
        }
      } else if (item.name.endsWith(".md")) {
        // Also support markdown files in root
        const slug = item.name.replace(/\.md$/, "");
        const post = await getPostBySlug(slug);
        if (post) posts.push(post);
      }
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Extract category from folder path (first part of slug)
    const category = slug.includes("/")
      ? slug.split("/")[0]
      : data.category || "General";

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      language: data.language || "en",
      category: category.charAt(0).toUpperCase() + category.slice(1),
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
