import { Plus, TagIcon } from "lucide-react";

function Tag({ tagText, moreTag }) {
  return (
    <div className="rounded-lg flex items-center gap-2 bg-base-100 px-4 py-2 max-w-[200px]">
      {!moreTag ? <TagIcon className="shrink-0" /> : <Plus></Plus>}
      <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
        {tagText}
      </span>
    </div>
  );
}

export default Tag;
