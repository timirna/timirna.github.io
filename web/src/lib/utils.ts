export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const isVideo = (src?: string) => !!src && /\.(mp4|webm|mov)(\?|$)/i.test(src);
