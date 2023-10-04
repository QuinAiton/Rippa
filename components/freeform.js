import BlockContent from '@components/block-content'
import React from 'react'
import cx from 'classnames'

const Freeform = ({ data }) => {
  const { maxWidth, textAlign, content, verticalPadding } = data

  console.log(<BlockContent className={cx(verticalPadding, maxWidth, textAlign)} blocks={content} />)

  return <BlockContent className={cx(verticalPadding, maxWidth, textAlign)} blocks={content} />
}

export default Freeform
