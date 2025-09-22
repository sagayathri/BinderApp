
  # Binder App

  This is a code bundle for Binder App. The original project is available at https://www.figma.com/design/ft8utDhkWg1rTAb92LDABO/Binder-App.

# App Architecture 
  +-------------------------------------------------------------------+
|                       Presentation Layer (App Module)             |
|                                                                   |
|   +-----------------+     +-----------------+     +-------------+ |
|   | Composables     |<--->|   ViewModels    |<--->| Navigation  | |
|   | (UI Screens)    |     | (AndroidX VM)   |     |             | |
|   +-----------------+     +-----------------+     +-------------+ |
|         ^                           |                             |
|         | Observes                  | Executes                    |
|         |                           v                             |
|-------------------------------------------------------------------|
|                         Domain Layer (Kotlin Module)              |
|                                                                   |
|                         +-----------------+                       |
|                         |    Use Cases    |                       |
|                         | (Interactors)   |                       |
|                         +-----------------+                       |
|                                |         ^                        |
|                                |         | Depends on Abstractions|
|                                v         |                        |
|   +----------------------+     +-----------------------+         |
|   | Entities (Models)    |<--->| Repository Interfaces |         |
|   +----------------------+     +-----------------------+         |
|                                                                   |
|-------------------------------------------------------------------|
|                          Data Layer (Kotlin/Android Module)       |
|                                                                   |
|                         +--------------------------+              |
|                         |  Repository Implementations|              |
|                         +--------------------------+              |
|                                |          |                       |
|                                |          |                       |
|                 +--------------v--+     +--v----------------+     |
|                 | Remote Data Src |     | Local Data Source |     |
|                 | (Retrofit/FCM)  |     | (Room DB)         |     |
|                 +-----------------+     +-------------------+     |
|                                                                   |
+-------------------------------------------------------------------+

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
