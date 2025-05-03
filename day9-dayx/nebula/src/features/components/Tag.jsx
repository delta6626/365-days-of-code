import { Plus, TagIcon } from "lucide-react";

function Tag({ tagText, moreTag, showTagIcon }) {
  return (
    <div className="rounded-lg flex text-gray-400 items-center gap-2 bg-base-100 px-4 py-2 max-w-[200px]">
      {!moreTag && showTagIcon ? (
        <TagIcon className="shrink-0" />
      ) : moreTag ? (
        <Plus></Plus>
      ) : (
        ""
      )}
      <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
        {tagText}
      </span>
    </div>
  );
}

export default Tag;
