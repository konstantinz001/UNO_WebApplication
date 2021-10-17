
package controllers

import javax.inject._
import play.api.mvc._
import UNO.util.{State, gameStatsEvent, instructionEvent}

@Singleton
class UnoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val controller = UNO.UnoGame.controller



  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def about() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.about())
  }

  def ownText(Text: String) = Action { implicit request: Request[AnyContent] =>
    Ok(Text)
  }


  def startGame() = Action { implicit request: Request[AnyContent] =>
    Ok(State.handle(instructionEvent()) + State.handle(gameStatsEvent()))
  }

  def setGame(index : Int) = Action { implicit request: Request[AnyContent] =>
    controller.removeCard(index)
    Ok(State.handle(gameStatsEvent()))
  }

  def getGame() = Action { implicit request: Request[AnyContent] =>
    controller.getCard()
    Ok(State.handle(gameStatsEvent()))
  }

  def redoGame() = Action { implicit request: Request[AnyContent] =>
    controller.redoGet
    Ok(State.handle(gameStatsEvent()))
  }

  def undoGame() = Action { implicit request: Request[AnyContent] =>
    controller.undoGet
    Ok(State.handle(gameStatsEvent()))
  }

  def saveGame() = Action { implicit request: Request[AnyContent] =>
    controller.save
    Ok(State.handle(gameStatsEvent()))
  }

  def loadGame() = Action { implicit request: Request[AnyContent] =>
    controller.load
    Ok(State.handle(gameStatsEvent()))
  }
}