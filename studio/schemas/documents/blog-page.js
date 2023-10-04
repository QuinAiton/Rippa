// Blog Page Schema
export default {
  name: 'BlogPage',
  title: 'Blog Page',
  type: 'document',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],

  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'grid' },
        { type: 'hero' },
        { type: 'marquee' },
        { type: 'dividerPhoto' },
        {
          title: 'Reusable Section',
          type: 'reference',
          to: [{ type: 'section' }]
        }
      ],
      group: 'content'
    },
    {
      name: 'blogPosts',
      title: 'Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'BlogPost' }] }],
    },
  ],
  options: {
    singleInstance: true,
  },
};