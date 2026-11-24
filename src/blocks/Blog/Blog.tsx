import { BlockActions, Section } from "../../components/Section";
import { BlogFilter } from "./BlogFilter";
import { BlogGrid, BlogPosts } from "./BlogPosts";
import { blogBodyClasses } from "./Blog.classes";
import type { BlogProps } from "./Blog.types";

export const Blog = ({
  posts,
  layout = "cards",
  filter = false,
  columns = 3,
  actions,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  muted = false,
  className,
}: BlogProps) => {
  if (!posts?.length) return null;
  return (
    <Section
      id={id}
      data-part="blog"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      {layout === "cards" && !filter ? (
        <BlogGrid
          posts={posts}
          columns={columns}
          actions={actions}
          align={align}
        />
      ) : (
        <div data-part="blog-body" className={blogBodyClasses}>
          {filter ? (
            <BlogFilter columns={columns} layout={layout} posts={posts} />
          ) : (
            <BlogPosts columns={columns} layout={layout} posts={posts} />
          )}
          <BlockActions actions={actions} align={align} />
        </div>
      )}
    </Section>
  );
};
