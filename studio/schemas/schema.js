import accordion from './objects/accordion'
import accordions from './objects/accordions'
import blogPage from './documents/blog-page'
import blogPost from './documents/blog-post'
import collection from './documents/shop-collection'
import collectionGrid from './modules/collection-grid'
import complexPortableText from './objects/portable-complex'
import cookieSettings from './documents/settings-cookie'
import createSchema from 'part:@sanity/base/schema-creator'
import dividerPhoto from './modules/divider-photo'
import filter from './documents/filter'
import footerSettings from './documents/settings-footer'
import freeform from './objects/freeform'
import generalSettings from './documents/settings-general'
// Module types
import grid from './modules/grid'
// Object types
import gridColumn from './objects/grid-column'
import gridSize from './objects/grid-size'
import headerSettings from './documents/settings-header'
import hero from './modules/hero'
import horizontalRule from './objects/horizontal-rule'
import marquee from './modules/marquee'
import menu from './documents/menu'
import navDropdown from './objects/nav-dropdown'
import navLink from './objects/nav-link'
import navPage from './objects/nav-page'
import newsletter from './modules/newsletter'
// Document types
import page from './documents/page'
import participant from './objects/participant'
import product from './documents/shop-product'
import productCard from './objects/product-card'
import productCartPhotos from './objects/product-cart-photos'
import productGalleryPhotos from './objects/product-gallery-photos'
import productHero from './modules/product-hero'
import productListingPhotos from './objects/product-listing-photos'
import productOption from './objects/product-option'
import productOptionSettings from './objects/product-option-settings'
import productOptionValue from './objects/product-option-value'
import productVariant from './documents/shop-variant'
import promoSettings from './documents/settings-promo'
import redirect from './documents/redirect'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import section from './documents/section'
import seo from './objects/seo'
import seoSettings from './documents/settings-seo'
import shopFilter from './objects/shop-filter'
import shopSettings from './documents/settings-shop'
import shopSort from './objects/shop-sort'
import simplePortableText from './objects/portable-simple'
import socialLink from './objects/social-link'
import solidColor from './documents/color'

/*  ------------------------------------------ */
/*  Your Schema documents / modules / objects
/*  ------------------------------------------ */
export default createSchema({
  // The name of our schema
  name: 'content',

  types: schemaTypes.concat([

    /* ----------------- */
    /* 1: Document types */
    {
      ...page,
      // Define update permissions for the 'page' document type
      // You can customize this permission as needed
      // This example allows anyone with write access to update 'page' documents
      // You can specify more granular conditions if needed
      // See the Sanity.io documentation for more options: https://www.sanity.io/docs/permissions
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...section,
      // Define update permissions for the 'section' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...product,
      // Define update permissions for the 'product' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...productVariant,
      // Define update permissions for the 'productVariant' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...collection,
      // Define update permissions for the 'collection' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...filter,
      // Define update permissions for the 'filter' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...solidColor,
      // Define update permissions for the 'solidColor' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...generalSettings,
      // Define update permissions for the 'generalSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...cookieSettings,
      // Define update permissions for the 'cookieSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...promoSettings,
      // Define update permissions for the 'promoSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...headerSettings,
      // Define update permissions for the 'headerSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...footerSettings,
      // Define update permissions for the 'footerSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...shopSettings,
      // Define update permissions for the 'shopSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...seoSettings,
      // Define update permissions for the 'seoSettings' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...menu,
      // Define update permissions for the 'menu' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...redirect,
      // Define update permissions for the 'redirect' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    {
      ...blogPage,
      // Define update permissions for the 'blog' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },

    /* --------------- */
    /* 2: Module types */
    grid,
    hero,
    marquee,
    dividerPhoto,
    newsletter,
    productHero,
    collectionGrid,

    /* ----------------------- */
    /* 3: Generic Object types */
    gridColumn,
    gridSize,
    seo,
    blogPost,

    shopFilter,
    shopSort,

    productGalleryPhotos,
    productListingPhotos,
    productCartPhotos,
    {
      ...productOption,
      // Define update permissions for the 'blog' document type
      // Customize the permissions as needed
      permissions: [
        {
          // Allow updating for users with write access
          role: 'writer', // Change to the role you want to allow
          // You can specify more granular conditions if needed
          // See the Sanity.io documentation for more options
          // https://www.sanity.io/docs/permissions
          filter: 'true',
          actions: ['create', 'read', 'update', 'delete'],
        },
      ],
    },
    productOptionValue,
    productOptionSettings,

    navDropdown,
    navPage,
    navLink,
    socialLink,
    horizontalRule,

    simplePortableText,
    complexPortableText,

    freeform,
    accordions,
    accordion,
    productCard,

    participant
  ])
})
