// import { defineType, defineField } from 'sanity'

// const videoItem = defineType({
//   name: 'videoItem',
//   title: 'Video',
//   type: 'document',
//   fields: [
//     defineField({ name: 'title', type: 'string', title: 'Title' }),
//     defineField({ name: 'description', type: 'text', title: 'Description' }),
//     defineField({
//       name: 'video',
//       title: 'Video',
//       type: 'cloudinary.asset',   // cloudinary upload field
//     }),
//     defineField({
//       name: 'thumbnail',
//       title: 'Thumbnail',
//       type: 'cloudinary.asset',   // thumbnail from cloudinary too
//     }),
//     defineField({ name: 'order', type: 'number', title: 'Display Order' }),
//   ],
// })

// const imageItem = defineType({
//   name: 'imageItem',
//   title: 'Image',
//   type: 'document',
//   fields: [
//     defineField({ name: 'title', type: 'string', title: 'Title' }),
//     defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
//     defineField({ name: 'order', type: 'number', title: 'Display Order' }),
//   ],
// })

// export const schema = { types: [videoItem, imageItem] }

import { defineType, defineField } from 'sanity'
import { CloudinaryUpload } from '../components/CloudinaryUpload'

const videoItem = defineType({
  name: 'videoItem',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      components: { input: CloudinaryUpload },
      fields: [
        { name: 'public_id', type: 'string', title: 'Public ID' },
        { name: 'secure_url', type: 'string', title: 'URL' },
        { name: 'resource_type', type: 'string', title: 'Resource Type' },
        { name: 'format', type: 'string', title: 'Format' },
        { name: 'width', type: 'number', title: 'Width' },
        { name: 'height', type: 'number', title: 'Height' },
        { name: 'duration', type: 'number', title: 'Duration' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this video on the portfolio',
      initialValue: false,
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
})

const imageItem = defineType({
  name: 'imageItem',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'object',
      components: { input: CloudinaryUpload },
      fields: [
        { name: 'public_id', type: 'string', title: 'Public ID' },
        { name: 'secure_url', type: 'string', title: 'URL' },
        { name: 'resource_type', type: 'string', title: 'Resource Type' },
        { name: 'format', type: 'string', title: 'Format' },
        { name: 'width', type: 'number', title: 'Width' },
        { name: 'height', type: 'number', title: 'Height' },
        { name: 'duration', type: 'number', title: 'Duration' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this image on the portfolio',
      initialValue: false,
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
})

export const schema = { types: [videoItem, imageItem] }