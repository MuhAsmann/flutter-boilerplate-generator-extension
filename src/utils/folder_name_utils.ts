import * as vscode from "vscode";
export const getFolderName = async (): Promise<string | undefined> => {
  const folderName = await vscode.window.showInputBox({
    placeHolder: "Masukkan nama folder",
  });
  if (!folderName) {
    vscode.window.showErrorMessage("Masukkan nama folder");
    return;
  }
  const extractFolderName = folderName
    .replace(/[\W\d]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

  return extractFolderName;
};
