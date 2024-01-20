import { getItem, listItems } from '../models/experiences.models.js'
// import { getItem, listItems } from '../models/pets.models.js'

export const getExperience = id => {
  try {
    const resp = getItem(id)
    return resp
  } catch (err) {
    return err
  }
}

export const listExperiences = () => {
  try {
    const resp = listItems()
    return resp
  } catch (err) {
    return err
  }
}

// export const getPet = id => {
//   try {
//     const resp = getItem(id)
//     return resp
//   } catch (err) {
//     return err
//   }
// }

// export const listPets = () => {
//   try {
//     const resp = listItems()
//     return resp
//   } catch (err) {
//     return err
//   }
// }