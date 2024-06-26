# ktpdatabase

## Table of Contents
- [Note](#note)
- [Guide to Contributing](#guide-to-contributing)
  - [Important Concepts](#important-concepts)
  - [Some Guidelines](#some-guidelines)
  - [How to Run the Project Locally](#how-to-run-project-locally)
  - [Making a Request to the Backend](#making-a-request-to-the-backend)
  - [Connecting to the Supabase Client](#connecting-to-the-supabase-client)
  - [Limiting Page Access to Authenticated Users](#limiting-page-access-to-authenticated-users)
  - [How to Run the Course Scraper](#how-to-run-the-course-scraper)
  - [How to Run the Professor Scraper](#how-to-run-the-professor-scraper) 
- [Current Roadmap of Website](#current-roadmap-of-website)
- [Current Open Questions](#current-open-questions)
- [To-Do List](#to-do-list)

## Note

The following sections are written to help KTP brothers add to the project. These may not be 100% correct and are written with a macOS setup in mind (bash scripts, etc). Please read the Guide to Contributing section before starting.

When developing, just save the file you have just changed and the webpage will automatically reflect that change (if no error occurs). As a rule of thumb, if there is nothing on the webpage, there is some error in your code, which can be diagnosed either in your terminal or by pressing `inspect` on the webpage and checking `console` for output (messages+errors).

## Guide to Contributing
The steps to set up your workflow are detailed in the file named `Git Workflow` in the shared `App Committee` folder on Google Drive. Please follow these steps, and reach out to the head of the app committee if you need help, have any questions, or wish to join the app committee.

### Important Concepts
- **App.jsx**: this file defines the template of a page. As can be seen by this file, each page has 3 parts: the Header, the Outlet, and the Footer. The Outlet part will be replaced by a Page when each page is requested. For example, if we go to the Academics page, then the `Academics.jsx` file defines what content is filled in at Outlet
- **Component**: a piece of reused code (footer, header) that can be reused across pages. 
- **Page**: actual content that is rendered between the footer and header components.
- **Backend vs Frontend**: for this project, we are running two servers concurrently. The backend server maintains large amounts of data requests (in our case, the course information). The frontend server maintains the actual HTML and CSS (in the form of React.js) and requests information from the backend as needed.
- **index.html**: this file is always the entryway into a website. When a browser requests content from that website, this file is what is first looked through. You can see in that file that all it does is link to `App.jsx`, which creates the map for our website. This is a React.js concept.

### Some Guidelines
1. Use the vs code prettier extension with these settings: `Print Width: 80` `Prose Wrap: always` `Tab Width: 4`.

### How to Run the Project Locally
1. Make sure that you have `Git`, the `GitHub SSH key`, `Node.js`, and `npm` installed on your local machine.
2. `Fork` this repository to your personal GitHub account.
4. On your forked repository, click `Code` and copy the `SSH URL`.
5. Navigate to the directory on your local machine where you want to have the project code.
6. Run `git clone <SSH URL>`, where `<SSH URL>` is the URL you copied in step 3.
7. Navigate to the `frontend` folder.
8. Run `npm i`, which installs all packages needed by the frontend.
9. Navigate to the `backend` folder.
10. Run `npm i` again to install all backend packages.
11. Set up the `.env` files in both the frontend and the backend. In the shared Google Drive folder (<a href="https://drive.google.com/drive/u/1/folders/1bkA2QZQkNpFGQj8MW2tyx1N7N_cq5KCB" target="_blank">App Committee</a>), navigate to the folder called `ktpdatabase` and look at the document called `.env files` to set them up. If you need access to the folder, contact Victor or Carol.
12. Still in the `backend` folder, run `npm run dev` which starts up the backend server on `http://localhost:3000` (the configured default).
14. Open another terminal window, navigate to the `frontend` folder, and run `npm run dev` again, which starts the frontend server at `http://localhost:5173/`.
8. Both servers need to be up and running to get full functionality. Once both are up, go to your desired web browser and visit `http://localhost:5173/` to interact with the website.

### Making a Request to the Backend
Here is an example of how to implement a request to the backend in a file:

Import the base backend URL from the .env file:

`const backend = import.meta.env.VITE_BACKEND_URL;`

Make the call to the backend using the imported base URL as a fstring (the string needs to be enclosed by a single backtick symbol):

axios.get(\`${backend}/academics/courses/dependencies/nodes/${subject}\`)

### Connecting to the Supabase Client
Supabase is an open-source cloud-hosted PostgreSQL database. 

To connect to the Supabase client API using JavaScript, add the following import statement at the top of the file if it is not already present:

`import supabase from "./supabaseClient.js";`

To connect to the Supabase client API using Python, first add the following import statements at the top of the file if it is not already present:

```
from dotenv import load_dotenv
import os
from pathlib import Path
```

Next, paste the following code at the top of the file:

```
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")
try:
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    supabase = create_client(supabase_url, supabase_key)
except:
    print("failed to connect to Supabase")
```

You must update the `dotenv_path` parameter to match the path from your file to the .env. The example file is at `backend/scrapers/ProfScraper.py`, while the .env file is at `backend/.env`. Using that information, you can probably deduce what your `dotenv_path` parameter needs to be.

Follow the relevant [JavaScript documentation](https://supabase.com/docs/reference/javascript/installing) or [Python documentation](https://supabase.com/docs/reference/python/installing) to implement any Supabase API calls.

### Limiting Page Access to Authenticated Users
All pages on the website excluding the home and error pages should only be accessed by authenticated users. To do so, the following code snippet must be included on each page at the top of the function that defines that page:

```
const navigate = useNavigate();

const getUser = useCallback(async () => {
  try {
    await axios.get(`${backend}/auth/google/login/success`, {
      withCredentials: true,
    });
  } catch (error) {
    navigate("/error/login");
  }
}, [navigate]);

useEffect(() => {
  getUser();
}, [getUser]);
```

### How to Run the Course Scraper
IMPORTANT: PLEASE DO NOT RUN THIS FILE WITHOUT CONSULTING WITH VICTOR

The course scraper is located at the path `./backend/scrapers/CourseScraper.py`.
1. Navigate to the `backend` folder.
2. Run `pip install -r ./requirements.txt`.
3. Update the `course_urls` variable in `CourseScraper.py` with the relevant subject-url pair if you want to scrape additional subjects.
4. Run `CourseScraper.py` and the course information will be stored in Supabase in the `course-info` table.

### How to Run the Professor Scraper
IMPORTANT: PLEASE DO NOT RUN THIS FILE WITHOUT CONSULTING WITH VICTOR

The professor scraper is located at the path `./backend/scrapers/ProfScraper.py`.
1. Navigate to the `backend` folder.
2. Run `pip install -r ./requirements.txt`.
3. Update the `prof_urls` variable in `ProfScraper.py` with the relevant prof-url pair if you want to scrape professors from additional subjects.
4. Run `ProfScraper.py` and the list of professors will be stored in Supabase in the `professors` table.

## Current Roadmap of Website

```text
    root
    |_ Home
    |_ Academics
        |_ Courses
            |_ ...all undergraduate courses by course code
                |_ Add Course Review
        |_ Resources
        |_ Graduate
            |_ ...all graduate courses by course code
                |_ Add Course Review
    |_ Professional
        |_ Other KTP Chapters
    |_ Calendar
    |_ Account
        |_ Admin (requires admin privileges)
          |_ Manage Users
          |_ Manage Reviews
        |_ Profile
        |_ Reviews
```


## To-Do List
Look at this repository's `Issues` tab for the next steps. Feel free to open a new issue if you feel anything should be added or changed.
