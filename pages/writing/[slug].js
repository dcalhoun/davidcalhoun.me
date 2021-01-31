import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { make as Layout } from "../../components/Layout.bs";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
import { make as SEO } from "../../components/SEO.bs";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <article className="mb-32">
          <SEO title={post.title} image={post.ogImage && post.ogImage.url} />
          <h1>{post.title}</h1>
          <h2>{post.published}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "published",
    "slug",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
