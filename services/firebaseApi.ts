import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import {database} from '../firebase.config';
import { Project } from "../src/models/project.model";

export function firebaseApi() {
  const projectsCollectionRef = collection(database, "projects");

  const createProject = async (project: Project) => {
    await addDoc(projectsCollectionRef, project);
    console.log("project: ", project);
    console.log("project created");
  };

  return {
    createProject,
  };
}