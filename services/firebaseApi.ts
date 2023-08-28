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

  const getAllProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
  const getProject = async (id: string) => {
    const item = await getDoc(doc(database, "projects", id));
    if (item.exists()) {
      return item.data();
    } else {
      console.log("Project doesn't exist");
      return;
    }
  };
  const getProjectById = async (
    id: string
  ): Promise<Project | null> => {
    const item = await getDocs(
      query(collection(database, "projects"), where("project_id", "==", id))
    );

    if (item.docs.length === 0) {
      console.log(`No project with id "${id}" found`);
      return null;
    }

    const doc = item.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Project;
  };
  const createProject = async (project: Project) => {
    return await addDoc(projectsCollectionRef, project);
  };

  return {
    createProject,
    getProject,
    getProjectById
  };
}