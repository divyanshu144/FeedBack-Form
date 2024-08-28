import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

const getForms = async () => {
  const formsCollection = collection(db, "forms");
  const formSnapshot = await getDocs(formsCollection);
  const formList = formSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return formList;
};

const saveForm = async (form) => {
  const formsCollection = collection(db, "forms");
  await addDoc(formsCollection, form);
};

const getFormDetail = async (formId) => {
  const formDoc = doc(db, "forms", formId);
  const formSnapshot = await getDoc(formDoc);
  if (formSnapshot.exists()) {
    return formSnapshot.data();
  }
  return null;
};

const updateForm = async (formId, formData) => {
  try {
      const formRef = doc(db, 'forms', formId);
      await updateDoc(formRef, formData);
      return { id: formId, ...formData };
  } catch (error) {
      console.error('Error updating form:', error);
      throw error;
  }
}

export { getForms, saveForm, getFormDetail, updateForm };
