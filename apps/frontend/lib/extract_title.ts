export function extractTitle(markdown: string): string {
  const splittedText = markdown.split("\n");

  if (splittedText[0].startsWith("#")) {
    return splittedText[0].replace("#", "").trim();
  }

  return splittedText[0].trim();
}
