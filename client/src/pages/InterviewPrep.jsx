import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBookOpen,
  FaBriefcase,
  FaLightbulb,
  FaUserTie,
  FaCode,
  FaArrowLeft,
  FaArrowRight,
  FaStar
} from "react-icons/fa";
import "../css/InterviewPrep.css";

/* =========================================================
   COMMON INTERVIEW QUESTIONS
========================================================= */

const commonQuestions = [
  {
    question: "Tell me about yourself.",
    answer:
      "My name is [Your Name]. I am currently pursuing my degree in [Your Course]. I have a strong interest in technology and software development. I have worked on academic projects where I gained practical experience with programming, web development and problem-solving. I am a quick learner and I am looking forward to starting my professional career and improving my skills.",
    tip: "Keep your introduction between 30 seconds and 1 minute. Talk about your education, skills, project experience and career interest."
  },
  {
    question: "Why should we hire you?",
    answer:
      "You should hire me because I am a hardworking and quick-learning candidate with a strong interest in technology. I have gained practical experience through academic projects and I am willing to learn new technologies. I can work well in a team and I will always try to contribute positively to the organization.",
    tip: "Explain what skills, qualities and attitude you can bring to the company."
  },
  {
    question: "What are your strengths?",
    answer:
      "My strengths are that I am a quick learner, responsible and willing to take on new challenges. I also enjoy solving problems and working with others to complete tasks effectively.",
    tip: "Choose 2 or 3 genuine strengths and give a small example when possible."
  },
  {
    question: "What are your weaknesses?",
    answer:
      "One of my weaknesses is that sometimes I spend extra time making sure my work is correct. However, I am learning to manage my time better and focus on completing tasks efficiently.",
    tip: "Mention a real but manageable weakness and explain how you are improving it."
  },
  {
    question: "Why do you want this job?",
    answer:
      "I want this job because it matches my skills and career interests. I believe this opportunity will allow me to apply what I have learned, gain practical experience and grow professionally while contributing to the organization.",
    tip: "Connect the job requirements with your skills and career goals."
  },
  {
    question: "Why do you want to work for our company?",
    answer:
      "I would like to work for your company because it provides an opportunity to learn and work on real-world projects. I believe the work environment and growth opportunities would help me develop professionally while allowing me to contribute to the team.",
    tip: "Research the company before the interview and mention something specific about it."
  },
  {
    question: "Where do you see yourself in five years?",
    answer:
      "In five years, I see myself as a skilled professional with strong technical knowledge and practical experience. I would like to take more responsibility, work on challenging projects and contribute meaningfully to my organization.",
    tip: "Show ambition, but keep your answer realistic."
  },
  {
    question: "What are your career goals?",
    answer:
      "My short-term goal is to start my career in a good organization where I can apply my knowledge and gain practical experience. My long-term goal is to become an experienced professional and take responsibility for important projects.",
    tip: "Clearly separate your short-term and long-term goals."
  },
  {
    question: "How do you handle pressure?",
    answer:
      "I try to remain calm and organize my work according to priority. I break a large task into smaller tasks and complete them one by one. If necessary, I communicate with my team to find an effective solution.",
    tip: "Show that you solve problems instead of becoming overwhelmed."
  },
  {
    question: "Are you comfortable working in a team?",
    answer:
      "Yes, I am comfortable working in a team. Teamwork allows people to share ideas, solve problems and learn from each other. During my academic projects, I worked with team members to divide tasks and complete the project successfully.",
    tip: "Give an example of how you worked with teammates."
  },
  {
    question: "Tell me about your project.",
    answer:
      "My final-year project is a web-based platform designed to help students improve their career preparation. It includes features related to resume analysis, career recommendations and interview preparation. Working on the project helped me gain practical experience in development, problem-solving and teamwork.",
    tip: "Know your project architecture, technologies, features and your own contribution."
  },
  {
    question: "What was your contribution to the project?",
    answer:
      "I contributed to the development of the project by working on the application interface, functionality and integration of different features. I also worked with the technologies used in the project and helped implement features required by the users.",
    tip: "Change this answer according to your actual contribution."
  },
  {
    question: "What is your biggest achievement?",
    answer:
      "One of my biggest achievements is successfully completing my academic project and gaining practical experience by implementing different technologies together. It helped me improve my programming, teamwork and problem-solving skills.",
    tip: "For freshers, academic projects, certifications and competitions can all be valid achievements."
  },
  {
    question: "How do you handle failure?",
    answer:
      "I try to learn from failure instead of getting discouraged. I identify what went wrong, understand how I can improve and then try again with a better approach.",
    tip: "Show a positive and learning-oriented attitude."
  },
  {
    question: "What are your salary expectations?",
    answer:
      "As a fresher, my primary goal is to get a good opportunity where I can learn and develop my skills. I am open to the company's standard salary structure for this position.",
    tip: "Avoid giving an unrealistic number unless the interviewer specifically asks for one."
  },
  {
    question: "Do you have any questions for us?",
    answer:
      "Yes. I would like to know more about the responsibilities of this role, the technologies the team works with and the learning opportunities available for freshers.",
    tip: "Always try to ask at least one meaningful question."
  }
];

/* =========================================================
   JOB ROLE QUESTIONS - 15 QUESTIONS EACH
========================================================= */

const roleQuestions = {
  "Frontend Developer": [
    {
      question: "What is HTML?",
      answer:
        "HTML stands for HyperText Markup Language. It is used to create the structure and content of web pages.",
      tip: "Remember: HTML provides structure."
    },
    {
      question: "What is CSS?",
      answer:
        "CSS stands for Cascading Style Sheets. It is used to style HTML elements, including colors, layouts, spacing, fonts and responsive designs.",
      tip: "Remember: CSS controls presentation and design."
    },
    {
      question: "What is JavaScript?",
      answer:
        "JavaScript is a programming language used to add logic and interactivity to web applications.",
      tip: "Give examples such as button clicks, validation or API calls."
    },
    {
      question: "What is responsive web design?",
      answer:
        "Responsive web design means creating websites that adapt to different screen sizes such as mobile phones, tablets and desktops.",
      tip: "Mention flexible layouts and media queries."
    },
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used to build user interfaces using reusable components.",
      tip: "Mention component-based development."
    },
    {
      question: "What are React components?",
      answer:
        "React components are reusable building blocks of a React application. They can contain their own structure, logic and styling.",
      tip: "Give a simple example of a reusable component."
    },
    {
      question: "What is the difference between state and props?",
      answer:
        "Props are values passed from a parent component to a child component, while state is data managed within a component that can change over time.",
      tip: "Remember: props are passed in, state is managed."
    },
    {
      question: "What is the DOM?",
      answer:
        "The DOM, or Document Object Model, represents an HTML document as a tree of objects that JavaScript can access and modify.",
      tip: "Explain that JavaScript can change page content through the DOM."
    },
    {
      question: "What is Flexbox?",
      answer:
        "Flexbox is a CSS layout system used to arrange elements in rows or columns and control alignment and spacing.",
      tip: "Know justify-content and align-items."
    },
    {
      question: "What is CSS Grid?",
      answer:
        "CSS Grid is a layout system designed for creating two-dimensional layouts using rows and columns.",
      tip: "Compare Grid with Flexbox if asked."
    },
    {
      question: "What is event handling in JavaScript?",
      answer:
        "Event handling allows JavaScript to respond to actions such as clicks, keyboard input, mouse movement and form submission.",
      tip: "Give a button-click example."
    },
    {
      question: "What is an API?",
      answer:
        "An API allows different software applications or components to communicate and exchange data.",
      tip: "Mention HTTP requests when discussing web APIs."
    },
    {
      question: "What is the difference between let, const and var?",
      answer:
        "var is function-scoped, while let and const are block-scoped. let can be reassigned, while const cannot be reassigned after initialization.",
      tip: "Focus on scope and reassignment."
    },
    {
      question: "What is form validation?",
      answer:
        "Form validation checks whether user input is correct, complete and follows required rules before the data is submitted.",
      tip: "Mention required fields, email validation and password rules."
    },
    {
      question: "How do you improve frontend performance?",
      answer:
        "Frontend performance can be improved by optimizing images, reducing unnecessary renders, using efficient components, minimizing large files and loading resources efficiently.",
      tip: "Give practical examples rather than listing too many techniques."
    }
  ],

  "React Developer": [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces using reusable components.",
      tip: "Mention component-based development."
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that allows developers to write HTML-like markup inside JavaScript code.",
      tip: "Remember that JSX is transformed into JavaScript."
    },
    {
      question: "What is useState?",
      answer:
        "useState is a React Hook that allows functional components to store and update data that can change during the lifetime of the component.",
      tip: "Use a counter or form field as an example."
    },
    {
      question: "What is useEffect?",
      answer:
        "useEffect is a React Hook used for side effects such as fetching data, setting up events or responding to changes in dependencies.",
      tip: "API calls are a common example."
    },
    {
      question: "What are props?",
      answer:
        "Props are values passed from a parent component to a child component. They allow components to receive data from outside.",
      tip: "Props are normally read-only."
    },
    {
      question: "What is component state?",
      answer:
        "State is data managed inside a component that can change over time and cause the component to render again.",
      tip: "Give a simple example such as a form value."
    },
    {
      question: "What is React Router?",
      answer:
        "React Router is used to handle navigation between different pages or views in a React single-page application.",
      tip: "Know routes, navigation and URL paths."
    },
    {
      question: "What is Axios?",
      answer:
        "Axios is a JavaScript HTTP client used to send requests from the frontend to backend APIs.",
      tip: "Mention GET and POST requests."
    },
    {
      question: "What is the Virtual DOM?",
      answer:
        "The Virtual DOM is an in-memory representation of the UI that React uses to efficiently determine which parts of the actual DOM need updating.",
      tip: "Focus on efficient UI updates."
    },
    {
      question: "What is conditional rendering?",
      answer:
        "Conditional rendering means displaying different UI elements depending on a condition or application state.",
      tip: "Examples include login state or loading indicators."
    },
    {
      question: "What are keys in React lists?",
      answer:
        "Keys are unique values assigned to elements in a list so React can identify which items have changed, been added or removed.",
      tip: "Use a stable unique identifier as a key."
    },
    {
      question: "What is lifting state up?",
      answer:
        "Lifting state up means moving shared state to the nearest common parent component so multiple child components can access or update it.",
      tip: "Use a parent-child example."
    },
    {
      question: "What is a controlled component?",
      answer:
        "A controlled component is a form element whose value is managed by React state.",
      tip: "Forms are the most common example."
    },
    {
      question: "How does React communicate with a backend?",
      answer:
        "React communicates with a backend through HTTP requests to API endpoints, commonly using tools such as fetch or Axios.",
      tip: "Explain the request and response flow."
    },
    {
      question: "Why is React popular?",
      answer:
        "React is popular because it supports reusable components, efficient UI updates, a large ecosystem and flexible development of interactive web applications.",
      tip: "Keep your answer practical."
    }
  ],

  "Backend Developer": [
    {
      question: "What is Node.js?",
      answer:
        "Node.js is a JavaScript runtime that allows JavaScript to run outside the browser and is commonly used for backend applications and APIs.",
      tip: "Do not call Node.js a programming language."
    },
    {
      question: "What is Express.js?",
      answer:
        "Express.js is a web framework for Node.js that simplifies creating servers, routes, APIs and middleware.",
      tip: "Mention routing and middleware."
    },
    {
      question: "What is a REST API?",
      answer:
        "A REST API allows applications to communicate using HTTP methods such as GET, POST, PUT and DELETE.",
      tip: "Know the purpose of each common HTTP method."
    },
    {
      question: "What is middleware?",
      answer:
        "Middleware is a function that runs during the request-response cycle and can be used for authentication, validation, logging and request processing.",
      tip: "Remember request → middleware → route → response."
    },
    {
      question: "What is MongoDB?",
      answer:
        "MongoDB is a NoSQL database that stores data in document-oriented structures.",
      tip: "Know documents and collections."
    },
    {
      question: "What is authentication?",
      answer:
        "Authentication is the process of verifying the identity of a user, usually through credentials such as email and password.",
      tip: "Do not confuse authentication with authorization."
    },
    {
      question: "What is authorization?",
      answer:
        "Authorization determines what an authenticated user is allowed to access or perform.",
      tip: "Authentication asks who you are; authorization asks what you can do."
    },
    {
      question: "What is JWT?",
      answer:
        "JWT, or JSON Web Token, is a token format commonly used to securely represent information and maintain authentication between a client and server.",
      tip: "Know the basic token-based authentication flow."
    },
    {
      question: "What is an HTTP status code?",
      answer:
        "An HTTP status code tells the client the result of a server request, such as 200 for success, 404 for not found and 500 for a server error.",
      tip: "Know common 2xx, 4xx and 5xx codes."
    },
    {
      question: "What is CRUD?",
      answer:
        "CRUD stands for Create, Read, Update and Delete. These are the four basic operations commonly performed on stored data.",
      tip: "Connect CRUD operations with API methods."
    },
    {
      question: "What is an environment variable?",
      answer:
        "An environment variable stores configuration values outside the main source code, such as database URLs, ports or secret keys.",
      tip: "Mention .env files carefully and never expose secrets."
    },
    {
      question: "How does the frontend communicate with the backend?",
      answer:
        "The frontend sends HTTP requests to backend API endpoints. The backend processes the request and sends a response containing the required data or status.",
      tip: "Explain the request-response cycle."
    },
    {
      question: "What is error handling?",
      answer:
        "Error handling is the process of detecting, managing and responding to errors so that an application can behave safely and provide useful feedback.",
      tip: "Mention try-catch and proper HTTP responses."
    },
    {
      question: "What is API validation?",
      answer:
        "API validation checks incoming data to ensure it has the correct format, required fields and acceptable values before processing it.",
      tip: "Validation helps prevent incorrect or unsafe data."
    },
    {
      question: "How can backend performance be improved?",
      answer:
        "Backend performance can be improved through efficient database queries, caching, pagination, optimized code, proper indexing and reducing unnecessary processing.",
      tip: "Give two or three practical examples."
    }
  ],

  "MERN Stack Developer": [
    {
      question: "What is MERN?",
      answer:
        "MERN stands for MongoDB, Express.js, React and Node.js. React handles the frontend, Node.js and Express handle the backend, and MongoDB handles data storage.",
      tip: "Know the role of all four technologies."
    },
    {
      question: "Why is MERN useful for web development?",
      answer:
        "MERN allows developers to use JavaScript throughout the application and provides technologies for frontend development, backend APIs and database management.",
      tip: "Explain the complete stack."
    },
    {
      question: "What is MongoDB?",
      answer:
        "MongoDB is a NoSQL database that stores information in flexible document-based structures.",
      tip: "Mention collections and documents."
    },
    {
      question: "What is Express?",
      answer:
        "Express is a Node.js web framework used to create backend servers, routes, APIs and middleware.",
      tip: "Mention its role in the backend."
    },
    {
      question: "What is Node.js?",
      answer:
        "Node.js is a JavaScript runtime that allows JavaScript to execute outside the browser and is commonly used for backend development.",
      tip: "Runtime, not programming language."
    },
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used to create interactive user interfaces using reusable components.",
      tip: "Mention component-based architecture."
    },
    {
      question: "How does data flow in a MERN application?",
      answer:
        "React sends a request to the Express and Node.js backend. The backend processes the request and communicates with MongoDB when necessary. The result is then returned to React.",
      tip: "Remember: React → Backend → Database → Backend → React."
    },
    {
      question: "What is Mongoose?",
      answer:
        "Mongoose is an ODM library for MongoDB and Node.js that provides schemas, models and methods for working with MongoDB data.",
      tip: "Remember schemas and models."
    },
    {
      question: "What is an API endpoint?",
      answer:
        "An API endpoint is a specific URL through which a client can communicate with a backend service to perform an operation or retrieve data.",
      tip: "Think of endpoints as entry points to backend functionality."
    },
    {
      question: "What is CRUD in a MERN application?",
      answer:
        "CRUD represents Create, Read, Update and Delete operations performed through frontend requests, backend APIs and database operations.",
      tip: "Connect CRUD with HTTP methods."
    },
    {
      question: "How does React communicate with Node.js?",
      answer:
        "React communicates with Node.js through HTTP requests to Express API endpoints, usually using fetch or Axios.",
      tip: "Explain request and response."
    },
    {
      question: "What is middleware in a MERN application?",
      answer:
        "Middleware is code that runs between receiving a request and sending a response. It can handle authentication, validation, logging and other processing.",
      tip: "Mention Express middleware."
    },
    {
      question: "What is the difference between SQL and MongoDB?",
      answer:
        "SQL databases generally use structured tables and relationships, while MongoDB is a NoSQL database that stores flexible document-based data.",
      tip: "Keep the comparison simple."
    },
    {
      question: "What is authentication in a MERN application?",
      answer:
        "Authentication verifies a user's identity. A MERN application can use login credentials and token-based methods such as JWT to maintain authenticated sessions.",
      tip: "Know login → token → protected request flow."
    },
    {
      question: "What are the advantages of the MERN stack?",
      answer:
        "MERN provides a modern JavaScript-based stack, reusable frontend components, flexible database storage and a large ecosystem for building full-stack web applications.",
      tip: "Mention JavaScript across the stack."
    }
  ],

  "Data Analyst": [
    {
      question: "What is data analysis?",
      answer:
        "Data analysis is the process of collecting, cleaning and examining data to find useful information and patterns that support decision-making.",
      tip: "Focus on finding useful insights."
    },
    {
      question: "What is SQL?",
      answer:
        "SQL stands for Structured Query Language and is used to store, retrieve, manipulate and analyze data in relational databases.",
      tip: "Prepare SELECT, WHERE, GROUP BY, ORDER BY and JOIN."
    },
    {
      question: "What is data cleaning?",
      answer:
        "Data cleaning involves identifying and correcting missing, duplicate, incorrect or inconsistent data before analysis.",
      tip: "Give a simple real-world example."
    },
    {
      question: "What is data visualization?",
      answer:
        "Data visualization is the graphical representation of information using charts, graphs and dashboards so patterns and trends are easier to understand.",
      tip: "Know bar, line and pie charts."
    },
    {
      question: "What is the difference between WHERE and HAVING?",
      answer:
        "WHERE filters individual rows before grouping, while HAVING filters groups after GROUP BY is applied.",
      tip: "This is a common SQL question."
    },
    {
      question: "What is an INNER JOIN?",
      answer:
        "An INNER JOIN returns records that have matching values in both tables involved in the join.",
      tip: "Practice simple two-table examples."
    },
    {
      question: "What is a primary key?",
      answer:
        "A primary key is a column or combination of columns that uniquely identifies each record in a relational database table.",
      tip: "Remember uniqueness."
    },
    {
      question: "What is Excel used for in data analysis?",
      answer:
        "Excel is commonly used for data cleaning, calculations, sorting, filtering, pivot tables, charts and basic analysis.",
      tip: "Know basic formulas and pivot tables."
    },
    {
      question: "What is a pivot table?",
      answer:
        "A pivot table is a tool used to summarize, organize and analyze large amounts of data by categories and calculations.",
      tip: "Think of it as a quick way to summarize data."
    },
    {
      question: "What is Python used for in data analysis?",
      answer:
        "Python can be used for data cleaning, transformation, statistical analysis, visualization and automation using libraries such as Pandas and NumPy.",
      tip: "Know the basic purpose of Pandas."
    },
    {
      question: "What is Pandas?",
      answer:
        "Pandas is a Python library used for data manipulation and analysis. It provides structures such as DataFrames for working with tabular data.",
      tip: "Know DataFrame and Series."
    },
    {
      question: "What is an outlier?",
      answer:
        "An outlier is a data value that is significantly different from most other values in a dataset.",
      tip: "Understand how outliers can affect analysis."
    },
    {
      question: "What is missing data?",
      answer:
        "Missing data occurs when some expected values are not available in a dataset. It may be handled by removing, replacing or estimating values depending on the situation.",
      tip: "Do not automatically delete missing values."
    },
    {
      question: "What is correlation?",
      answer:
        "Correlation measures the strength and direction of a relationship between two variables.",
      tip: "Correlation does not necessarily mean causation."
    },
    {
      question: "Which tools are commonly used by data analysts?",
      answer:
        "Common tools include Excel, SQL, Python, Power BI, Tableau and libraries such as Pandas and NumPy.",
      tip: "Only mention tools you have actually practiced."
    }
  ],

  "Java Developer": [
    {
      question: "What is Java?",
      answer:
        "Java is a high-level, object-oriented programming language designed to be platform independent.",
      tip: "Remember the JVM concept."
    },
    {
      question: "What are the four pillars of OOP?",
      answer:
        "The four pillars are encapsulation, inheritance, polymorphism and abstraction.",
      tip: "Prepare one example of each."
    },
    {
      question: "What is inheritance?",
      answer:
        "Inheritance allows one class to acquire properties and methods from another class, helping with code reuse.",
      tip: "Know the extends keyword."
    },
    {
      question: "What is exception handling?",
      answer:
        "Exception handling is used to handle runtime errors using mechanisms such as try, catch, finally and throw.",
      tip: "Practice a simple example."
    },
    {
      question: "What is the JVM?",
      answer:
        "JVM stands for Java Virtual Machine. It executes Java bytecode and helps Java achieve platform independence.",
      tip: "Java code → bytecode → JVM."
    },
    {
      question: "What is the JDK?",
      answer:
        "JDK stands for Java Development Kit. It contains tools required to develop, compile and run Java applications.",
      tip: "JDK is for development."
    },
    {
      question: "What is the JRE?",
      answer:
        "JRE stands for Java Runtime Environment and provides the environment and libraries needed to run Java applications.",
      tip: "JRE is mainly for running Java programs."
    },
    {
      question: "What is a class?",
      answer:
        "A class is a blueprint that defines properties and methods that objects created from the class can have.",
      tip: "Think of a class as a blueprint."
    },
    {
      question: "What is an object?",
      answer:
        "An object is an instance of a class that contains its own state and can use the methods defined by the class.",
      tip: "Class is the blueprint; object is the instance."
    },
    {
      question: "What is method overloading?",
      answer:
        "Method overloading occurs when multiple methods have the same name but different parameter lists within a class.",
      tip: "It is an example of compile-time polymorphism."
    },
    {
      question: "What is method overriding?",
      answer:
        "Method overriding occurs when a child class provides its own implementation of a method inherited from its parent class.",
      tip: "It is associated with runtime polymorphism."
    },
    {
      question: "What is encapsulation?",
      answer:
        "Encapsulation means combining data and methods inside a class and controlling access to the data using access modifiers.",
      tip: "Private variables with public methods are a common example."
    },
    {
      question: "What is an interface?",
      answer:
        "An interface defines a contract that classes can implement. It is commonly used to support abstraction and flexible design.",
      tip: "Know the implements keyword."
    },
    {
      question: "What is a constructor?",
      answer:
        "A constructor is a special method-like member used to initialize objects when they are created.",
      tip: "Know that constructors have the same name as the class."
    },
    {
      question: "Why is Java platform independent?",
      answer:
        "Java source code is compiled into bytecode, which can run on any platform that has a compatible Java Virtual Machine.",
      tip: "Remember 'write once, run anywhere.'"
    }
  ],

  "Python Developer": [
    {
      question: "What is Python?",
      answer:
        "Python is a high-level, interpreted programming language known for its simple syntax and wide range of libraries.",
      tip: "Mention readability and versatility."
    },
    {
      question: "What is a list in Python?",
      answer:
        "A list is a mutable collection used to store multiple values in an ordered sequence.",
      tip: "Lists can be changed."
    },
    {
      question: "What is a tuple?",
      answer:
        "A tuple is an ordered collection that is immutable, meaning its elements cannot be changed after creation.",
      tip: "Compare it with a list."
    },
    {
      question: "What is a dictionary?",
      answer:
        "A dictionary stores data as key-value pairs and is useful for representing structured information.",
      tip: "Example: name → John."
    },
    {
      question: "What is exception handling in Python?",
      answer:
        "Python uses try, except, else and finally blocks to handle errors and prevent the program from terminating unexpectedly.",
      tip: "Practice a simple try-except example."
    },
    {
      question: "What is a function?",
      answer:
        "A function is a reusable block of code that performs a specific task and can accept parameters and return a value.",
      tip: "Know how to define a function using def."
    },
    {
      question: "What is a set?",
      answer:
        "A set is an unordered collection of unique elements.",
      tip: "Sets automatically remove duplicate values."
    },
    {
      question: "What is a variable in Python?",
      answer:
        "A variable is a name used to refer to a value or object stored during program execution.",
      tip: "Python uses dynamic typing."
    },
    {
      question: "What is a loop?",
      answer:
        "A loop repeatedly executes a block of code. Python commonly uses for and while loops.",
      tip: "Practice both types."
    },
    {
      question: "What is list comprehension?",
      answer:
        "List comprehension provides a concise way to create a list by applying an expression to items in an iterable.",
      tip: "Practice a simple filtering example."
    },
    {
      question: "What is a module?",
      answer:
        "A module is a Python file containing code such as functions, classes or variables that can be imported into another program.",
      tip: "Know the import statement."
    },
    {
      question: "What is object-oriented programming in Python?",
      answer:
        "Object-oriented programming organizes code using classes and objects and supports concepts such as inheritance, encapsulation and polymorphism.",
      tip: "Prepare a simple class example."
    },
    {
      question: "What is the difference between == and is?",
      answer:
        "The == operator checks whether two values are equal, while is checks whether two references point to the same object.",
      tip: "Do not treat them as identical."
    },
    {
      question: "What is a lambda function?",
      answer:
        "A lambda function is a small anonymous function that can be written in a single expression.",
      tip: "Know the basic syntax."
    },
    {
      question: "Why is Python popular?",
      answer:
        "Python is popular because it has simple syntax, a large ecosystem of libraries and applications across web development, automation, data analysis and machine learning.",
      tip: "Mention the area you are interested in."
    }
  ],

  "Web Developer": [
    {
      question: "What is semantic HTML?",
      answer:
        "Semantic HTML uses meaningful elements such as header, nav, section, article and footer to describe the structure of content.",
      tip: "Mention readability and accessibility."
    },
    {
      question: "What is responsive web design?",
      answer:
        "Responsive web design allows websites to adapt to different screen sizes using flexible layouts and responsive techniques.",
      tip: "Mention mobile, tablet and desktop."
    },
    {
      question: "What is CSS Flexbox?",
      answer:
        "Flexbox is a CSS layout system used to arrange elements efficiently in rows or columns and control alignment and spacing.",
      tip: "Know justify-content and align-items."
    },
    {
      question: "What is CSS Grid?",
      answer:
        "CSS Grid is a two-dimensional CSS layout system that works with rows and columns.",
      tip: "Know when Grid is useful."
    },
    {
      question: "What is JavaScript used for?",
      answer:
        "JavaScript adds logic and interactivity to web applications and can also be used for server-side development.",
      tip: "Give practical examples."
    },
    {
      question: "What is an HTML form?",
      answer:
        "An HTML form allows users to enter and submit information such as names, emails, passwords and other data.",
      tip: "Know common input types."
    },
    {
      question: "What is form validation?",
      answer:
        "Form validation checks whether submitted information meets required rules before processing it.",
      tip: "Mention required fields and valid formats."
    },
    {
      question: "What is the difference between frontend and backend?",
      answer:
        "Frontend development focuses on the user interface, while backend development handles server-side logic, APIs, authentication and data processing.",
      tip: "Use a simple website example."
    },
    {
      question: "What is an API?",
      answer:
        "An API provides a way for different software components to communicate and exchange data.",
      tip: "Mention REST APIs."
    },
    {
      question: "What is HTTP?",
      answer:
        "HTTP is a protocol used for communication between clients and servers on the web.",
      tip: "Know GET, POST, PUT and DELETE."
    },
    {
      question: "What is accessibility in web development?",
      answer:
        "Web accessibility means designing websites so that people with different abilities can use them effectively.",
      tip: "Mention semantic HTML and accessible forms."
    },
    {
      question: "What is SEO?",
      answer:
        "SEO, or Search Engine Optimization, involves improving a website so search engines can better understand and rank its content.",
      tip: "Mention meaningful content and HTML structure."
    },
    {
      question: "What is browser caching?",
      answer:
        "Browser caching allows commonly used resources to be stored locally so they can load faster on future visits.",
      tip: "Caching improves performance."
    },
    {
      question: "What is a cookie?",
      answer:
        "A cookie is a small piece of data stored by a website in the user's browser and can be used for preferences, sessions and other purposes.",
      tip: "Know that cookies can contain sensitive information and should be handled carefully."
    },
    {
      question: "How do you make a website user-friendly?",
      answer:
        "A user-friendly website should have clear navigation, readable content, consistent design, responsive layouts, helpful feedback and simple interactions.",
      tip: "Focus on the user's experience."
    }
  ],

  "JavaScript Developer": [
    {
      question: "What is JavaScript?",
      answer:
        "JavaScript is a programming language commonly used to create interactive web applications and can also run on servers using Node.js.",
      tip: "Know both frontend and backend use."
    },
    {
      question: "What is an arrow function?",
      answer:
        "An arrow function is a shorter syntax for writing functions in JavaScript and has different behavior for the this keyword.",
      tip: "Know the basic syntax."
    },
    {
      question: "What is an array?",
      answer:
        "An array is a data structure used to store multiple values in an ordered collection.",
      tip: "Know map, filter, find and forEach."
    },
    {
      question: "What is an object?",
      answer:
        "An object is a collection of key-value pairs used to represent structured data.",
      tip: "Practice creating and accessing object properties."
    },
    {
      question: "What is a Promise?",
      answer:
        "A Promise represents the eventual completion or failure of an asynchronous operation.",
      tip: "Know pending, fulfilled and rejected states."
    },
    {
      question: "What is async/await?",
      answer:
        "async/await provides a cleaner way to work with Promises and asynchronous operations.",
      tip: "Connect it with API requests."
    },
    {
      question: "What is the difference between let, const and var?",
      answer:
        "var is function-scoped, while let and const are block-scoped. let can be reassigned, while const cannot be reassigned.",
      tip: "Focus on scope."
    },
    {
      question: "What is scope?",
      answer:
        "Scope determines where a variable can be accessed in a program.",
      tip: "Know global, function and block scope."
    },
    {
      question: "What is hoisting?",
      answer:
        "Hoisting is JavaScript's behavior of processing certain declarations before executing code in their scope.",
      tip: "Understand how var, let and const differ."
    },
    {
      question: "What is the DOM?",
      answer:
        "The DOM represents an HTML document as a tree of objects that JavaScript can access and modify.",
      tip: "Know common DOM methods."
    },
    {
      question: "What is event bubbling?",
      answer:
        "Event bubbling occurs when an event triggered on a child element propagates upward through its parent elements.",
      tip: "Understand event propagation."
    },
    {
      question: "What is JSON?",
      answer:
        "JSON stands for JavaScript Object Notation and is a lightweight text format commonly used for exchanging structured data.",
      tip: "Know JSON.parse and JSON.stringify."
    },
    {
      question: "What is destructuring?",
      answer:
        "Destructuring allows values to be extracted from arrays or properties from objects into variables using concise syntax.",
      tip: "Practice object and array destructuring."
    },
    {
      question: "What is the spread operator?",
      answer:
        "The spread operator (...) expands elements of an iterable or properties of an object into another array or object.",
      tip: "It is commonly used for copying and combining data."
    },
    {
      question: "How do you handle errors in JavaScript?",
      answer:
        "Errors can be handled using techniques such as try-catch, Promise rejection handling and proper validation.",
      tip: "Practice handling API errors."
    }
  ],

  "Database Developer": [
    {
      question: "What is a database?",
      answer:
        "A database is an organized collection of data that allows applications to store, retrieve and manage information efficiently.",
      tip: "Know SQL and NoSQL basics."
    },
    {
      question: "What is MongoDB?",
      answer:
        "MongoDB is a NoSQL document database that stores data in flexible JSON-like documents.",
      tip: "Mention collections and documents."
    },
    {
      question: "What is a MongoDB collection?",
      answer:
        "A collection is a group of MongoDB documents and is roughly comparable to a table in a relational database.",
      tip: "Document is roughly comparable to a row."
    },
    {
      question: "What is a primary key?",
      answer:
        "A primary key uniquely identifies each record in a relational database table.",
      tip: "Remember uniqueness."
    },
    {
      question: "What is a foreign key?",
      answer:
        "A foreign key is a column used to establish a relationship between records in different relational database tables.",
      tip: "Understand table relationships."
    },
    {
      question: "What is SQL?",
      answer:
        "SQL is a language used to store, retrieve, manipulate and analyze data in relational databases.",
      tip: "Practice basic queries."
    },
    {
      question: "What is normalization?",
      answer:
        "Normalization is the process of organizing relational database tables to reduce data duplication and improve data consistency.",
      tip: "Know the basic idea rather than memorizing definitions."
    },
    {
      question: "What is an index?",
      answer:
        "A database index is a data structure that helps the database find records more efficiently.",
      tip: "Indexes improve reads but can have storage and write costs."
    },
    {
      question: "What is a query?",
      answer:
        "A query is a request made to a database to retrieve, modify or manage data.",
      tip: "SQL SELECT is a common example."
    },
    {
      question: "What is CRUD?",
      answer:
        "CRUD stands for Create, Read, Update and Delete, representing common operations performed on stored data.",
      tip: "Know how CRUD maps to application operations."
    },
    {
      question: "What is a database schema?",
      answer:
        "A database schema defines how data is organized, including structures, fields, relationships and constraints.",
      tip: "Schemas help maintain consistent data."
    },
    {
      question: "What is a transaction?",
      answer:
        "A transaction is a group of database operations treated as a logical unit of work.",
      tip: "Know the idea of all-or-nothing operations."
    },
    {
      question: "What is a NoSQL database?",
      answer:
        "A NoSQL database is a non-relational database designed to store data using models such as documents, key-value pairs or graphs.",
      tip: "MongoDB is a document-oriented NoSQL database."
    },
    {
      question: "What is database backup?",
      answer:
        "A database backup is a copy of stored data that can be used to recover information if the original data is lost or damaged.",
      tip: "Backups are important for reliability."
    },
    {
      question: "How do you maintain database security?",
      answer:
        "Database security can be improved through authentication, authorization, strong access controls, encryption, secure configuration and regular backups.",
      tip: "Never expose database credentials."
    }
  ]
};

/* =========================================================
   ROLE NORMALIZATION
========================================================= */

const normalizeRole = (role) => {
  if (!role) return "MERN Stack Developer";

  const cleanRole = role.toLowerCase().trim();

  if (cleanRole.includes("react")) return "React Developer";

  if (
    cleanRole.includes("frontend") ||
    cleanRole.includes("front-end")
  ) {
    return "Frontend Developer";
  }

  if (
    cleanRole.includes("backend") ||
    cleanRole.includes("back-end")
  ) {
    return "Backend Developer";
  }

  if (cleanRole.includes("mern")) return "MERN Stack Developer";

  if (cleanRole.includes("data")) return "Data Analyst";

  if (cleanRole.includes("java")) return "Java Developer";

  if (cleanRole.includes("python")) return "Python Developer";

  if (cleanRole.includes("database")) return "Database Developer";

  if (cleanRole.includes("javascript")) return "JavaScript Developer";

  if (cleanRole.includes("web")) return "Web Developer";

  return "MERN Stack Developer";
};

/* =========================================================
   COMPONENT
========================================================= */

const InterviewPrep = () => {
  const [section, setSection] = useState("common");
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [recommendedRole, setRecommendedRole] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    try {
      const latestAnalysis = JSON.parse(
        sessionStorage.getItem("latestAnalysis")
      );

      const storedRole =
        latestAnalysis?.role ||
        sessionStorage.getItem("careerRole");

      if (storedRole) {
        setRecommendedRole(normalizeRole(storedRole));
      }
    } catch (error) {
      console.log("Could not load recommended role:", error);
    }
  }, []);

  const getQuestions = () => {
    if (section === "common") {
      return commonQuestions;
    }

    if (section === "recommended") {
      return (
        roleQuestions[recommendedRole] ||
        roleQuestions["MERN Stack Developer"]
      );
    }

    return roleQuestions[selectedRole] || [];
  };

  const questions = getQuestions();
  const currentQuestion = questions[questionIndex];

  const changeSection = (newSection) => {
    setSection(newSection);
    setQuestionIndex(0);
  };

  const changeRole = (event) => {
    setSelectedRole(event.target.value);
    setQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((previous) => previous - 1);
    }
  };

  return (
    <div className="interview-page">
      <Sidebar />

      <main className="interview-content">

        {/* HEADER */}

        <div className="interview-header">
          <span className="interview-label">
            <FaBookOpen /> Student Preparation
          </span>

          <h1>Interview Preparation</h1>

          <p>
            Learn common interview questions, prepare for your job role,
            and get ready for your next interview.
          </p>
        </div>

        {/* MAIN OPTIONS */}

        <div className="interview-options">

          <button
            className={`prep-option ${
              section === "common" ? "active" : ""
            }`}
            onClick={() => changeSection("common")}
          >
            <div className="option-icon">
              <FaUserTie />
            </div>

            <div>
              <h3>Common Interview Questions</h3>
              <p>
                Learn the basic HR and personal questions asked in most
                interviews.
              </p>
            </div>
          </button>

          <button
            className={`prep-option ${
              section === "role" ? "active" : ""
            }`}
            onClick={() => changeSection("role")}
          >
            <div className="option-icon">
              <FaCode />
            </div>

            <div>
              <h3>Prepare by Job Role</h3>
              <p>
                Select your desired job role and practice technical questions.
              </p>
            </div>
          </button>

          {recommendedRole && (
            <button
              className={`prep-option recommended-option ${
                section === "recommended" ? "active" : ""
              }`}
              onClick={() => changeSection("recommended")}
            >
              <div className="option-icon">
                <FaStar />
              </div>

              <div>
                <h3>Recommended for You</h3>
                <p>
                  Based on your resume analysis:{" "}
                  <strong>{recommendedRole}</strong>
                </p>
              </div>
            </button>
          )}

        </div>

        {/* ROLE SELECTOR */}

        {section === "role" && (
          <div className="role-selector">
            <label htmlFor="jobRole">
              <FaBriefcase /> Select Your Job Role
            </label>

            <select
              id="jobRole"
              value={selectedRole}
              onChange={changeRole}
            >
              {Object.keys(roleQuestions).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* RECOMMENDED MESSAGE */}

        {section === "recommended" && recommendedRole && (
          <div className="recommended-banner">
            <FaStar />

            <div>
              <strong>Recommended Interview Preparation</strong>

              <p>
                Your resume analysis recommends{" "}
                <strong>{recommendedRole}</strong>. These questions will help
                you prepare for this role.
              </p>
            </div>
          </div>
        )}

        {/* QUESTION */}

        {currentQuestion && (
          <section className="interview-question-card">

            <div className="question-header">
              <span>
                Question {questionIndex + 1} of {questions.length}
              </span>

              <span>
                {section === "common"
                  ? "Common Interview"
                  : section === "recommended"
                  ? recommendedRole
                  : selectedRole}
              </span>
            </div>

            <div className="question-progress">
              <div
                style={{
                  width: `${
                    ((questionIndex + 1) / questions.length) * 100
                  }%`
                }}
              />
            </div>

            <div className="question-content">

              <h2>{currentQuestion.question}</h2>

              <div className="answer-box">
                <div className="answer-title">
                  <FaBookOpen />
                  Sample Answer
                </div>

                <p>{currentQuestion.answer}</p>
              </div>

              <div className="tip-box">
                <FaLightbulb />

                <div>
                  <strong>Interview Tip</strong>

                  <p>{currentQuestion.tip}</p>
                </div>
              </div>

            </div>

            <div className="question-navigation">

              <button
                onClick={previousQuestion}
                disabled={questionIndex === 0}
              >
                <FaArrowLeft /> Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={questionIndex === questions.length - 1}
              >
                Next <FaArrowRight />
              </button>

            </div>

          </section>
        )}

        {/* FOOTER */}

        <div className="learning-note">
          <FaLightbulb />

          <p>
            <strong>Remember:</strong> Don't memorize the sample answers
            word-for-word. Understand the idea and answer naturally using
            your own experience.
          </p>
        </div>

      </main>
    </div>
  );
};

export default InterviewPrep;