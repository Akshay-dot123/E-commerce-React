import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProject: CreateProjectInput!) {
    createProject(createProject: $createProject) {
      id
      project_name
      description
      users {
        id
        role
        email
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      id
      project_name
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($createTask: CreateTaskInput!) {
    createTask(createTask: $createTask) {
      id
      task_name
      description
      # Fix:-
      # users{
      #   id
      #   role
      #   email
      # }
    }
  }
`;


export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTask: UpdateTaskInput!) {
    updateTask(updateAdminTlTask: $updateTask) {
      id
      task_name
      description
    }
  }
`;

export const UPDATE_MEMBER_TASK = gql`
  mutation UpdateMemberTask($updateMemberTask: UpdateTaskMemberInput!) {
    updateMemberTask(updateMemberTask: $updateMemberTask) {
      id
      task_status
      task_priority
    }
  }
`;

export const DELETE_TASK= gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const DELETE_TASK_USER = gql`
  mutation DeleteTaskUser($id: Int!) {
    deleteTaskUser(id: $id) {
      id
    }
  }
`;