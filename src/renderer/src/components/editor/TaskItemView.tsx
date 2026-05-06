import type { NodeViewProps } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Checkbox } from "../ui/Checkbox";

export const TaskItemView = ({ node, updateAttributes }: NodeViewProps) => {
  const checked = node.attrs.checked as boolean;

  return (
    <NodeViewWrapper as="li">
      <Checkbox checked={checked} onChange={(val) => updateAttributes({ checked: val })} />
      <NodeViewContent
        as="div"
        className={`flex-1 ${checked ? "line-through text-secondary" : "text-primary dark:text-primary-dark"}`}
      />
    </NodeViewWrapper>
  );
};
