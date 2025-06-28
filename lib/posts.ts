
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

export type TocItem = {
  id: string
  title: string
  level: number
}
const postsDirectory = path.join(process.cwd(), 'posts');

export const getAllPosts = () => {

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

export function getTableOfContets(content: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const tocItems: TocItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    tocItems.push({
      id: stringToHtmlId(match[2]),
      title: match[2],
      level: match[1].length,
    })
  }

  return tocItems
}

export function stringToHtmlId(value: string): string {
  const stringValue = Array.isArray(value) ? value.join('') : String(value);

  if (typeof value !== 'string') {
    console.error('Expected a string, but got:', value);
    return ''; // Or a fallback string
  }
  return stringValue.toLowerCase().replace(/[^\w]+/g, '-');
}