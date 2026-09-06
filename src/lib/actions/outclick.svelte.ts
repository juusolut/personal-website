export function outclick(node: HTMLElement, onOutClick: () => void) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      onOutClick();
    }
  };

  document.addEventListener("mousedown", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("mousedown", handleClick, true);
    },
  };
}
