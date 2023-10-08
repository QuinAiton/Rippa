import { getAllDocSlugs, getPage } from '@data'

import BlogPost from '../components/modules/blog-post.js';
import Freeform from '../components/freeform.js'
import Header from '../components/header.js'
import Hero from '../components/modules/hero.js'
import Image from 'next/image'
import Layout from '../components/layout.js';
import { sanityClient } from '../lib/sanity';

export default function BlogPage({ blogPageData }) {
  // Render the BlogPage component using the retrieved data



  const modules = blogPageData?.modules[0]
  const blogPosts = blogPageData?.blogPosts
  const blogPostsComponent = blogPosts.map((blogPost, index) => {

    return <div class={`w-3/4 h-auto flex justify-center items-center gap-40 p-20 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`} >
      <Image className='w-1/2' src={blogPost.imageUrl} height='600' width='600' />
      <div className='w-1/3'>
        <h4>{blogPost.title}</h4>
        <Freeform data={blogPost} />
      </div>
    </div >
  })


  return (
    <div div className='bg-white h-full w-full ' >
      <div className='flex flex-col '>
        <section className=''>
          <Hero data={modules} />
        </section>
        <section className=' pt-[10vh] h-3/4 grid grid-cols-1 grid-flow-row place-items-center gap-[10vh]'> {blogPostsComponent}</section>
      </div>
    </div>
  );
}
export async function getStaticProps({ params, preview, previewData }) {
  // Fetch the 'BlogPage' data from Sanity
  const blogPageData = await sanityClient.fetch(`*[_type == 'BlogPage'][0] {
  ...,
  blogPosts[]->{
    ...
,  
      "imageUrl": featuredImage.asset->url
  }
}

`);
  return {
    props: {
      blogPageData,

    },
  };
}


