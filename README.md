[![Build Status](https://travis-ci.org/LauraWert/vue-test-helpers.svg?branch=v2)](https://travis-ci.org/LauraWert/vue-test-helpers)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b7436afec00b4d6a925a3c2bc4859a08)](https://www.codacy.com/app/LauraWert/vue-test-helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LauraWert/vue-test-helpers&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b7436afec00b4d6a925a3c2bc4859a08)](https://www.codacy.com/app/LauraWert/vue-test-helpers?utm_source=github.com&utm_medium=referral&utm_content=LauraWert/vue-test-helpers&utm_campaign=Badge_Coverage)

vue-test-helpers

tslint jsrules can be set to true when the following PR is released
https://github.com/palantir/tslint/pull/3641

## Installation
#### Cypress
If you want to be able to use the vue app in the cypress tests you need to add the vue app to the window object. This can
be done by installing vue-test-helpers as a plugin and running the following code:

``` javascript
import { addAppToWindow } from '@laura-wert/vue-test-helpers'
import IVue, { ComponentOptions } from 'vue'

// is not a plugin but adds app to the window object so it can easily be used in cypress tests
export default <V extends IVue>({ app }: { app: ComponentOptions<V> }): void => {
  addAppToWindow(app)
}
```

This package also contains a few cypress commands which can be used in you project by extending cypress as follows:

``` javascript
     import { extendCypress } from '@laura-wert/vue-test-helpers'
     
     extendCypress(Cypress, cy)
``` 

If you want to use the extra cypress commands in a typescript project, then you need to declare the following commands 
on the Chainable interface in the cypress namespace:

``` javascript
/* tslint:disable-next-line */
declare namespace Cypress {
  // @ts-ignore
  import { Store } from 'vuex'

  /* tslint:disable interface-name no-any */
  interface Chainable<Subject = any> {
      getByName<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>

      findByName<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>

      getInput<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>
    
      findInput<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>
      
      getField<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>
          
      findField<E extends Node = HTMLElement>(...parts: string[]): Chainable<JQuery<E>>
            
      shouldHaveValidationError<E extends Node = HTMLElement>(errorMessage: string): void
      
      shouldNotHaveValidationError<E extends Node = HTMLElement>(): void

      shouldShowNotification<E extends Node = HTMLElement>(
        errorMessage: string,
        index?: number,
      ): void

      loadStore(): Promise<Store>

      selectOption(labelOrIndex: string | string[] | number | number[]): void
  }
}
```
