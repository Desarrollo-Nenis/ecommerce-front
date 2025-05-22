export function extractTextFromBlocks(blocks: any[]): string {
  return blocks
    .map(block => {
      if (Array.isArray(block.children)) {
        return block.children.map((child: { text: any; }) => child.text).join("");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
