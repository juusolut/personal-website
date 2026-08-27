import type { svelte } from "@sveltejs/vite-plugin-svelte";
import { type IconName } from "../../types/icon-names";

export interface TagConfig {
  label: string;
  bg: string;
  icon: IconName;
}

export const DEFAULT_TAG: TagConfig = {
  label: 'Code',
  bg: 'rgba(107, 114, 128, 0.12)',
  icon: "Default"
};

export const TAG_CONFIG: Record<string, TagConfig> = {
  react: {
    label: 'React',
    bg: '#9bbec9',
    icon: "React"
  },
  rubyonrails: {
    label: 'RubyOnRails',
    bg: '#c99ba9',
    icon: "RubyOnRails"
  },
  svelte: {
    label: 'Svelte',
    bg: '#cccccc',
    icon: "Svelte"
  },
  godot: {
    label: 'Godot',
    bg: '#8fa5b9',
    icon: "Godot"
  },
  flutter: {
    label: 'Flutter',
    bg: '#669fd4',
    icon: "Flutter"
  },
  dotnet: {
    label: '.Net',
    bg: '#502bd4',
    icon: "Dotnet"
  }
};

/**
 * Helper function to safely resolve tag details with fallback support
 */
export function getTagInfo(tagKey: string): TagConfig {
  const normalizedKey = tagKey.toLowerCase().trim();
  return TAG_CONFIG[normalizedKey] ?? {
    ...DEFAULT_TAG,
    label: tagKey // Keeps the raw string name if unmapped
  };
}