import BlockContent from '@components/block-content'
import React from 'react'
import cx from 'classnames'

const Freeform = ({ data }) => {
  const { maxWidth, textAlign, content, verticalPadding } = data


  return <BlockContent className={cx(verticalPadding, maxWidth, textAlign)} blocks={content} />
}

export default Freeform
