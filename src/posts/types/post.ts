export class Post {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  createdAt: string;
  constructor(data: {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
  }) {
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.content = data.content;
    this.blogId = data.blogId;
    this.createdAt = new Date().toISOString();
  }
}
