import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    // Dynamically import the matching markdown file
    const post = await import(`../../../content/projects/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    throw error(404, `Could not find project: ${params.slug}`);
  }
}