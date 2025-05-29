import { Controller } from './controller.js'
import { View } from './view.js'

export class Factory {
  static initialize(){
    const view = new View()
    
    const controller = Controller.initialize({ view })

    view.setController(controller)

    return { view, controller }
  }
}