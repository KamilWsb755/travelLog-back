# Travel Log App
**Travel Log App** is a minimalist app where the users can log the places they've travelled to, attach the photos and comment on the visits of others.

## Interface & Usage
The app consists of the two main components: a **gallery** and an **editor**. 
### Gallery
This first component contains a list of posts people share about different travelling destinations. Every post contains a photo of the place, a user-added caption, and a comment section which can be accessed by clicking a *Zobacz więcej...* option under the caption.
> **Note:** Every post has a separate comment section. Comments appear one under another and can be scrolled through.
#### Reading & Adding Comments
To read other people's thoughts or add their own, the user should click *Zobacz więcej...*, which opens a list of existing comments and a field to type in a new one. After typing in their nickname and a comment, the user should click *Wyślii formularz* - and see their text appearing under the post.

### Travel Logger
This component allows the user to add their own posts by attaching a picture and an optional caption about the place.
#### Adding a place
To log a place they've been to, the user clicks *Add Travel Log*. In the window that opens up, they should type in the name of the destination, its description, and a link to the photo. After *Wyślii formularz* is clicked, they can return to *Browse Gallery* and make sure their post appeared on a list of travel logs.

## Technologies Used
Front-end of the Travel Log App was created using **React.js**. For the back-end part, **Node.js** was used.
