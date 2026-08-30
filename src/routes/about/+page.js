export async function load() {
    const modules = import.meta.glob('/src/content/projects/*.md', { eager: true });

    const tagsSet = new Set();

    for (const path in modules) {
        const file = modules[path];
        const tags = file?.metadata?.tags;

        if (Array.isArray(tags)) {
            tags.forEach((tag) => tagsSet.add(tag));
        } else if (typeof tags === 'string') {
            tagsSet.add(tags);
        }
    }

    return {
        tags: Array.from(tagsSet)
    };
}