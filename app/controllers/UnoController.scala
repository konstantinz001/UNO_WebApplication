
package controllers

import javax.inject._
import play.api.mvc._
//import UNO.util.{State, gameStatsEvent, instructionEvent}
//import UNO.UnoGame
import UNO.aview.TUI
import UNO.controller.controllerComponent.controllerInterface

@Singleton
class UnoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  //val controller = UNO.UnoGame.controller
  val controller: controllerInterface = UNO.UnoGame.controller
  val tui = new TUI(controller)

//___________________TASK1_______________________________________________________________
  def startGame() = Action { implicit request: Request[AnyContent] =>
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def setGame(index : String) = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("r " + index)
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def getGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("s")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def unoGame(index: String) = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("u " + index)
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def redoGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("redo")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def undoGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("undo")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def saveGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("save")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def loadGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("load")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def quitGame() = Action { implicit request: Request[AnyContent] =>
    tui.processInputLine("q")
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

//_____________________________TASK2_____________________________________________
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def about() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.about())
  }

  def tuiGame = Action {
    Ok(views.html.tui(tui))
  }

  def instructionExecute(input: String, index: String) = Action {
    tui.processInputLine(input + " " + index)
    Ok(views.html.tui(tui))
  }
}
