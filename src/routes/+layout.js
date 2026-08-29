export const prerender = true;
export const trailingSlash = "never";

// Fetch all markdown files in the content/projects directory
  


  export async function load() {
  // 1. Import all .md files in your articles directory
  const modules = import.meta.glob('/src/content/projects/*.md', { eager: true });

  const showcasedProjects = [];

  for (const path in modules) {
    const file = modules[path];

    // Assuming you use a markdown plugin like mdsvex that exposes frontmatter under metadata
    if (file && file.metadata && file.metadata.isShowcased) {
      showcasedProjects.push({
        ...file.metadata,
        // Optional: extract slug from path if not explicitly in frontmatter
        slug: file.metadata.slug || path.split('/').pop().replace('.md', '')
      });
    }
  }

  return {
    projects: showcasedProjects
  };
}
