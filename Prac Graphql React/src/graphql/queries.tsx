import { gql } from "@apollo/client";

export const FIND_ALL_PROJECTS = gql`
  query FindAllProjects {
    findAllProject {
      id
      project_name
      description
      tasks {
        id
        task_name
        description
      }
    }
  }
`;

export const FIND_ALL_TASKS = gql`
  query FindAllTasks {
    findAllTask {
      id
      task_name
      description
    }
  }
`;

export const FIND_PROJECT_BY_ID = gql`
  query findProjectById($id: Int!) {
    findProjectById(id: $id) {
      id
      project_name
      description
      completedPercentage
    }
  }
`;

export const FIND_TASK_BY_ID = gql`
  query FindTaskById($id: Int!) {
    findTaskById(id: $id) {
      id
      task_name
      description
      # status
      # taskUsers {
      #   id
      #   name
      #   email
      # }
    }
  }
`;

export const FIND_ALL_USER_TASKS = gql`
  query FindAllUserTask {
    findAllUserTask {
      id
      task_status
      task_priority
      task{
        projectId
        task_name
        description
        project {
        project_name
        description
      }
    }
      user {
        id
        email
      }
    }
  }
`;

export const FIND_USER_TASK_BY_ID = gql`
  query FindUserTaskById($id: Int!) {
    findUserTaskById(id: $id) {
      id
      task_status
      task_priority
      # task {
      #   id
      #   task_name
      #   description
      # }
      # user {
      #   id
      #   name
      #   email
      # }
    }
  }
`;
