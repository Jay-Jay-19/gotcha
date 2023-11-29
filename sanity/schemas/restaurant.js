import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Nom du restaurant",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image du restaurant",
    },
    {
      name: "lat",
      type: "number",
      title: "latitude du restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "longitude du restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Adresse du restaurant",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Notez le restaurant (1 à 5 étoiles)",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Veuillez rentrer une valeur entre 1 et 5"),
    },
    {
      name: "type",
      title: "Catégorie",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      type: "array",
      title: "Plats",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
})
