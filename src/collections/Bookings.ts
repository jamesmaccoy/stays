import { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    // Only admins can create
    create:() =>true,
    // Only admins or users with site access can read
    read: () =>true,
    // Only admins can update
    update:() =>true,
    // Only admins can delete
    delete:() =>true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ]
}
export default Bookings