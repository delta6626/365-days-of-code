import { Plus, TagIcon, Trash2 } from "lucide-react";

function Tag({
  id,
  tagText,
  moreTag,
  showTagIcon,
  showDeleteIcon,
  darkBackground,
  tags,
  setTags,
}) {
  function handleTagDelete() {
    let newTags = [...tags];
    newTags.splice(id, 1);
    setTags(newTags);
  }

  return (
    <div
      className={
        (darkBackground ? "bg-base-300 " : "bg-base-100 ") +
        "rounded-lg flex text-gray-400 items-center gap-2 px-4 py-2 max-w-[200px]"
      }
    >
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
      {showDeleteIcon ? (
        <Trash2
          className="text-error cursor-pointer"
          onClick={handleTagDelete}
        ></Trash2>
      ) : (
        ""
      )}
    </div>
  );
}

export default Tag;
