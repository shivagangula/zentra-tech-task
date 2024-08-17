# Zentratech Task

## Overview

This project is divided into three main features: user onboarding, interest acceptance or rejection, and chatting. I am not a full-stack developer by profession, but as a professional developer, I strive to give my best in all that I do

## Development Approach

### Tasks
1. **User Onboarding**: Implemented with a focus on simplicity.
2. **Interest Acceptance/Rejection**: Basic functionality implemented; enhancements needed.
3. **Chatting Feature**: Not completed due to time constraints.

### Technologies Used
- **Backend**: Django, Django REST Framework, SQLite3
- **Frontend**: ReactJS, Ant Design (AntD)

### Frontend UI
- **Left Side**: Tabs for users management.
- **Right Side**: User information and chatting features.


## Pending
- **Chatting Feature**: Incomplete.
- **Documentation**: Lacks proper documentation for both frontend and backend.
- **Test Cases**: Not written.

## Enhancements Needed
- **Data Normalization**: Improve data handling in the backend.
- **Query Optimization**: Enhance performance, especially for large datasets.
- **Caching**: Implement caching to improve client fetching speeds.
- **State Management**: Consider using Zustand to manage state and optimize backend calls.
- **Naming Conventions**: Revise API URLs and function names for consistency.

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/shivagangula/zentra-tech-task.git
cd zentra-tech-task
```
### For backend Setup

```bash
cd zentra-tech-task

#create virtual env
python3 -m venv env 

# activate virtual env
source env/bin/activate 

#install dependencys
pip3 install -r requirements.txt 

#start backend server
python3 manage.py runserver  
```

### For Frontend Setup
```bash
cd frontend

#install dependencys
npm i 

#start backend server
npm run start:local  

```
