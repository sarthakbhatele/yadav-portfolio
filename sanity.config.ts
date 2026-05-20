// import { defineConfig } from 'sanity'
// import { structureTool } from 'sanity/structure'
// import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
// import { schema } from './sanity/schema'

// export default defineConfig({
//   name: 'default',
//   title: 'Portfolio Studio',
//   projectId: 'lbhxsnfr',       // your project ID
//   dataset: 'production',
//   plugins: [
//     structureTool(),
//     cloudinarySchemaPlugin(),   // enables cloudinary uploads in studio
//   ],
//   schema,
// })

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: 'lbhxsnfr',
  dataset: 'production',
  basePath: '/studio', 
  plugins: [structureTool()],
  schema,
})