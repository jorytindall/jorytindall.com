import { addExperience, editExperience, deleteExperience } from './mutations/experiences.mutations.js'
import { listExperiences, getExperience } from './queries/experiences.queries.js'
// import { addPet, editPet, deletePet } from './mutations/pets.mutations.js'
// import { listPets, getPet } from './queries/pets.queries.js'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
export const typeDefs = `#graphql
  # OBJECT TYPES
  # This "Pet" type defines the queryable fields for every pet in our data source.
  type Experience {
    id: ID!
    company: String!
    startDate: String!
    endDate: String!
    role: String!
    team: String!
  }

  # type Pet {
  #   id: ID!
  #   name: String!
  #   type: String!
  #   age: Int!
  #   breed: String!
  # }

  # INPUT TYPES
  # Define the input objects for addPet and editPet mutations
  input ExperienceToEdit {
    id: ID!
    company: String!
    startDate: String!
    endDate: String!
    role: String!
    team: String!
  }
  
  # input PetToEdit {
  #   id: ID!
  #   name: String!
  #   type: String!
  #   age: Int!
  #   breed: String!
  # }

  input ExperienceToAdd {
    company: String!
    startDate: String!
    endDate: String!
    role: String!
    team: String!
  }

  # input PetToAdd {
  #   name: String!
  #   type: String!
  #   age: Int!
  #   breed: String!
  # }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "pets" query returns an array of zero or more pets.
  # QUERY TYPES
  type Query {
    experiences: [Experience],
    experience(id: ID!): Experience
  }

  # type Query {
  #   pets: [Pet],
  #   pet(id: ID!): Pet
  # }

  # MUTATION TYPES
  type Mutation {
    addExperience(experienceToAdd: ExperienceToAdd!): Experience,
    editExperience(experienceToEdit: ExperienceToEdit!): Experience,
    deleteExperience(id: ID!): [Experience],
  }

  # type Mutation {
  #   addPet(petToAdd: PetToAdd!): Pet,
  #   editPet(petToEdit: PetToEdit!): Pet,
  #   deletePet(id: ID!): [Pet],
  # }
`

export const resolvers = {
  // Resolvers for Queries
  Query: {
    experiences: () => listExperiences(),
    experience: (_, { id }) => getExperience(id)
    // pets: () => listPets(),
    // pet: (_, { id }) => getPet(id)
  },

  // Resolvers for Mutations
  Mutation: {
    addExperience: (_, { experienceToAdd }) => addExperience(experienceToAdd),
    editExperience: (_, { experienceToEdit }) => editExperience(experienceToEdit),
    deleteExperience: (_, { id }) => deleteExperience(id)
    // addPet: (_, { petToAdd }) => addPet(petToAdd),
    // editPet: (_, { petToEdit }) => editPet(petToEdit),
    // deletePet: (_, { id }) => deletePet(id)
  }
}