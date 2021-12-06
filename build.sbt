
name := """UNO for WebApps"""

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.15"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "UNO-WebApp.controllers._"

// Adds additional packages into conf/routes
//play.sbt.routes.RoutesKeys.routesImport += "UNO-WebApp.binders._"


//libraryDependencies += guice

//libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "test"

//libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test

//libraryDependencies += "com.h2database" % "h2" % "1.4.196"
