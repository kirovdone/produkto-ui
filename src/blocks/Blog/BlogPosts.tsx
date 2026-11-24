import { HostLink } from "../../host";
import {
  BlockActions,
  BlockAvatar,
  sectionEyebrowClasses,
} from "../../components/Section";
import {
  blogAuthorClasses,
  blogBodyClasses,
  blogBylineClasses,
  blogBylineTextClasses,
  blogCategoryLinkClasses,
  blogClasses,
  blogDateClasses,
  blogExcerptClasses,
  blogFeaturedClasses,
  blogIndexClasses,
  blogIndexDateClasses,
  blogIndexRowClasses,
  blogLinkClasses,
  blogMediaClasses,
  blogPostClasses,
  blogPostContentClasses,
  blogRowClasses,
  blogRowLinkClasses,
  blogRowMediaClasses,
  blogRowTextClasses,
  blogRowTitleClasses,
  blogRowsClasses,
  blogSideClasses,
  blogSideRowClasses,
  blogSideTitleClasses,
  blogThumbClasses,
  blogTitleClasses,
  blogWideClasses,
  blogWideMediaClasses,
  blogWidePostClasses,
  blogWideTextClasses,
  blogWideTitleClasses,
} from "./Blog.classes";
import type {
  BlogAuthor,
  BlogColumns,
  BlogGridProps,
  BlogHeadingLevel,
  BlogLayout,
  BlogPost,
} from "./Blog.types";

const Category = ({ post }: { post: BlogPost }) =>
  post.category ? (
    post.categoryLink ? (
      <HostLink
        data-part="blog-category"
        className={`${sectionEyebrowClasses} ${blogCategoryLinkClasses}`}
        href={post.categoryLink}
      >
        {post.category}
      </HostLink>
    ) : (
      <span data-part="blog-category" className={sectionEyebrowClasses}>
        {post.category}
      </span>
    )
  ) : null;

export const BlogByline = ({
  author,
  date,
}: {
  author?: BlogAuthor;
  date?: string;
}) =>
  author || date ? (
    <div data-part="blog-byline" className={blogBylineClasses}>
      {author && (
        <BlockAvatar name={author.name} size="sm" src={author.avatar} />
      )}
      <div data-part="blog-byline-text" className={blogBylineTextClasses}>
        {author && (
          <span data-part="blog-author" className={blogAuthorClasses}>
            {author.name}
          </span>
        )}
        {date && (
          <span data-part="blog-date" className={blogDateClasses}>
            {date}
          </span>
        )}
      </div>
    </div>
  ) : null;

const PostCard = ({
  post,
  headingLevel,
}: {
  post: BlogPost;
  headingLevel: BlogHeadingLevel;
}) => {
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <li data-part="blog-post" className={blogPostClasses}>
      {post.media && (
        <div data-part="blog-media" className={blogMediaClasses}>
          {post.media}
        </div>
      )}
      <div data-part="blog-post-content" className={blogPostContentClasses}>
        <Category post={post} />
        <Title data-part="blog-title" className={blogTitleClasses}>
          <HostLink className={blogLinkClasses} href={post.link}>
            {post.title}
          </HostLink>
        </Title>
        {post.excerpt && (
          <p data-part="blog-excerpt" className={blogExcerptClasses}>
            {post.excerpt}
          </p>
        )}
        <BlogByline author={post.author} date={post.date} />
      </div>
    </li>
  );
};

const PostCards = ({
  posts,
  columns,
  headingLevel,
}: {
  posts: BlogPost[];
  columns: BlogColumns;
  headingLevel: BlogHeadingLevel;
}) => (
  <ul role="list" data-part="blog-posts" className={blogClasses({ columns })}>
    {posts.map((post, i) => (
      <PostCard
        key={`${post.link}-${i}`}
        headingLevel={headingLevel}
        post={post}
      />
    ))}
  </ul>
);

export const BlogGrid = ({
  posts,
  columns = 3,
  actions,
  align = "start",
  headingLevel = 3,
}: BlogGridProps) => {
  if (!posts.length) return null;
  return (
    <div data-part="blog-body" className={blogBodyClasses}>
      <PostCards columns={columns} headingLevel={headingLevel} posts={posts} />
      <BlockActions actions={actions} align={align} />
    </div>
  );
};

const RowTitle = ({ post }: { post: BlogPost }) => (
  <h3 data-part="blog-title" className={blogRowTitleClasses}>
    <HostLink className={blogRowLinkClasses} href={post.link}>
      {post.title}
    </HostLink>
  </h3>
);

const Index = ({ posts }: { posts: BlogPost[] }) => (
  <ul role="list" data-part="blog-posts" className={blogIndexClasses}>
    {posts.map((post, i) => (
      <li
        key={`${post.link}-${i}`}
        data-part="blog-post"
        className={blogIndexRowClasses}
      >
        <span data-part="blog-date" className={blogIndexDateClasses}>
          {post.date}
        </span>
        <div className={blogRowTextClasses}>
          <Category post={post} />
          <RowTitle post={post} />
          {post.excerpt && (
            <p data-part="blog-excerpt" className={blogExcerptClasses}>
              {post.excerpt}
            </p>
          )}
        </div>
      </li>
    ))}
  </ul>
);

const Rows = ({ posts }: { posts: BlogPost[] }) => (
  <ul role="list" data-part="blog-posts" className={blogRowsClasses}>
    {posts.map((post, i) => (
      <li
        key={`${post.link}-${i}`}
        data-part="blog-post"
        className={blogRowClasses}
      >
        {post.media && (
          <div data-part="blog-media" className={blogRowMediaClasses}>
            {post.media}
          </div>
        )}
        <div className={blogRowTextClasses}>
          <Category post={post} />
          <RowTitle post={post} />
          {post.excerpt && (
            <p data-part="blog-excerpt" className={blogExcerptClasses}>
              {post.excerpt}
            </p>
          )}
          <BlogByline author={post.author} date={post.date} />
        </div>
      </li>
    ))}
  </ul>
);

const Featured = ({ posts }: { posts: BlogPost[] }) => {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <div data-part="blog-featured" className={blogFeaturedClasses}>
      <ul role="list" data-part="blog-posts">
        <PostCard headingLevel={3} post={lead} />
      </ul>
      {rest.length ? (
        <ul role="list" data-part="blog-side" className={blogSideClasses}>
          {rest.map((post, i) => (
            <li
              key={`${post.link}-${i}`}
              data-part="blog-post"
              className={blogSideRowClasses}
            >
              {post.media && (
                <div data-part="blog-media" className={blogThumbClasses}>
                  {post.media}
                </div>
              )}
              <div className={blogRowTextClasses}>
                <Category post={post} />
                <h3 data-part="blog-title" className={blogSideTitleClasses}>
                  <HostLink className={blogLinkClasses} href={post.link}>
                    {post.title}
                  </HostLink>
                </h3>
                {post.date && (
                  <span data-part="blog-date" className={blogDateClasses}>
                    {post.date}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const Wide = ({ posts }: { posts: BlogPost[] }) => (
  <ul role="list" data-part="blog-posts" className={blogWideClasses}>
    {posts.map((post, i) => (
      <li
        key={`${post.link}-${i}`}
        data-part="blog-post"
        className={blogWidePostClasses}
      >
        {post.media && (
          <div data-part="blog-media" className={blogWideMediaClasses}>
            {post.media}
          </div>
        )}
        <div className={blogWideTextClasses}>
          <Category post={post} />
          <h3 data-part="blog-title" className={blogWideTitleClasses}>
            <HostLink className={blogLinkClasses} href={post.link}>
              {post.title}
            </HostLink>
          </h3>
          {post.excerpt && (
            <p data-part="blog-excerpt" className={blogExcerptClasses}>
              {post.excerpt}
            </p>
          )}
          <BlogByline author={post.author} date={post.date} />
        </div>
      </li>
    ))}
  </ul>
);

export const BlogPosts = ({
  posts,
  layout,
  columns,
}: {
  posts: BlogPost[];
  layout: BlogLayout;
  columns: BlogColumns;
}) =>
  layout === "index" ? (
    <Index posts={posts} />
  ) : layout === "rows" ? (
    <Rows posts={posts} />
  ) : layout === "featured" ? (
    <Featured posts={posts} />
  ) : layout === "wide" ? (
    <Wide posts={posts} />
  ) : (
    <PostCards columns={columns} headingLevel={3} posts={posts} />
  );
