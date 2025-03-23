"use client";
import BlogSidebar from "@/components/shared/sidebars/BlogSidebar";
import getAllBlogs from "@/libs/getAllBlogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import makePath from "@/libs/makePath";
import BlogCard4 from "@/components/shared/cards/BlogCard4";
import CommonContext from "@/providers/CommonContext";
import useSearch from "@/hooks/useSearch";
import modifyNumber from "@/libs/modifyNumber";
import countCommentLength from "@/libs/countCommentLength";
import sliceText from "@/libs/sliceText";

const BlogDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const blogs = getAllBlogs();
  // get searched blogs
  const {
    searchedItems,
    isShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  } = useSearch(blogs, `/blogs`);

  const blog = blogs?.find(({ id }) => id === parseInt(currentId));
  const {
    title,
    image,
    id,
    publishDate,
    desc,
    author,
    category,
    comments,
    tags,
  } = blog ? blog : {};
  const pervBlog = blogs.find(({ id }) => id === parseInt(currentId) - 1);
  const nextBlog = blogs.find(({ id }) => id === parseInt(currentId) + 1);
  const { title: prevTitle, id: prevId } = pervBlog ? pervBlog : {};
  const { title: nextTitle, id: nextId } = nextBlog ? nextBlog : {};
  const relatedBlogs = blogs
    ?.filter(({ athor: author2 }) => author2?.name === author?.name)
    ?.slice(0, 2);
  const totalBlogs = blogs?.length;
  const commentsLength = countCommentLength(comments);
  const totalComments = modifyNumber(commentsLength);
  return (
    <div className="ltn__page-details-area ltn__blog-details-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__blog-details-wrap">
              <div className="ltn__page-details-inner ltn__blog-details-inner">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-category">
                      <Link href={`/edits?category=${makePath(category)}`}>
                        {category}
                      </Link>
                    </li>
                  </ul>
                </div>
                <h2 className="ltn__blog-title">{title}</h2>
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-author">
                      <Link href={`/edits?author=${makePath(author?.name)}`}>
                        <Image
                          src={author?.image}
                          alt="#"
                          width={2000}
                          height={1000}
                        />
                        By: {author?.name}
                      </Link>
                    </li>
                    <li className="ltn__blog-date">
                      <i className="far fa-calendar-alt"></i>
                      {publishDate}
                    </li>
                    <li>
                      <Link href="#comments">
                        <i className="far fa-comments"></i>
                        {totalComments} Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt.
                </p>
                <Image src={image} alt="Image" width={800} height={478} />
                <h2>A cleansing hot shower or bath</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia.{" "}
                </p>
                <hr />
                <h2>Setting the mood with incense</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia.{" "}
                </p>
                <hr />
                <h2>Setting the mood with incense</h2>
                <div className="list-item-with-icon-2">
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                  </ul>
                </div>
                <blockquote>
                  <h6 className="ltn__secondary-color mt-0">BY HETMAYAR</h6>
                  Viral dreamcatcher keytar typewriter, aest hetic offal umami.
                  Aesthetic polaroid pug pitchfork post-ironic.
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium.{" "}
                </p>

                <Image
                  className="alignleft"
                  src="/img/blog/blog-details/1.jpg"
                  alt="Image"
                  width={255}
                  height={278}
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem.{" "}
                </p>

                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur expedita velit laboriosam est sint laborum eos
                  assumenda, quam voluptatem adipisci, reprehenderit ut nobis
                  blanditiis perspiciatis!
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <Image
                      src="/img/service/31.jpg"
                      alt="Image"
                      width={600}
                      height={600}
                    />
                    <label>Image Caption Here</label>
                  </div>
                  <div className="col-lg-6">
                    <Image
                      src="/img/service/32.jpg"
                      alt="Image"
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Culpa, amet, fuga omnis eligendi sed cupiditate molestias enim
                  autem animi est tempore ipsa corporis. Recusandae, quia.
                </p>
              </div>
              <hr />
              {/* <!-- prev-next-btn --> */}
              <div className="ltn__prev-next-btn row mb-50">
                <div
                  className="blog-prev col-lg-6"
                  style={{ visibility: !prevId ? "hidden" : "visible" }}
                >
                  <h6>Prev Post</h6>
                  <h3 className="ltn__blog-title">
                    <Link href={`/edits/${prevId ? prevId : 1}`}>
                      {prevTitle
                        ? sliceText(prevTitle, 12, true)
                        : "Tips On Minimalist"}
                    </Link>
                  </h3>
                </div>
                <div
                  className="blog-prev blog-next text-right text-end col-lg-6"
                  style={{
                    visibility: !nextId ? "hidden" : "visible",
                  }}
                >
                  <h6>Next Post</h6>
                  <h3 className="ltn__blog-title">
                    <Link href={`/edits/${nextId ? nextId : totalBlogs}`}>
                      {nextTitle
                        ? sliceText(nextTitle, 12, true)
                        : "Less Is More"}
                    </Link>
                  </h3>
                </div>
              </div>
              <hr />
              {/* <!-- related-post --> */}
              {relatedBlogs?.length ? (
                <div className="related-post-area mb-50">
                  <h4 className="title-2">Related Post</h4>
                  <div className="row">
                    {relatedBlogs?.map((blog) => (
                      <div key={idx} className="col-md-6">
                        <BlogCard4 blog={blog} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <CommonContext
              value={{
                author,
                searchedItems,
                handleSearch,
                handleSearchString,
                startSearch,
                closeSearch,
                isShowSearch,
                isShowQuickSearchResult,
                setIsShowQuickSearchResult,
              }}
            >
              <BlogSidebar />
            </CommonContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPrimary;
