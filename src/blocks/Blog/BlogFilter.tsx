"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../../components/ToggleGroup";
import { useTranslate } from "../../host";
import { BlogPosts } from "./BlogPosts";
import {
  blogFilterChipClasses,
  blogFilterClasses,
  blogFilteredClasses,
} from "./Blog.classes";
import type { BlogColumns, BlogLayout, BlogPost } from "./Blog.types";

const EVERY = "*";

export const BlogFilter = ({
  posts,
  layout,
  columns,
}: {
  posts: BlogPost[];
  layout: BlogLayout;
  columns: BlogColumns;
}) => {
  const t = useTranslate();
  const [picked, setPicked] = useState(EVERY);
  const categories = [
    ...new Set(posts.flatMap((post) => (post.category ? [post.category] : []))),
  ];
  const shown =
    picked === EVERY ? posts : posts.filter((post) => post.category === picked);
  return (
    <div data-part="blog-filtered" className={blogFilteredClasses}>
      <ToggleGroup
        aria-label={t("Filter")}
        className={blogFilterClasses}
        onValueChange={(next) => {
          if (next) setPicked(next);
        }}
        size="sm"
        type="single"
        value={picked}
      >
        {[EVERY, ...categories].map((category) => (
          <ToggleGroupItem
            key={category}
            className={blogFilterChipClasses}
            value={category}
          >
            {category === EVERY ? t("All") : category}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <BlogPosts columns={columns} layout={layout} posts={shown} />
    </div>
  );
};
