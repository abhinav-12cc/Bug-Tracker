# Bug/Task Tracker Interface

## Project Objective

This project is a web-based Bug/Task Tracker application designed to demonstrate frontend development skills, UI/UX design sensibilities, and proficiency with the Next.js/ReactJS framework. The application provides core functionalities for task management, user authentication, and time tracking.

## Features & Requirements

### 1. User Authentication/Role

- **Mock Login System**: Implemented a simple login system using hardcoded credentials for demonstration purposes.
- **Redirection**: On successful login, users are redirected to the dashboard.
- **User Roles**: Supports two distinct roles: **Developer** and **Manager**.
  - **Manager Credentials**:
    - Email: `manager@example.com`
    - Password: `manager123`
  - **Developer Credentials**:
    - Email: `abhinavsrivastava103@gmail.com`
    - Password: `Abhinik123@`
    - Email: `harshsrivastava621@gmail.com`
    - Password: `Luvyou123@`
    - Email: `ratankumarsingh@gmail.com`
    - Password: `Test@123`

### 2. Task/Bug Management

- **Task Creation**:
  - Managers can create new tasks/bugs with fields such as:
    - **Title**
    - **Description**
    - **Priority**
    - **Status** (defaults to 'OPEN')
    - **Assigned to** (Dropdown list of all registered developers)
    - **Due Date**
    - **Estimated Hours**
  - The "Create Task" button is exclusively visible to **Manager** roles.
- **Task Visibility**: All users (Developers and Managers) can view all tasks in the dashboard list.
- **Task Editing & Deletion**:
  - Managers can edit and delete any task.
  - The assignee developer can edit their assigned tasks.
- **Status Workflow**:

  - Tasks progress through statuses: `OPEN` → `IN_PROGRESS` → `PENDING_APPROVAL` → (`CLOSED` or `REOPENED`).
  - **"Start Work"**: Developers can move an `OPEN` task to `IN_PROGRESS` (visible only to the assigned developer).
  - **"Mark as Complete"**: Developers can set an `IN_PROGRESS` task to `PENDING_APPROVAL` (visible only to the assigned developer).
  - **Manager Approval**: Managers can `Approve` (move to `CLOSED`) or `Reopen` a `PENDING_APPROVAL` task.

- **Filtering & Sorting**: Tasks can be filtered by `Priority` and `Status`, and sorted by `Created Date` or `Priority`.

### 3. Time Tracker

- **Time Logging**: Users can log time spent on tasks (visible only to the assigned developer for their `IN_PROGRESS` tasks).
- **Total Time Display**: Total time spent is displayed for each task.
- **Manager View**: Managers can view time spent by all developers on all tasks within the dedicated "Time Tracking" section. Developers can only view their own.

### 4. UI/UX

- **Clean and Intuitive Interface**: Focus on a modern, user-friendly design.
- **Responsive Design**: The application is designed to work well on desktop and is optimized for basic mobile compatibility.
- **Component Library**: Utilizes `shadcn/ui` for accessible and customizable UI components.

### 5. Technology Stack

- **Frontend Framework**: Next.js (React.js)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with persistence in `localStorage` for authentication and tasks)
- **Charting**: Recharts (for Dashboard task trends)

## Deliverables

- **GitHub Repository**: This repository contains the full source code.
- **README File**: This document provides instructions and project details.
- **Working Demo Link**: (Placeholder - to be provided upon deployment)
- **Video Recording Link**: (Placeholder - to be provided upon showcasing the app)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME # Replace with your actual repository name (e.g., bug-tracker)
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be automatically redirected to the login page.

## Assumptions Made

- **Mock Authentication**: User authentication is handled via hardcoded mock data for simplicity, without a real backend or database.
- **Local State Persistence**: All application data (users, tasks, time entries) is managed in the browser's `localStorage` using Zustand, meaning data persists across sessions on the same browser but is not shared across devices or users.
- **No Backend API**: The application is purely frontend; there are no API calls to a server for data operations.

## Areas to Highlight

- **Client-Side Rendering**: Extensive use of `"use client"` directive for interactive components leveraging React Hooks (useState, useEffect, useRouter) and Zustand for state management.
- **Reusable UI Components**: Leverages `shadcn/ui` for building consistent and accessible UI components.
- **Responsive Design**: Implemented using Tailwind CSS utility classes to ensure a good user experience across various screen sizes.
- **Zustand for State Management**: Efficient and flexible state management for authentication and task data, including persistence.
- **Dynamic Data Visualization**: Integration of Recharts for dynamic task trend visualizations on the dashboard.
- **Role-Based Access Control (Frontend)**: Logic implemented to conditionally render UI elements and restrict actions based on user roles (Developer/Manager).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
