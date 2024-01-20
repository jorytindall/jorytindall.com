import request from 'supertest'

const graphQLEndpoint = 'http://localhost:4000/'

describe('Get all experiences', () => {
  const postData = {
    query: `query Experiences {
            experiences {
                id
                company
                startDate
                endDate
                role
                team
                responsibilities
                description
            }
        }`
  }

  test('returns all experiences', async () => {
    request(graphQLEndpoint)
      .post('?')
      .send(postData)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error)

        const res = JSON.parse(response.text)

        expect(res.data.experiences).toEqual([
          {
            id: 1,
            company: 'New Engen',
            startDate: 'November 2017',
            endDate: 'July 2020',
            role: 'Senior Web Designer',
            team: 'Creative Team',
            responsibilities: [
              "Designed and developed end-to-end web solutions to drive sales and evaluate market viability for enterprise clients including Nestlé, Rothy's, and Proctor & Gamble.",
              "Crafted design and brand systems for use across digital platforms including marketing websites, e-commerce, and mobile applications, resulting in successful product launches and continue 3x growth in conversions.", ,
              "Manage projects and teams in a fast-paced environment to deliver high-performing marketing and sales collateral for both clients and internal initiatives."
            ]
          },
          {
            id: 2,
            company: 'Jove',
            startDate: 'July 2020',
            endDate: 'September 2021',
            role: 'Senior User Experience Designer',
            responsibilities: [
              "Collaborated closely with product management, leadership, and engineering in the go-to-market strategy and tactical design execution for a 63% increase in active users for the Jove flagship product; Creative Insights.",
              "Led the strategy, implementation, and launch of a new set of brand guidelines and a modernized design system.",
              "Introduced consistent documentation patterns for the Jove design system and in-platform copy documentation, enabling transparent collaboration across teams to boost user retention by 25%.",
              "Conducted comprehensive user testing and interviews to better understand market needs and user convictions behind marketing strategy and execution, defining the product roadmap.",
              "Drove creative production and iteration for digital marketing programs focused on new customer acquisition through content production.",
            ]
          },
          {
            id: 3,
            company: 'T-Mobile',
            startDate: 'August 2021',
            endDate: 'June 2022',
            role: 'Senior User Experience Designer',
            team: 'Design System & Framework',
            responsibilities: [
              "Stewarding the adoption and implementation of design system principles and best practices to empower designers, developers, and product owners to meet enterprise business goals and evolve the user experience for more than one hundred million cross-platform users.",
              "Spearheaded a team of experience designers, cross-platform developers, and brand strategists to redefine the T-Mobile design system through foundational exploration, component styling, pattern definition, and design system tooling.",
              "Shepherded a tool migration from Adobe XD to Figma through the publication of six libraries for consumption by experience designers, contracting agencies, and third-party partners expanding collaboration, increasing consistency, and accelerating time-to-market.",
              "Managed intake requests for system updates, additions, and broader strategic moves to meet the needs of six integrated design teams operating in a complex agile environment."
            ]
          },
          {
            id: 4,
            company: 'HashiCorp',
            startDate: 'June 2022',
            endDate: 'Present',
            role: 'Senior Product Designer I',
            team: 'Design System Team',
            responsibilities: [
              "Plan, execute and document the design of new components, patterns, and elements in Helios; the HashiCorp Enterprise design system.",
              "Partner with engineers to develop user-friendly and comprehensive component APIs for consistency in design tooling and published Ember and React components.",
              "Play an advisory and consultative role assisting product designers and engineers in the transition, implementation, and migration to Helios from a legacy design system and isolated local components.",
            ]
          }
        ])
      })
  })
})

describe('Get experience detail', () => {
  const postData = {
    query: `query Experience {
            experience(id: 1) {
                id
                company
                startDate
                endDate
                role
                team
                responsibilities
            }
        }`
  }

  test('Return experience detail information', async () => {
    request(graphQLEndpoint)
      .post('?')
      .send(postData)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error)

        const res = JSON.parse(response.text)

        expect(res.data.experience).toEqual({
          id: '1',
          company: 'New Engen',
          startDate: 'November 2017',
          endDate: 'July 2020',
          role: 'Senior Web Designer',
          team: 'Creative Team',
          responsibilities: [
            "Designed and developed end-to-end web solutions to drive sales and evaluate market viability for enterprise clients including Nestlé, Rothy's, and Proctor & Gamble.",
            "Crafted design and brand systems for use across digital platforms including marketing websites, e-commerce, and mobile applications, resulting in successful product launches and continue 3x growth in conversions.", ,
            "Manage projects and teams in a fast-paced environment to deliver high-performing marketing and sales collateral for both clients and internal initiatives."
          ]
        })
      })
  })
})

describe('Edit experience', () => {
  const postData = {
    query: `mutation EditExperience($experienceToEdit: ExperienceToEdit!) {
            editExperience(experienceToEdit: $experienceToEdit) {
                id
                company
                startDate
                endDate
                role
                team
                responsibilities
            }
        }`,
    variables: {
      experienceToEdit: {
        id: 1,
        company: 'New Engen',
        startDate: 'November 2017',
        endDate: 'July 2020',
        role: 'Senior Web Designer',
        team: 'Creative Team',
        responsibilities: [
          "Designed and developed end-to-end web solutions to drive sales and evaluate market viability for enterprise clients including Nestlé, Rothy's, and Proctor & Gamble.",
          "Crafted design and brand systems for use across digital platforms including marketing websites, e-commerce, and mobile applications, resulting in successful product launches and continue 3x growth in conversions.", ,
          "Manage projects and teams in a fast-paced environment to deliver high-performing marketing and sales collateral for both clients and internal initiatives."
        ]
      }
    }
  }

  test('Updates experience and returns it', async () => {
    request(graphQLEndpoint)
      .post('?')
      .send(postData)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error)

        const res = JSON.parse(response.text)

        expect(res.data.editexperience).toEqual({
          id: '1',
          company: 'New Engen',
          startDate: 'November 2017',
          endDate: 'July 2020',
          role: 'Senior Web Designer',
          team: 'Creative Team',
          responsibilities: [
            "Designed and developed end-to-end web solutions to drive sales and evaluate market viability for enterprise clients including Nestlé, Rothy's, and Proctor & Gamble.",
            "Crafted design and brand systems for use across digital platforms including marketing websites, e-commerce, and mobile applications, resulting in successful product launches and continue 3x growth in conversions.", ,
            "Manage projects and teams in a fast-paced environment to deliver high-performing marketing and sales collateral for both clients and internal initiatives."
          ]
        })
      })
  })
})

describe('Add experience', () => {
  const postData = {
    query: `mutation AddExperience($experienceToAdd: ExperienceToAdd!) {
            addExperience(experienceToAdd: $experienceToAdd) {
                id
                company
                startDate
                endDate
                role
                team
                responsibilities
            }
        }`,
    variables: {
      experienceToAdd: {
        company: 'Jove',
        startDate: 'July 2020',
        endDate: 'September 2021',
        role: 'Senior User Experience Designer',
        responsibilities: [
          "Collaborated closely with product management, leadership, and engineering in the go-to-market strategy and tactical design execution for a 63% increase in active users for the Jove flagship product; Creative Insights.",
          "Led the strategy, implementation, and launch of a new set of brand guidelines and a modernized design system.",
          "Introduced consistent documentation patterns for the Jove design system and in-platform copy documentation, enabling transparent collaboration across teams to boost user retention by 25%.",
          "Conducted comprehensive user testing and interviews to better understand market needs and user convictions behind marketing strategy and execution, defining the product roadmap.",
          "Drove creative production and iteration for digital marketing programs focused on new customer acquisition through content production.",
        ]
      }
    }
  }

  test('Adds new experience and returns the added item', async () => {
    request(graphQLEndpoint)
      .post('?')
      .send(postData)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error)

        const res = JSON.parse(response.text)

        expect(res.data.addExperience).toEqual({
          id: '3',
          company: 'T-Mobile',
          startDate: 'August 2021',
          endDate: 'June 2022',
          role: 'Senior User Experience Designer',
          team: 'Design System & Framework',
          responsibilities: [
            "Stewarding the adoption and implementation of design system principles and best practices to empower designers, developers, and product owners to meet enterprise business goals and evolve the user experience for more than one hundred million cross-platform users.",
            "Spearheaded a team of experience designers, cross-platform developers, and brand strategists to redefine the T-Mobile design system through foundational exploration, component styling, pattern definition, and design system tooling.",
            "Shepherded a tool migration from Adobe XD to Figma through the publication of six libraries for consumption by experience designers, contracting agencies, and third-party partners expanding collaboration, increasing consistency, and accelerating time-to-market.",
            "Managed intake requests for system updates, additions, and broader strategic moves to meet the needs of six integrated design teams operating in a complex agile environment."
          ]
        })
      })
  })
})

describe('Delete experience', () => {
  const postData = {
    query: `mutation DeleteExperience {
            deleteExperience(id: 2) {
                id,
                name,
                type,
                age,
                breed
            }
        }`
  }

  test('Deletes given experience and returns updated list', async () => {
    request(graphQLEndpoint)
      .post('?')
      .send(postData)
      .expect(200)
      .end((error, response) => {
        if (error) console.error(error)

        const res = JSON.parse(response.text)

        expect(res.data.deleteExperience).toEqual([
          {
            id: 1,
            company: 'New Engen',
            startDate: 'November 2017',
            endDate: 'July 2020',
            role: 'Senior Web Designer',
            team: 'Creative Team',
            responsibilities: [
              "Designed and developed end-to-end web solutions to drive sales and evaluate market viability for enterprise clients including Nestlé, Rothy's, and Proctor & Gamble.",
              "Crafted design and brand systems for use across digital platforms including marketing websites, e-commerce, and mobile applications, resulting in successful product launches and continue 3x growth in conversions.", ,
              "Manage projects and teams in a fast-paced environment to deliver high-performing marketing and sales collateral for both clients and internal initiatives."
            ]
          },
          {
            id: 3,
            company: 'T-Mobile',
            startDate: 'August 2021',
            endDate: 'June 2022',
            role: 'Senior User Experience Designer',
            team: 'Design System & Framework',
            responsibilities: [
              "Stewarding the adoption and implementation of design system principles and best practices to empower designers, developers, and product owners to meet enterprise business goals and evolve the user experience for more than one hundred million cross-platform users.",
              "Spearheaded a team of experience designers, cross-platform developers, and brand strategists to redefine the T-Mobile design system through foundational exploration, component styling, pattern definition, and design system tooling.",
              "Shepherded a tool migration from Adobe XD to Figma through the publication of six libraries for consumption by experience designers, contracting agencies, and third-party partners expanding collaboration, increasing consistency, and accelerating time-to-market.",
              "Managed intake requests for system updates, additions, and broader strategic moves to meet the needs of six integrated design teams operating in a complex agile environment."
            ]
          },
          {
            id: 4,
            company: 'HashiCorp',
            startDate: 'June 2022',
            endDate: 'Present',
            role: 'Senior Product Designer I',
            team: 'Design System Team',
            responsibilities: [
              "Plan, execute and document the design of new components, patterns, and elements in Helios; the HashiCorp Enterprise design system.",
              "Partner with engineers to develop user-friendly and comprehensive component APIs for consistency in design tooling and published Ember and React components.",
              "Play an advisory and consultative role assisting product designers and engineers in the transition, implementation, and migration to Helios from a legacy design system and isolated local components.",
            ]
          }
        ])
      })
  })
})