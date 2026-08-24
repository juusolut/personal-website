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
    bg: 'lightblue',
    icon: "React"
  },
  rubyonrails: {
    label: 'RubyOnRails',
    bg: '#a77575',
    icon: "RubyOnRails"
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