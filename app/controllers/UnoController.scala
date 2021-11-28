
package controllers


import javax.inject._
import play.api.mvc._
import UNO.aview.TUI
import UNO.controller.controllerComponent.controllerInterface
import UNO.controller.controllerComponent.controllerBaseImp.{updateStates, welcomeStates}
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import scala.swing.Reactor
import scala.swing.event.Event

@Singleton
class UnoController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
  val controller: controllerInterface = UNO.UnoGame.controller
  val tui = new TUI(controller)

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def about() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.about())
  }

  def test() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.test())
  }

  def tuiGame() = Action {
    Ok(views.html.tui(tui))
  }

    def tuiNewGame() = Action {
    controller.setDefault()
    Ok(views.html.tui(tui))
  }

  def getCard() = Action {
    tui.processInputLine("s")
    Ok(views.html.tui(tui))
  }

  def setCard(index: String) = Action {
    tui.processInputLine("r " + index)
    Ok(views.html.tui(tui))
  }

  def setUnoCard(index: String) = Action {
    tui.processInputLine("u " + index)
    Ok(views.html.tui(tui))
  }

  def gameToJson(): Action[AnyContent] = Action {
    Ok(
      Json.prettyPrint(
        Json.obj(
          "game" -> Json.obj(
            "playStackCard" -> JsString(controller.playStack2(0).color + "||" +controller.playStack2(0).value),
            "playerListNameCurrent" -> JsString(controller.playerList(0).name),
            "playerListNameNext" -> JsString(controller.playerList(1).name),
            "playerListCardsCurrent" -> JsArray(
              for{
                card <-0 until controller.playerList(0).playerCards.length 
              }yield {
                JsString(controller.playerList(0).playerCards(card).color + "||" + controller.playerList(0).playerCards(card).value)
              }
            ),
            "playerListCardsNext" -> JsArray(
              for{
                card <-0 until controller.playerList(1).playerCards.length 
              }yield {
                JsString(controller.playerList(1).playerCards(card).color + "||" + controller.playerList(1).playerCards(card).value )
              }
            ),
          )
        )
      )
    )
  }



def socket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      UnoWebSocketActorFactory.create(out)
    }
  }

  object UnoWebSocketActorFactory {
    def create(out: ActorRef): Props = {
      Props(new UnoWebSocketActor(out))
    }
  }

  class UnoWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(controller)

    def receive: Receive = {
      case msg: String =>
        out ! gameToJson()
        println("Sent Json to Client"+ msg)
    }

    reactions += {
      
      case event: updateStates => {
        println("Received GameChanged-Event from Controller")
        sendJsonToClient()
      }
    }

    def sendJsonToClient(): Unit = {
      println("Received event from Controller")
      out ! (gameToJson())
    }
  }
}