import { getAllDocSlugs, getPage } from '@data'
import { getStaticPage, queries } from '@data'

import BlogPost from '../components/modules/blog-post.js';
import Freeform from '../components/freeform.js'
import Head from 'next/head.js';
import Header from '../components/header.js'
import Hero from '../components/modules/hero.js'
import Image from 'next/image'
import Layout from '../components/layout.js';
import { sanityClient } from '../lib/sanity.js';

export default function BlogPage({ blogPageData, data }) {
  // Render the BlogPage component using the retrieved data

  const { site, page } = data



  const modules = blogPageData?.modules[0]
  const blogPosts = blogPageData?.blogPosts
  const blogPostsComponent = blogPosts.map((blogPost, index) => {

    return <div className={`w-11/12 h-auto flex flex-col justify-center items-center gap-40  ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`} >
      <Image className='md:w-1/2' src={blogPost.imageUrl} height='600' width='600' />
      <div className='md:w-1/3'>
        <h4>{blogPost.title}</h4>
        <Freeform data={blogPost} />
      </div>
    </div >
  })


  return (
    <div div className='h-full w-full  ' >
      <Layout site={site} page={page} isTransparent={true}>
        <div className='flex flex-col '>
          <section className=''>
            <Hero heroSmall={true} data={modules} />
          </section>
          <section className=' h-3/4 grid grid-cols-1 grid-flow-row place-items-center gap-[10vh] py-[10vh]'> {blogPostsComponent}</section>
        </div>
      </Layout>
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

`)
  const pageData = await getStaticPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `,

    {
      active: preview,
      token: previewData?.token,
    }
  )
  return {
    props: {
      blogPageData,
      data: pageData,


    },
  };
}


