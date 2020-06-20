type post = {
  description: string,
  path: string,
  published: string,
  title: string,
};

[@bs.module "../utils/posts"] external posts: array(post) = "default";

[@react.component]
let default = () => {
  <Layout>
    <SEO
      title="Writing"
      description="Thoughts and explorations of David Calhoun."
    />
    <h1 className={Heading.Styles.primary ++ " mb-4"}>
      {React.string("Writing")}
    </h1>
    {posts->Belt.Array.length < 1
       ? <Paragraph className="italic text-center">
           {React.string("No posts to display.")}
         </Paragraph>
       : posts
         ->Belt.Array.map(postData =>
             <article key={postData.title}>
               <h2 className=Heading.Styles.secondary>
                 <Next.Link href={postData.path} passHref=true>
                   <TextButton className="lg:text-4xl">
                     {React.string(postData.title)}
                   </TextButton>
                 </Next.Link>
               </h2>
               <FormattedDate dateString={postData.published} />
             </article>
           )
         ->React.array}
  </Layout>;
};
