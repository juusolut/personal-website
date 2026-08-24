export async function load() {
  // Fetch all markdown files in the content/projects directory
  const modules = import.meta.glob('/src/content/projects/*.md', { eager: true });

  const projects = Object.entries(modules).map(([path, file]) => {
    return {
      slug: file.metadata.slug,
      title: file.metadata.title,
      description: file.metadata.description,
      thumbnail: file.metadata.thumbnail,
      tags: file.metadata.tags,
    };
  });

  return { projects };
}