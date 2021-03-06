// tslint:disable-next-line:no-any
export function extendCypress(Cypress: any, cy: any): void {
  /**
   * Searches HTML dom for one or more elements by name and data-name property
   * @param {parts} set of strings which together form the element name
   * @returns (Cypress Chainable)
   */
  Cypress.Commands.add('getByName', (...parts: string[]) => {
    const name = parts.join('-')
    return cy.get(`[name="${name}"], [data-name="${name}"]`)
  })

  /**
   * Searches HTML dom for one or more descendent elements by name and data-name property
   * @param {subject} cypress chainable
   * @param {parts} set of strings which together form the element name
   * @returns (Cypress Chainable)
   */
  Cypress.Commands.add(
    'findByName', { prevSubject: 'optional' },
    (subject: HTMLElement | null, ...parts: string[]) => {
      const cysubject = subject ? cy.wrap(subject) : cy
      const name = parts.join('-')
      return cysubject.find(`[name="${name}"], [data-name="${name}"]`)
    },
  )

  Cypress.Commands.add('getInput', (...parts: string[]) => {
    return cy.getByName(...parts)
  })

  Cypress.Commands.add(
    'findInput', { prevSubject: 'optional' },
    (subject: HTMLElement | null, ...parts: string[]) => {
      const cysubject = subject ? cy.wrap(subject) : cy
      return cysubject.findByName(...parts)
    },
  )

  Cypress.Commands.add('getField', (...parts: string[]) => {
    return cy.getByName(...parts).parents('.q-field')
  })

  Cypress.Commands.add(
    'findField', { prevSubject: 'optional' },
    (subject: HTMLElement | null, ...parts: string[]) => {
      const cysubject = subject ? cy.wrap(subject) : cy
      return cysubject.findByName(...parts).parents('.q-field')
    },
  )

  /**
   * Searches and validates previous Cypress chainable for quasar .q-field-error with correct error response
   * @param {subject} HTML element
   * @param {errorMessage} string Message which should be shown in .q-field-error
   * @returns (void)
   */
  Cypress.Commands.add(
    'shouldHaveValidationError', { prevSubject: 'element' },
    (subject: HTMLElement, errorMessage: string) => {
      const cySubject = cy.wrap(subject)

      cySubject.parents('.q-field--error')
        .find('.q-field__bottom .q-field__messages').should('have.text', errorMessage)
    },
  )

  Cypress.Commands.add(
    'shouldNotHaveValidationError', { prevSubject: 'element' },
    (subject: HTMLElement, errorMessage: string) => {
      const cySubject = cy.wrap(subject)

      cySubject.parents('.q-field--error').should('not.exist')
    },
  )

  /**
   * Searches and validates if the dom contains an active quasar notification with given message
   * @param {errorMessage} string Message which to be shown in quasar notification
   * @param {index} int index of message in case there are multiple notifications on screen
   * @returns (void)
   */
  Cypress.Commands.add(
    'shouldShowNotification', { prevSubject: false },
    (errorMessage: string, index: number = 0) => {
      cy.get('.q-notification .q-alert-content').as('error').should('be.visible')
      cy.get('@error').eq(index).should('have.text', errorMessage)
    },
  )

  /**
   * Gets vuex store from window
   * @returns (vuex Store)
   */
  Cypress.Commands.add('loadStore', () => {
    return cy.window().its('app.store')
  })

  /**
   * Clicks on an element of q-local-menu
   * @param {subject} HTML element
   * @param {labelOrIndex} string | number name or index of options to be clicked
   * @returns void
   */
  Cypress.Commands.add(
    'selectOption',
    { prevSubject: 'element' },
    (subject: HTMLElement, labelOrIndex: string | number | Array<string | number>) => {
      if (typeof labelOrIndex === 'string' || typeof labelOrIndex === 'number') {
        labelOrIndex = [labelOrIndex]
      }

      cy.wrap(subject).eq(0).click()
      cy.wait(350)
      cy.get('.q-menu .q-item').as('selectOptions')

      labelOrIndex.forEach((value: string | number) => {
        if (typeof value === 'number') {
          cy.get('@selectOptions').eq(value).click()
        } else {
          cy.get('@selectOptions').contains(value).click()
        }
      })
    },
  )
}
