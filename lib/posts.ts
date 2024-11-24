
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark, } from 'remark';
import html from "remark-html";

export type PostPreview = {

  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  updatedAt: string;
  content: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  image: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

// export function getSortedPostsData() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     const slug = fileName.replace(/\.md$/, '');
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const matterResult = matter(fileContents);
//     console.log(matterResult.data);
//     return {
//       slug,
//       ...matterResult.data,
//     };
//   });

//   return allPostsData.sort(({ date: a }, { date: b }) => {
//     return new Date(b) - new Date(a);
//   });
// }

export const getRecentPosts = () => {

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...matterResult.data,
    } as PostPreview;
  });
  return allPostsData;
}

export function getPostData(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
  } as Post;
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}