import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface Tag {
  id: string;
  code: string;
  name?: string;
}

interface SortableTagListProps {
  tags: Tag[];
  handleSorting: (sortedTags: Tag[]) => void;
}

const indexName = (index: number): string | null => {
  if (index === 0) {
    return 'oik. yläkulma';
  }
  if (index > 0 && index <= 4) {
    return `Laatikko ${index}`;
  }
  return null;
};

const SortableTagList: React.FC<SortableTagListProps> = ({ tags: initialTags, handleSorting }) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  useEffect(() => {
    if (tags.length) {
      handleSorting(tags);
    }
  }, [tags]);

  return (
    <ReactSortable
      list={tags}
      setList={setTags}
      tag="ul"
      className="tagorder"
    >
      {tags.map((tag, index) => (
        <li key={tag.id}>
          <span>{tag.name || tag.code}</span>
          <span>{indexName(index)}</span>
        </li>
      ))}
    </ReactSortable>
  );
};

export default SortableTagList;
