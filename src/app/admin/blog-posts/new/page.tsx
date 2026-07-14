import BlogPostForm from "../BlogPostForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Tambah Artikel</h1>
      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
