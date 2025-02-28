import { ExcalidrawElement } from "../../element/types";
import { AppState } from "../../types";
import {
  clearAppStateForLocalStorage,
  getDefaultAppState,
} from "../../appState";
import { clearElementsForLocalStorage } from "../../element";
import { STORAGE_KEYS as APP_STORAGE_KEYS } from "../../constants";

export const STORAGE_KEYS = {
  LOCAL_STORAGE_ELEMENTS: "excalidraw",
  LOCAL_STORAGE_APP_STATE: "excalidraw-state",
  LOCAL_STORAGE_COLLAB: "excalidraw-collab",
  LOCAL_STORAGE_KEY_COLLAB_FORCE_FLAG: "collabLinkForceLoadFlag",
};

export const saveUsernameToLocalStorage = (username: string) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_COLLAB,
      JSON.stringify({ username }),
    );
  } catch (error: any) {
    // Unable to access window.localStorage
    console.error(error);
  }
};

export const importUsernameFromLocalStorage = (): string | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB);
    if (data) {
      return JSON.parse(data).username;
    }
  } catch (error: any) {
    // Unable to access localStorage
    console.error(error);
  }

  return null;
};

export const saveToLocalStorage = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,
      JSON.stringify(clearElementsForLocalStorage(elements)),
    );
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_APP_STATE,
      JSON.stringify(clearAppStateForLocalStorage(appState)),
    );
    const searchParams = new URLSearchParams(window.location.search);
    var eid = searchParams.get('eid');
    var xhr = new XMLHttpRequest();
    var url = "/api/file/content/draw?id=" + eid;
    xhr.open('post',url,false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("content=" + JSON.stringify(clearElementsForLocalStorage(elements)));
    xhr.onreadystatechange =function(){
      var data = JSON.parse(xhr.responseText);
      if(data['ret'] == 1){
        console.log('draw',data);
      }
    };

  } catch (error: any) {
    // Unable to access window.localStorage
    console.error(error);
  }
};

export const importFromLocalStorage = () => {
  let savedElements = null;
  let savedState = null;
  try {
    savedElements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS);
    savedState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE);
  } catch (error: any) {
    // Unable to access localStorage
    console.error(error);
  }

  let elements: ExcalidrawElement[] = [];
  if (savedElements) {
    try {
      elements = clearElementsForLocalStorage(JSON.parse(savedElements));
    } catch (error: any) {
      console.error(error);
      // Do nothing because elements array is already empty
    }
  }

  let appState = null;
  if (savedState) {
    try {
      appState = {
        ...getDefaultAppState(),
        ...clearAppStateForLocalStorage(
          JSON.parse(savedState) as Partial<AppState>,
        ),
      };
    } catch (error: any) {
      console.error(error);
      // Do nothing because appState is already null
    }
  }
  return { elements, appState };
};

export const  getInitData = (eid: string | null) => {
  try {
    var savedElements;
    var xhr = new XMLHttpRequest();
    var url = "/api/file/content/draw?id=" + eid;
    xhr.open('get', url, false)
    xhr.onreadystatechange =function(){
      var data = JSON.parse(xhr.responseText);
      if(data['ret'] == 1){
        savedElements = JSON.stringify(data['data']['content']['elements']);
        localStorage.setItem(
          STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,
          savedElements,
        );
      }
    };
    xhr.send('');
  } catch (error: any) {
    // Unable to access window.localStorage
    console.error(error);
  }
}

export const getElementsStorageSize = () => {
  try {
    const elements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS);
    const elementsSize = elements?.length || 0;
    return elementsSize;
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};

export const getTotalStorageSize = () => {
  try {
    const appState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE);
    const collab = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB);
    const library = localStorage.getItem(
      APP_STORAGE_KEYS.LOCAL_STORAGE_LIBRARY,
    );

    const appStateSize = appState?.length || 0;
    const collabSize = collab?.length || 0;
    const librarySize = library?.length || 0;

    return appStateSize + collabSize + librarySize + getElementsStorageSize();
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};
