# Lab 5 Platform: Server

*Building an express and mongodb CRUD api server for a react+redux Upcoming Movies frontend*

[Heroku Instance](https://upcoming-movies-lit.herokuapp.com/)


[Frontend Netlify](https://distracted-kilby-e585fa.netlify.app/)

## What Worked Well

- All endpoints were implemented and worked 
- Basic CRUD API: create, update, delete api for the blog worked 
- Downloading Insomnia + MongoDB Compass was very handy
- Movie data saved in a Mongo Database that is hosted by a Heroku App instance

## What Didn't
- Attempted to try authentication and commenting, but did not have time to complete it! 

## Extra Credit
- Changed tags store to be an array rather than a string!
- Modified post blog with more content! Added in new fields to your posts.
- Search support added in! 

## Screenshots

https://user-images.githubusercontent.com/47261209/118421356-08d9c480-b68f-11eb-9f79-206a0da8bb9a.mov


# SA7: 
- Authentication added

## Description 
Extended frontend and our backend to support authentication and users!

## What worked well: 
MVPs complete!
- have users sign-in, sign-up, sign-out
- not allow people to access /posts/new when not logged in
- have a user model that stores authorname, salt+hashed password, and name

## What didn't work well
- Did not have time to create input check (whether the email was really an email or not) 
