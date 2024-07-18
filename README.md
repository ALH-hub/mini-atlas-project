# ATLAS Project: ALX-Africa Final Training Project

Welcome to the ATLAS project! This initiative aims to provide a repository of lecture notes for secondary school students and a quiz bank for lecturers to assess their students in Cameroon.

## Running the Platform Locally

To get started with the ATLAS project locally, follow these steps:

1. **Clone the Repository:**
   - Clone or fork the repository.

2. **Install Node.js:**
   - Ensure Node.js is installed on your machine.

3. **Setup the Client:**
   - Navigate to the **client** folder and run `npm install`.
   - To run the frontend, use the command `npm run dev`.

4. **Setup the Server:**
   - Navigate to the **server** folder and run `npm install` again.
   - Before running the server, ensure you have a `.env` file at the root of the **server** folder in your cloned repository.
   - The `.env` file should contain the URL to your MongoDB cluster and the secret key for encrypting user passwords.
   - The environmental variables should be named `URL` and `SECRET` respectively.
   - Run the server using `npm start`.

**Note:** This is only if you're curious and want to experiment on your own.

## Current Functionalities

- **Lecture Note Upload:** Lecturers can upload lecture notes.
- **Student Lecture Access:** Students can access the uploaded lecture notes.
- **Quiz Bank for Lecturers:** Lecturers can create and manage quizzes.
- **CRUD Operations for Admin:** Admins can perform CRUD operations on users.

## Challenges and Solutions

### Formatting Lecture Notes

**Challenge:** Providing basic formatting functionalities for the notes uploaded by lecturers.

**Solution:** After diving deep into the extensive documentation of React Quill, I finally found the solution and implemented it successfully. 🎉

### Managing Quiz Data Structure State

**Challenge:** Managing the state for the quiz upload data structure.

**Solution:** It was a tough nut to crack, but after several trials and errors, I finally figured it out. 😁

Despite the backend being a bit challenging, I thoroughly enjoyed implementing every single functionality. The stress of debugging was surprisingly exhilarating—I loved every moment of it! 🤩
