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
    const fileNames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "");
          const post = await getPostBySlug(slug);
          return post;
        })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      language: data.language || "en",
      category: data.category || "General",
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
