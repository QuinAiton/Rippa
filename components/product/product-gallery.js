import { AnimatePresence, m } from 'framer-motion'

import Carousel from '@components/carousel'
import Photo from '@components/photo'
import React from 'react'
import { fadeAnim } from '@lib/animate'
import { hasObject } from '@lib/helpers'

const ProductGallery = ({
  photosets,
  activeVariant,
  hasArrows,
  hasDots,
  hasDrag,
  hasCounter,
}) => {
  console.log(activeVariant.options);
  if (!photosets || !activeVariant) return null
  // console.log({ photosets })
  // 1. extract the active variant's options
  const { options } = activeVariant

  // 2. find the default photoset from the "forOption" field (default is blank)
  const defaultPhotoset = photosets.find((set) => !set.forOption)

  // 3. find the first photoset that matches one of the variants options
  const variantPhotoset = photosets.find((set) => {
    // console.log({ set }, set.forOption)
    const option = set.forOption
      ? {
          name: set.forOption.split(':')[0],
          value: set.forOption.split(':')[1],
        }
      : {}
    console.log(option.value && hasObject(options, option))
    return option.value && hasObject(options, option)
  })

  // 4. finally, pick our set of photos
  const photos = variantPhotoset
    ? variantPhotoset?.photos
    : defaultPhotoset?.photos
  console.log({ variantPhotoset, defaultPhotoset })
  // generate a unique ID for this set of images (for framer animation)
  const id = photos && photos.map((p) => p.id).join('')

  // // select the photoset with the most matched conditions
  // const newPhotoset = photosets.find(set => {
  //   const { condition, for: conditions } = set

  //   if (condition === 'all') {
  //     return conditions.every((option) => options.some(({ name: optionName, value: optionValue }) => option.split(':')[0] === optionName && option.split(':')[1] === optionValue))
  //   }

  //   if (condition === 'any') {
  //     return conditions.some((option) => options.some(({ name: optionName, value: optionValue }) => option.split(':')[0] === optionName && option.split(':')[1] === optionValue))
  //   }

  //   return false
  // }).sort((a, b) => b.for.length - a.for.length)[0]

  return (
    <>
      {photos && (
        <AnimatePresence mode="wait">
          <m.div
            key={id}
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
          >
            <Carousel
              id={id}
              hasArrows={hasArrows}
              hasDots={hasDots}
              hasCounter={hasCounter}
              hasDrag={hasDrag}
            >
              {photos.map((photo, key) => (
                <Photo
                  key={key}
                  photo={photo}
                  className="carousel--photo w-full"
                />
              ))}
            </Carousel>
          </m.div>
        </AnimatePresence>
      )}
    </>
  )
}

export default ProductGallery
