import { ArrowsClockwise, CloudArrowDown, Copy } from 'phosphor-react'

import React from 'react'

export default {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  // __experimental_actions: ['update', 'publish', 'delete'],
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' },
    { title: 'Info', name: 'info', icon: CloudArrowDown }
  ],
  fieldsets: [
    {
      title: '',
      name: '2up',
      options: { columns: 2 }
    }
  ],
  icon: () => <Copy />,
  fields: [
    {
      title: 'Display Title',
      name: 'title',
      type: 'string',
      description:
        'Shown where variant names appear (for example: Above the product title in the cart)',
      group: 'content'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    },
    {
      name: 'productTitle',
      title: 'Product Title',
      type: 'string',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'variantTitle',
      title: 'Variant Title',
      type: 'string',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'productID',
      title: 'Product ID',
      type: 'number',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'variantID',
      title: 'Variant ID',
      type: 'number',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'price',
      title: 'Price (cents)',
      type: 'number',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'comparePrice',
      title: 'Compare Price (cents)',
      type: 'number',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'lowStock',
      title: 'Low Stock?',
      type: 'boolean',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      readOnly: false,
      fieldset: '2up',
      group: 'info'
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      of: [{ type: 'productOptionValue' }],
      readOnly: false,
      group: 'info'
    },
    {
      title: 'Draft Mode',
      name: 'isDraft',
      type: 'boolean',
      readOnly: false,
      hidden: true,
      fieldset: '2up',
      group: 'info'
    },
    {
      name: 'wasDeleted',
      title: 'Deleted from info?',
      type: 'boolean',
      readOnly: false,
      hidden: true,
      fieldset: '2up',
      group: 'info'
    }
  ],
  preview: {
    select: {
      store: 'store',
      isDraft: 'isDraft',
      wasDeleted: 'wasDeleted',
      title: 'title',
      variantTitle: 'variantTitle',
      productTitle: 'productTitle'
    },
    prepare({
      store,
      isDraft = false,
      wasDeleted = false,
      title,
      variantTitle,
      productTitle = '(missing product)'
    }) {
      const getSubtitle = () => {
        if (title) {
          return title === variantTitle ? null : `(${variantTitle})`
        } else {
          return productTitle
        }
      }

      return {
        title:
          (title ? title : variantTitle ?? store.title) +
          (wasDeleted ? ' (removed)' : '') +
          (isDraft ? ' (draft)' : ''),
        subtitle: getSubtitle()
      }
    }
  }
}
