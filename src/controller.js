import { validatedProxy } from "./helpers.js"
import { userSchema } from "./schema.js"

export class Controller {
    #view

    constructor({ view }){
      this.#view = view
    }

    
  static initialize(deps) {
    const controller = new Controller(deps)
    return controller
  }

  handleForm({ name, age }){
    const user = validatedProxy(userSchema, { name, age })
    this.#view.setUser(user) 
  }
}