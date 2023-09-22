import BlockContent from '@sanity/block-content-to-react'
import React from 'react'
import { blockSerializers } from '@components/block-serializers'
import cx from 'classnames'

const Content = ({ blocks, className }) => {
  if (!blocks) return null

  return (
    <BlockContent
      renderContainerOnSingleChild
      className={cx('rc ', className)}
      blocks={blocks}
      serializers={blockSerializers}
    />
  )
}

export default Content
