import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPostsPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">{posts.length} artikel</p>
        </div>
        <Button variant="hero" asChild>
          <Link href="/admin/blog-posts/new"><Plus size={16} /> Tambah Artikel</Link>
        </Button>
      </div>

      <AdminTable
        rows={posts}
        rowKey={(p) => p.id}
        columns={[
          { header: "Judul", render: (p) => <span className="font-semibold">{p.title}</span> },
          { header: "Kategori", render: (p) => p.category },
          { header: "Penulis", render: (p) => p.authorName },
          {
            header: "Status",
            render: (p) => (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.published ? "bg-green-400/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                {p.published ? "Published" : "Draft"}
              </span>
            ),
          },
          {
            header: "Aksi",
            render: (p) => (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/blog-posts/${p.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeleteButton action={deleteBlogPost.bind(null, p.id)} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
