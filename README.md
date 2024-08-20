# T2O-Verse

# Boiler-Plate Components On NextJS

A Front-End designed for the Flask Role Management System. The application allows for secure Login, Signup, Profile/User Management, Kanban Board, Log Tables (Some features may be restricted to the role of Admin).The Front-End application is built using [NextJs](https://nextjs.org/), [TailwindCss](https://tailwindcss.com/), along with additional libraries to assist with the application features.

## Features

- User Authentication
- Two-Factor Authentication
- Profile Interface
- Log Table Interface
- Kanban Board
- Profile/Users Update Interface
- Role Management (Admin only)

## Getting Started

### Pre-Requisites

> [NodeJs](https://nodejs.org/en)
> [Git](https://git-scm.com/)

### Installation

1. Clone Repository:

   ```
   git clone https://github.com/Bill-Klay/T2O-verse.git
   cd T20-verse
   ```

2. Switch to Branch _next-client_:

   ```
   git checkout next-client
   cd next-client
   ```

3. Install Dependencies:
   ```
   npm install
   ```
4. Add Server Url For API Calls:

   > Create a **lib** folder in **next-client** folder.
   > In the **lib** folder create a file **Constants.ts**
   > In the file created add: export const base_url = "url_of_server"

5. Run Application:
   ```
   npm run dev
   ```

## Project Structure

```
/T2O-verse
    /server
    /next_client
        /app
            /(Auth)
            /(Main)
                /Dashboard
    /Components
    /handlers
    /hooks
    /lib
    /Providers
    /public
    /utils
```
