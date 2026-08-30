import type { svelte } from "@sveltejs/vite-plugin-svelte";
import { type IconName } from "../../types/icon-names";

export interface TagConfig {
  label: string;
  bg: string;
  icon: IconName;
}

export const DEFAULT_TAG: TagConfig = {
  label: 'Code',
  bg: 'rgba(151, 151, 151, 0.46)',
  icon: "Default"
};

export const TAG_CONFIG: Record<string, TagConfig> = {
  react: {
    label: 'React',
    bg: '#9bbec9',
    icon: "React"
  },
  rubyonrails: {
    label: 'Ruby on Rails',
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
    icon: "Default"
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
  },
  mailhog: {
    label: 'Mailhog',
    bg: '#952225',
    icon: "Default"
  },
  docker: {
    label: 'Docker',
    bg: '#2560FF',
    icon: "Docker"
  },
  microsoftsqlserver: {
    label: 'Microsoft SQL Server',
    bg: '#2e59bb',
    icon: "Microsoft"
  }
};


/**
 * Helper function to safely resolve tag details with fallback support
 */
export function getTagInfo(tagKey: string): TagConfig {
  const normalizedKey = tagKey.toLowerCase().trim();
  console.log(normalizedKey)
  return TAG_CONFIG[normalizedKey] ?? {
    ...DEFAULT_TAG,
    label: tagKey // Keeps the raw string name if unmapped
  };
}