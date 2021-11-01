
package controllers

import javax.inject._
import play.api.mvc._
import UNO.aview.TUI
import UNO.controller.controllerComponent.controllerInterface

@Singleton
class UnoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val controller: controllerInterface = UNO.UnoGame.controller
  val tui = new TUI(controller)

  def test() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.test())
  }

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def about() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.about())
  }

  def tuiGame = Action {
    Ok(views.html.tui(tui))
  }

  def instructionExecute(input: String, index: String, unoIndex:String) = Action {
    if(unoIndex == "") {
      tui.processInputLine(input + " " + index)
    } else {
      tui.processInputLine(input + " " + unoIndex)
    }
    Ok(views.html.tui(tui))
  }
}
