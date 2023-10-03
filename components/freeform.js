import BlockContent from '@components/block-content'
import React from 'react'
import cx from 'classnames'

const Freeform = ({ data }) => {
  const { maxWidth, textAlign, content } = data

  return <BlockContent className={cx('py-120 ', maxWidth, textAlign)} blocks={content} />
}

export default Freeform
