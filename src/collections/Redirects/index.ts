import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
  },
  access: {
    create: authenticated,
    read: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'to',
      type: 'relationship',
      relationTo: ['stays', 'pages'],
      required: true,
      admin: {
        description: 'Select a stay or page to redirect to',
      },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      options: [
        {
          label: 'Permanent (301)',
          value: '301',
        },
        {
          label: 'Temporary (302)',
          value: '302',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        console.log('Redirect data:', data)
        return data
      }
    ]
  }
} 