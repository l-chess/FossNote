import { Extension } from "@tiptap/core";

export const TaskListInputRule = Extension.create({
  name: "taskListInputRule",

  addKeyboardShortcuts() {
    return {
      Space: () => {
        const { state } = this.editor;
        const { $from } = state.selection;

        const grandparent = $from.node($from.depth - 1);
        if (grandparent?.type.name !== "listItem") return false;

        const text = $from.parent.textContent;
        console.log("in list item, text:", JSON.stringify(text));

        const isUnchecked = text === "[ ]";
        const isChecked = text === "[x]" || text === "[X]";

        if (!isUnchecked && !isChecked) return false;

        console.log("converting to task item");

        const listDepth = $from.depth - 2;
        const listPos = $from.before(listDepth);
        const listNode = state.doc.nodeAt(listPos);

        if (!listNode) return false;

        const taskList = state.schema.nodes.taskList;
        const taskItem = state.schema.nodes.taskItem;

        if (!taskList || !taskItem) return false;

        const node = taskList.create(null, [
          taskItem.create({ checked: !!isChecked }, state.schema.nodes.paragraph.create()),
        ]);

        const tr = state.tr.replaceWith(listPos, listPos + listNode.nodeSize, node);

        this.editor.view.dispatch(tr);
        this.editor.commands.setTextSelection(listPos + 2);

        return true;
      },
    };
  },
});
