import { BiMicrophone } from 'react-icons/bi'

export default {
  name: `talk`,
  title: `Talk`,
  type: `document`,
  icon: BiMicrophone,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule: any) => {
        Rule.required().error(`The talk must have a title.`)
      }
    },
    {
      name: `conference`,
      title: `Conference`,
      type: `string`,
      description: `Example: Reactathon 2023`,
    },
    {
      name: `description`,
      title: `Description`,
      type: `text`,
    },
    {
      name: `date`,
      title: `Date`,
      type: `date`
    },
    {
      name: `link`,
      title: `Link`,
      type: `string`,
    },
    {
      name: `deck`,
      title: `Deck`,
      type: `file`,
    },
    {
      name: `moduleContent`,
      type: `moduleContent`,
    }
  ],
  preview: {
    select: {
      title: 'conference',
      subtitle: 'title',
    }
  }
}