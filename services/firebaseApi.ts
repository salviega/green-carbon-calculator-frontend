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

  const getAllProjects = async () :  Promise<Project[]>  => {
    const data = await getDocs(projectsCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as unknown as Project)) ;
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
  const getProjectsByOwnerAddress = async (address: string): Promise<Project[]> => {
    const item = await getDocs(
      query(projectsCollectionRef, where("ownerWallet", "==", address))
    );

    if (item.docs.length === 0) {
      console.log(`No projects with ownerAddress "${address}" found`);
      return [];
    }

    return item.docs.map((doc) => ({ id: doc.id, ...doc.data() } as unknown as Project));
  };
  const createProject = async (project: Project) => {
    return await addDoc(projectsCollectionRef, project);
  };
  const updateProject = async (project: any) => {
    const userDoc = doc(database, "projects", project.id);
    await updateDoc(userDoc, project);
    console.log("item updated");
  };
  return {
    createProject,
    getProject,
    getProjectById, 
    getProjectsByOwnerAddress,
    updateProject,
    getAllProjects
  };
}